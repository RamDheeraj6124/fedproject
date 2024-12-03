import React, { useState } from 'react';
import Footer from '../Home/partials/Footer';
import Header from '../Home/partials/Header';
import './ContactPage.css';

const ContactPage = () => {
    const [userquery, setuserquery] = useState({
        name: '',
        email: '',
        mobile: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserquery((prevQuery) => ({
            ...prevQuery,
            [name]: value,
        }));
    };

    const submitquery = async (e) => {
        e.preventDefault();
        console.log('Query Submitted:', userquery);
        try{
        const res = await fetch('http://localhost:5000/user/submitquery', { // Ensure correct protocol
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userquery),
            credentials: 'include', // Optional: Include cookies if needed
        });
        if(res.ok){
            alert('Query Sent Succesfully! we will cantact you through mail')
            window.location.reload();
        }
        }catch(err){
            console.log('Error:', err);
        }
        
    };

    return (
        <div>
            <Header />
            <div className="contact-page">
                <div className="contact-page__info">
                    <div className="contact-page__address-card">
                        <div className="contact-page__header-row">
                            <h1 className="contact-page__title">Let's Talk!</h1>
                            <svg
                                className="contact-page__icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="70"
                                height="70"
                            >
                                <path d="M20 2H4C2.9 2 2 2.9 2 4v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 14V4h16v10H6l-2 2z" />
                            </svg>
                        </div>
                        <p className="contact-page__email">
                            <a href="mailto:contact@iiits.in">contact@iiits.in</a>
                        </p>
                    </div>
                    <div className="contact-page__address-card">
                        <h3>SportzGuard Services Private Limited, Hyderabad</h3>
                        <p>1st Floor, #174, 9th Cross Rd, Indira Nagar 1st Stage, Hyderabad, Telangana - 522616</p>
                        <p>Phone: +91 80 6669 5541</p>
                    </div>
                    <div className="contact-page__address-card">
                        <h3>Signal Sports Co, Hyderabad</h3>
                        <p>2nd Floor, #25, 80ft Road, Jubilee Hills, Madhapur, Hyderabad, Telangana - 560038</p>
                        <p>Phone: +91 80 9551 4666</p>
                    </div>
                </div>

                {/* Right Section: Form */}
                <div className="contact-page__form">
                    <h2>Contact Us</h2>
                    <form onSubmit={submitquery}>
                        <div className="contact-page__form-group">
                            <label htmlFor="name" className="contact-page__form-label">
                                Name*
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={userquery.name}
                                onChange={handleChange}
                                className="contact-page__form-control"
                                placeholder="Name"
                                id="name"
                                required
                            />
                        </div>
                        <div className="contact-page__form-group">
                            <label htmlFor="email" className="contact-page__form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={userquery.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="contact-page__form-control"
                                id="email"
                            />
                        </div>
                        <div className="contact-page__form-group">
                            <label htmlFor="mobile" className="contact-page__form-label">
                                Mobile*
                            </label>
                            <input
                                type="tel"
                                name="mobile"
                                value={userquery.mobile}
                                onChange={handleChange}
                                placeholder="Contact Number"
                                className="contact-page__form-control"
                                id="mobile"
                                required
                            />
                        </div>
                        <div className="contact-page__form-group">
                            <label htmlFor="message" className="contact-page__form-label">
                                Message*
                            </label>
                            <textarea
                                name="message"
                                value={userquery.message}
                                onChange={handleChange}
                                className="contact-page__form-control"
                                placeholder="Message"
                                id="message"
                                rows="5"
                                required
                            ></textarea>
                        </div>
                        <div className="contact-page__form-actions">
                            <button type="submit" className="contact-page__form-submit">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactPage;
