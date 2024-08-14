import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';
import './ContactForm.css';
import ReusableButton from '../ReusableButton/ReusableButton';
import { Container } from 'react-bootstrap';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState('');
  
  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } 
    if (!message) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setSuccess('');
    setGeneralError('');

    // Perform validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Prevent sending if there are validation errors
    }

    const templateParams = {
      name,
      email,
      message,
    };

    emailjs.send('default_service', 'default_template', templateParams, 'u2RZvEUkBk56QD6I9') //service, template and key details from EmailJs
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccess('Your message was sent successfully!');
        // Clear form fields
        setName('');
        setEmail('');
        setMessage('');
        setFormErrors({}); // Reset errors after successful submission
      })
      .catch((error) => {
        console.log('FAILED...', error);
        setGeneralError('Failed to send your message. Please try again later.');
      });
  };

  return (
    <Container className="contact-form-container">
      <h2 className="contact-form-title">Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control 
            type="text" 
            className={`form-control ${formErrors.name ? 'is-invalid' : ''}`} 
            id="name" 
            value={name} 
            onChange={(e) => {
              setName(e.target.value);
              setFormErrors({ ...formErrors, name: '' }); // Clear error on change
            }} 
          />
          {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control 
            type="email" 
            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} 
            id="email" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              setFormErrors({ ...formErrors, email: '' }); // Clear error on change
            }} 
          />
          {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="message">Message</Form.Label>
          <Form.Control 
            as="textarea" 
            className={`form-control ${formErrors.message ? 'is-invalid' : ''}`} 
            id="message" 
            rows="5" 
            value={message} 
            onChange={(e) => {
              setMessage(e.target.value);
              setFormErrors({ ...formErrors, message: '' }); // Clear error on change
            }} 
          />
          {formErrors.message && <div className="invalid-feedback">{formErrors.message}</div>}
        </Form.Group>
        
        {generalError && <div className="alert alert-danger">{generalError}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <ReusableButton color="pink" text="Submit" size="lg" onClick={handleSubmit}/> 
      </Form>
    </Container>
  );
};

export default ContactForm;