import { useState } from "react";

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your message!');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section className="contact">
        <h1>Get In Touch & Come Visit Us!</h1>

        <div className="contact-container">
    
            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required/>
                    </div>
                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
            </div>

            <div className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.4920791365936!2d-73.986926!3d40.729958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQzJzQ3LjgiTiA3M8KwNTknMTIuOSJX!5e0!3m2!1sen!2sus!4v1234567890" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy"/>
            </div>
        </div>

        <div className="contact-info">
            <br />
            <h3>You can find us at: </h3>
            <p>2nd Ave & E 10th St</p>
            <p>New York, NY</p>
            <p>Phone: (212) 555-2544</p>
            <p>Email: bellasbites@gmail.com </p>
        </div>
    
    </section>

    );

}

export default Contact;