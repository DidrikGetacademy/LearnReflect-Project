import React, { useState } from 'react';
import axios from 'axios';
import './Css/Contact.css';
import { useNavigate } from 'react-router-dom';
import Modal from './RequestSubmittedModal';
function ContactNavBar() {
  const [email, setEmail] = useState("");
  const [category, setcategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [ModalStatus, setModelStatus] = useState(false);
  const [ErrorMessage, SetMessage] = useState("");

  
  const Navigate = useNavigate();


  const message = {
    email: "Please enter a valid email address",
    category: "Please select an option",
    message: "Please enter a message",
    Error: "Error"
  };



  const HandleChange = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://learnreflects.com/Server/contact_request.php', {
        EmailAddress: email,
        Category: category,
        Description: description,
      })
      console.log('Response', response.data)
      SetMessage(""); 

    } catch (error) {
      console.error('error.', error);
      SetMessage(message.Error); 

    } finally {
      setModelStatus(true);
      setLoading(false);
      setEmail("");
      setcategory("");
      setDescription("");
    }
  }



  const CloseModal = () => {
    setModelStatus(false);
    Navigate('/');
  }



  return (
    <div className='ContactDiv'>
      <form onSubmit={HandleChange}>
         {ErrorMessage && <label className="error-message">{ErrorMessage}</label>}
        <label>Support Request</label>
        <input onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' type='Email' required />
        <select value={category} onChange={(e) => setcategory(e.target.value)} required>
          <option value="" disabled>select an option</option>
          <option value="Business">Business</option>
          <option value="Account">Account & Security</option>
          <option value="Payment">Payment</option>
          <option value="Questions">Questions</option>
        </select>
        <textarea onChange={(e) => setDescription(e.target.value)} className='Description' placeholder='Skriv din beskrivelse her...' required>

        </textarea>
        <button disabled={loading} type='submit'>{loading ? 'Loading...' : 'Submit'}</button>
        <button onClick={() => Navigate("/")}>Cancel</button>
      </form>
      {ModalStatus && <Modal message="Contact Request submitted successfully!" onClose={CloseModal} />}
    </div>
  );
}
export default ContactNavBar;

