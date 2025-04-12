import torch
from transformers import (
    GPT2Tokenizer,
    GPT2LMHeadModel,
    Trainer,
    TrainingArguments,
    DataCollatorForLanguageModeling,
)
from flask import Blueprint, request, jsonify
import logging

# logging oppsett
logging.basicConfig(
    filename="./Route.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

chatbot = Blueprint("chatbot", __name__)

# laster opp modell og tokenizer
model_path = r"C:\Users\didri\Documents\GitHub\LearnReflect-System\Python-Backend-Flask\ChatbotAI\OriginalModel-Chatbot\Model"
tokenizer = GPT2Tokenizer.from_pretrained(model_path)
model = GPT2LMHeadModel.from_pretrained(model_path)

# Legg til en spesifikk padding token
tokenizer.add_special_tokens({'pad_token': '[PAD]'})  # Legger til '[PAD]' som padding token


# Sett pad_token_id til ID-en av '[PAD]'
model.resize_token_embeddings(len(tokenizer))  # Juster modellens innbilde for det nye tokenet


tokenizer.pad_token_id = tokenizer.convert_tokens_to_ids('[PAD]')


# Definerer et custom dataset
# Torch.utils.data.dataset er en pytorch klasse som tillater at man lager et dataset som kan bli brukt for trening og evaluering.  
class CustomDataset(torch.utils.data.Dataset):
    def __init__(self, encodings):
        self.encodings = encodings

    # .clone() lager kopi av dataen for å unngå å endre den orginale dataen når man jobber med den.
    # .detach() dette kobler fra tensoren fra den beregnende grafen som pytorch bruker for å spore gradientene, dette er viktig for å unngå å spore gradienter eller feilaktig oppdatere modellen når vi ikke trener den akk nå.
    #  'input_ids': den spesifikke setningen med token-IDs som hentes med indeksen idx,
    #'attention_mask': tilhørende oppmerksomhetsmaske for denne setningen,
    # ved og bruke clone().detach() sørger vi for å få en sikker kopi av verdiene uten at det påvirkes av andre operasjoner eller treningsberegninger.
    # self.encodings er som en bok med sider, der hver side har forskjellige kapitler (f.eks. input_ids og attention_mask).
    # Når du sier val[idx], så henter du én spesifikk side i boken (basert på idx), f.eks. side 10.
    # clone() lager en kopi av den siden.
    # detach() sørger for at kopien ikke har noen kobling til resten av treningsprosessene.
    def __getitem__(self, idx):
        return {key: val[idx].clone().detach() for key, val in self.encodings.items()}

    def __len__(self):
        return len(self.encodings.input_ids)


# Save feedback for future fine-tuning
def save_feedback(response_text, feedback_score):
    with open("feedback_data.txt", "a") as f:
        f.write(f"{response_text}\t{feedback_score}\n")
    logging.info(
        "Feedback saved: Response: %s, Score: %d", response_text, feedback_score
    )


# Update model immediately with positive feedback
def update_model_immediately(response_text, feedback_score):
    logging.info("Starter modell oppdatering med ny respons fra bruker: tekst: %s  score: %d",response_text,feedback_score,)


    # Når modellen får tilbakemelding fra frontend, blir responsen som er en tekststreng [response_text] tokenisert og omgjort til tallsekvenser som modellen kan forstå.
    # Response_text blir behandlet av tokenizer som gjør om teksten til input IDs (tallsekvenser) og "attention mask". det returnerer et objekt som innholder nødvending informasjon for modellen å jobbe med.
    # attention mask: ekte tokens vil få verdien 1, mens padding-tokens får verdien 0, dette gjør at modellen kan ignorere padding-tokens og fokusere kun på de relevante delene av inputen.
    encodings = tokenizer(
        [response_text],
        truncation=True,  # hvis response_text overstiger den angitte max_length på 128 tokens skal den bli kuttet (truncert) altså det overskytende bli fjernet. dette for å unngå feilmeldinger knyttet til inputsstørrelsen i modellen.
        padding=True,  # Fyller ut sekvenser med spesielle padding-tokens slik at alle sekvenser i en batch har lik lengde. Dette er viktig for effektiv batch-trening. For eksempel, hvis response_text er 100 tokens, vil padding-token legge til 28 tokens i starten eller slutten av sekvensen.
        max_length=128,  # setter den maksimale lengden på tokensekvensen til 128 tokens. vis tokens overstiges vil det kuttes, dette er nyttig for å unngå lange input sekvenser modellen kanskje ikke kan håndtere.
        return_tensors="pt",  # dette angir at resultatet fra tokeniseringen skal returneres som pytorch-tensorer. dette er et format som er kompitabel med pytorch. noe som er viktig for at modellen kan bruke disse tensorene til videre behandling.
    )

    dataset = CustomDataset(encodings)  # det tokeniserte resultatet/svaret fra brukeren  (encodings) pakkes inn i en CustomDataset som brukes til trening av modellen.

    # treningsarguementer parametere for hvordan treningen skal foregå, antall treningsomganger (epochs), Batch-størrelse (hvor mange treningsdata som blir behandlet samtidig) læringsrate og hvor ofte modellen skal lagres.
    training_args = TrainingArguments(
        output_dir=r"C:\Users\didri\Documents\GitHub\LearnReflect-System\Python-Backend-Flask\ChatbotAI\OriginalModel-Chatbot\Model",  # Modelen
        num_train_epochs=1,  # 1 trening om gangen.
        # NB: flere epochs kan gi bedre ytele ,men også øke risikoen for overtilpasning
        per_device_train_batch_size=1,  # 1 batch per trening, betyr at modellen trener på en datapunkt (setning eller tekstbit) om gangen.
        # NB: batch-størrelse kan påvirke hvor raskt modellen lærer, en mindre batch kan føre til langsommere men mer stabil læring.
        learning_rate=2e-5,  # læringsrate (hvor fort modellen lærer)
        # NB: hvis læringsraten er for høy, kan modellen bli ustabil, hvis den er for lav kan treningen ta veldig lang tid.
        save_steps=100,  # hvor ofte modellen lagres.
        # NB: nyttig for å unngå tap av fremgang hvis treningen avbrytes og for å evaulere midtveis i treningen.
        logging_dir="./logs",  # logger treningen til en mappe.
        # NB: stien der loggdata lagres. disse loggene kan brukes til å overvåke treningsprossesen, inkludert tap, ytelse og eventuelle feil.
        logging_steps=10,  # logger for hver 10. treningssteg.
        # NB: dette hjelper med å følge med på hvordan treningen utvikler seg uten å oversvømme loggene med informasjon
        weight_decay=0.01,  # Regulering av vekter for å unngå overtilpasning. Weight decay er en reguleringsteknikk som straffer store vekter i modellen. dette bidrar til å redusere overtilpasning (når modellen blir for godt tilpasset og ikke generaliserer godt til nye data)
        # NB: en lav verdi som 0.01 gir en liten justering som hjelper modelllen å unngå overtilpasning uten å svekke læringsevnen
        # OPPSUMERING: definering av hvordan treningen skal foregå, modellen trenes med en batch og kun en epoke fordi dette er en rask oppdatering basert på en respons fra brukeren.
    )

    # brukes for å klargjøre all data for treningen. den sørger for at alle input blir riktig justert og satt sammen på en måte som modellen kan bruke.
    data_collator = DataCollatorForLanguageModeling(
        tokenizer=tokenizer, mlm=False
    )  # mlm= false spesifiserer at vi ikke bruker maskert språklæring som betyr at vi trener på hele setningen uten å maskere ord.

    # modellen trenes med den nye responsen fra brukeren ved å bruke Trainer-klassen som tar modellen,treningsargumentene,datasettet og data collatoren som input.
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=dataset,
        data_collator=data_collator,
    )
    logging.info("trening startet")
    trainer.train()  # starter treningen av modellen med de definerte parameterene, treningsprosessen justerer modellens vektverdier
    logging.info("Trening fullført modell blir lagret")

    if feedback_score < 0:
        logging.info("negative feedback: training model for bad response")

        model.train()

        inputs = tokenizer(
            [response_text],
            truncation=True,
            padding=True,
            max_length=128,
            return_tensors="pt",
        )

        # forward pass to get the logits
        outputs = model(**inputs, labels=inputs["inputs_ids"])

        #komputer tap som vanlig
        loss = outputs.loss

        #negativ faktor for tap (juster tap høyere for dårlig respons)
        penalty_factor = 1.5
        penalized_loss = loss * penalty_factor

        # backpropagate the penalized loss to train the model
        penalized_loss.backward()
        trainer.optimizer.step()

        logging.info(
            "penalized training complete to reduce likelihood of bad response."
        )

    model.save_pretrained("fine_tuned_model")  # lagrer modellen
    tokenizer.save_pretrained("fine_tuned_model")  # lagrer tokeniseringen
    logging.info( "Modell har blitt oppdatert og lagret med responsen fra bruker")  # logger at den har blitt oppdatert med responsen ifra bruker.
    # neste gang modellen brukes er den allerede oppdatert med nye informasjonen. dette gjør at modellen lærer kontinuerlig fra brukernes tilbakemeldinger og forbedrer seg over tid.






