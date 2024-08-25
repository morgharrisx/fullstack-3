import { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button'; Not currently in use
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';
import './ContactForm.css';
import ReusableButton from '../ReusableButton/ReusableButton';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const ContactForm = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 1000,  
      offset: 120,     
      once: true, 
     });
  }, []);
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
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is not in the correct format'; 
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
        setSuccess('🚀 Your message was sent successfully! A member of the team will get back to you within 48 hours.');
        // Clear form fields
        setName('');
        setEmail('');
        setMessage('');
        setFormErrors({}); // Reset errors after successful submission
      })
      .catch((error) => {
        console.log('FAILED...', error);
        setGeneralError('❌ Failed to send your message. Please try again later.');
      });
  };

  return (
    <>
      <h2 data-aos="fade-up" className="contact-form-title">Contact Us</h2>
      <p className="contact-form-description">
          <h3 data-aos="fade-up">Need help? Have a great idea for a new feature? We'd love to hear from you! 😊</h3>
        </p>
      <Container data-aos="fade-up" className="contact-form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">
              <strong>Name:</strong>
            </Form.Label>
            <Form.Control 
              type="text" 
              className={`form-control ${formErrors.name ? 'is-invalid' : ''}`} 
              id="name" 
              value={name} 
              onChange={(e) => {
                setName(e.target.value);
                setFormErrors({ ...formErrors, name: '' }); 
              }} 
            />
            {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">
              <strong>Email:</strong>
            </Form.Label>
            <Form.Control 
              type="email" 
              className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} 
              id="email" 
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value);
                setFormErrors({ ...formErrors, email: '' });
              }} 
            />
            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="message">
              <strong>Message:</strong>
            </Form.Label>
            <Form.Control 
              as="textarea" 
              className={`form-control ${formErrors.message ? 'is-invalid' : ''}`} 
              id="message" 
              rows="5" 
              value={message} 
              onChange={(e) => {
                setMessage(e.target.value);
                setFormErrors({ ...formErrors, message: '' });
              }} 
            />
            {formErrors.message && <div className="invalid-feedback">{formErrors.message}</div>}
          </Form.Group>
          
          {generalError && <div className="alert alert-danger">{generalError}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <ReusableButton color="pink" text="Submit" size="lg" onClick={handleSubmit}/> 
        </Form>
      </Container>
    </>
  );
};

export default ContactForm;