import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Scene3D } from '../components/visuals/Scene3D';
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
      <div className="fv-contact-scene" aria-hidden="true"><Scene3D /></div>
      <div className="fv-contact-decor fv-contact-decor--one" aria-hidden="true" />
      <div className="fv-contact-decor fv-contact-decor--two" aria-hidden="true" />
      <Container className="fv-contact-shell">
        <motion.header
          className="fv-contact-header"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="fv-contact-kicker">CONTACT / FANDOMVERSE</div>
          <h1>Contact the universe</h1>
          <p>This local contact form is a frontend demonstration and does not send or store messages. The project remains a demo-first archive experience.</p>
        </motion.header>

        <div className="fv-contact-layout">
          <motion.section className="fv-contact-form-panel" aria-labelledby="contact-form-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
            <div className="fv-contact-panel-header">
              <div className="fv-contact-section-kicker">01 / SEND A MESSAGE</div>
              <h2 id="contact-form-heading">Open a conversation</h2>
            </div>
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
          </motion.section>

          <motion.aside className="fv-contact-location" aria-labelledby="contact-location-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
            <div className="fv-contact-location-art" role="img" aria-label="Stylized location frame for the online FandomVerse archive"><span>ONLINE / WORLDWIDE</span><strong>Digital archive</strong></div>
            <div className="fv-contact-location-copy">
              <div className="fv-contact-section-kicker">02 / LOCATION</div>
              <h2 id="contact-location-heading">A digital home for fandom</h2>
              <p>No physical studio address is configured for this local project. FandomVerse is an online frontend experience.</p>
              <a className="fv-contact-map-link" href="https://www.openstreetmap.org/search?query=FandomVerse" target="_blank" rel="noreferrer">Search OpenStreetMap <span aria-hidden="true">-&gt;</span></a>
            </div>
          </motion.aside>
        </div>

        <motion.section className="fv-contact-meta-grid" aria-label="Project notes" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
          <article className="fv-contact-meta-card">
            <div className="fv-contact-section-kicker">03 / PROJECT</div>
            <h3>FandomVerse</h3>
            <p>A cinematic archive for fandom discovery, release tracking, character browsing, and world-level curation.</p>
          </article>
          <article className="fv-contact-meta-card">
            <div className="fv-contact-section-kicker">04 / RESPONSE</div>
            <h3>Demo mode</h3>
            <p>The contact form is local-only and intentionally does not store or deliver submitted messages.</p>
          </article>
          <article className="fv-contact-meta-card">
            <div className="fv-contact-section-kicker">05 / ARCHIVE</div>
            <h3>Built for discovery</h3>
            <p>Search, bookmarks, events, trailers, characters, merchandise, and release tracking all live inside the same experience.</p>
          </article>
        </motion.section>
      </Container>
    </main>
  );
}
