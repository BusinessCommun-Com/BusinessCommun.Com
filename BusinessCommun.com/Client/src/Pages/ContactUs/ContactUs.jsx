import './ContactUs.css'
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import faqs from "../../data/faqs.json";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";

function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={() => setOpen(!open)}>
                <span>{question}</span>
                {open ? <FiChevronUp /> : <FiChevronDown />}
            </div>

            {open && (
                <div className="faq-answer">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
}


export default function ContactUs() {
    return (
        <>
            <div className="content-root">
                <div className='content'>
                    <div>
                        <h1>GET IN TOUCH</h1>
                        <p>We can't solve your problem if you don't tell us about it!</p>

                        <p className="contact-item">
                            <FiPhone className="icon" /> +91 9876543210
                        </p>

                        <p className="contact-item email-item">
                            <FiMail className="icon" /> support@example.com
                        </p>

                        <p className="contact-item">
                            <FiMapPin className="icon" /> Pune, Maharashtra, India
                        </p>
                    </div>

                    <div className="faq">
                        {faqs.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

