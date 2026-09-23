import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import './Contact.css';
import './Auth.css';

const emptyForm = { name: '', email: '', subject: '', message: '' };

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  return errors;
};

export function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const resetForm = () => { setForm(emptyForm); setErrors({}); setSubmitted(false); };

  return (
    <main className="fv-contact-page">
      <Container>
        <header className="fv-contact-header"><div className="fv-contact-kicker">CONTACT / FANDOMVERSE</div><h1>Open a conversation</h1><p>This local contact form is a frontend demonstration. It does not send or store messages.</p></header>
        <div className="fv-contact-layout">
          <section className="fv-contact-form-panel" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading">Send a message</h2>
            {submitted ? (
              <div className="fv-form-success" role="status"><strong>Message submitted successfully in demo mode.</strong><p>No message was sent or stored.</p><button type="button" onClick={resetForm}>Send another message</button></div>
            ) : (
              <form className="fv-form" onSubmit={handleSubmit} noValidate>
                <div className="fv-form-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" value={form.name} onChange={updateField} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />{errors.name && <span className="fv-form-error" id="contact-name-error">{errors.name}</span>}</div>
                <div className="fv-form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" value={form.email} onChange={updateField} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />{errors.email && <span className="fv-form-error" id="contact-email-error">{errors.email}</span>}</div>
                <div className="fv-form-field"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" value={form.subject} onChange={updateField} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'contact-subject-error' : undefined} />{errors.subject && <span className="fv-form-error" id="contact-subject-error">{errors.subject}</span>}</div>
                <div className="fv-form-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows="6" value={form.message} onChange={updateField} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />{errors.message && <span className="fv-form-error" id="contact-message-error">{errors.message}</span>}</div>
                <button className="fv-form-submit" type="submit">Submit message</button>
              </form>
            )}
          </section>
          <aside className="fv-contact-location" aria-labelledby="contact-location-heading"><div className="fv-contact-location-art" role="img" aria-label="Map preview unavailable in demo mode"><span>MAP PREVIEW</span><strong>Unavailable in demo mode</strong></div><h2 id="contact-location-heading">A digital home for fandom</h2><p>No physical address is configured for this local project. FandomVerse is currently a frontend experience.</p></aside>
        </div>
      </Container>
    </main>
  );
}
