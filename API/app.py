from flask import Flask,request
from flask_cors import CORS
from ChatbotAI.Route.Route import chatbot  

import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(chatbot, url_prefix='/chatbot')



@app.before_request
def startup_message():
    if not hasattr(app, 'startup_logged'):
        logging.info("Flask server is starting up...")
        app.startup_logged = True

@app.after_request
def log_requests(response):
    logging.info(f"{request.method} {request.path} - {response.status}")
    return response

if __name__ == '__main__':
    logging.info("Starting Flask server...")
    app.run(debug=True)