# Chatbot api rute for å snakke med frontend applikasjon
@chatbot.route("/chat", methods=["POST"])
def chat():
    data = (
        request.json
    )  # Henter JSON-data fra frontend (innholder meldingen fra bruker (response_text))
    input_text = data.get("message", "")  # henter tekstmelding fra brukeren

    if (
        not input_text
    ):  # hvis meldingen er tom logges en feilelding og returnerer en feilrespons.
        logging.error("Empty message received.")
        return jsonify({"response": "Error: No input text provided."}), 400

    # tokeniserer input fra brukeren til en format som modellen kan forstå.
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding=True)
    input_ids = inputs[ "input_ids" ]  # henter token IDs fra input og blir gjort om til sekvens med token-IDs  NB: token IDs er representasjoner av ord eller symboler i en tekststreng som modellen kan forstå. når vi tokeniserer en tekststreng fra bruker blir hvert ord eller symbol gjort om til et unikt tall, kalt token ID, for eksempel: Hvis meldingen er "Hello", vil den kunne konverteres til noe som input_ids = [15496] hvor tallet representerer ordet "Hello".
    attention_mask = inputs[
        "attention_mask"
    ]  # henter attention mask fra input for at modellen skal fokusere på ekte tokens og 0 der det er padding. altså eksempel 0 betyr at tokenet skal ignoreres, og 1 betyr at det skal fokuseres

    # generer respons ved hjelp av modellen med spesifikke hyperparametere
    # NB: Temperature,top_k og top_P parameterene styrer hvordan responsen blir generert. lavere temperature og top_k fører til mer presise svar mens top_p sikrer variasjon uten og gi ulogiske svar.
    outputs = model.generate(
        input_ids,  # input til modellen (token IDs)
        attention_mask=attention_mask,  # ignorerer padding-tokens med attention mask
        max_length=50,  # Maksimal lengde på den genererte responsen er 50 tokens
        num_return_sequences=1,  # kun en sekvens (respons) skal genereres
        temperature=0.5,  # styrer tilfeldigheten i genereringen (lavere verdi = mer deterministisk)
        top_k=30,  # velg det neste tokenet fra de 30 mest sannsynlige tokene
        top_p=0.8,  # bruk "nucleus sampling" dvs. velg tokener som sammenlagt har sannsynlighet >= 80%
        no_repeat_ngram_size=2,  # sørger for at samme togram-sekvens (to-ord-kombinasjon) ikke gjentas
        do_sample=True,  # aktiverer sampling for å få mer varierte responser ( i stedet for deterministisk valg)
    )
    # dekoder modellens output tilbake til tekst
    response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    logging.info(
        "Generated response: %s", response_text
    )  # logger den genererte responsen
    return jsonify(
        {"response": response_text}
    )  # returnerer responsen til frontend i JSON-format


# Chatbot api route for feedback/adjustment
@chatbot.route("/feedback", methods=["POST"])
def feedback():
    data = request.json
    response_text = data.get("response", "")
    feedback_score = int(data.get("score", 0))

    
    logging.info("Chatbotens respons fra (feedback) i json %s", response_text)
    logging.info("Feedback numerical score: %d", feedback_score)


    if not response_text or feedback_score not in [-1, 1]:
        logging.error( "Invalid feedback data: Response: %s, Score: %d",response_text,  feedback_score,  )
        return jsonify({"status": "error", "message": "Invalid feedback data"}), 400
    save_feedback(response_text, feedback_score)  # Save feedback



    # oppdaterer modell basert på tilbakemeldinger.
    update_model_immediately(response_text, feedback_score)
    return jsonify({"status": "success"})  # returnerer suksessmelding til frontend
