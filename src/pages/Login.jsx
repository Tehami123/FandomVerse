import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { useAuth } from '../context/useAuth';
import './Auth.css';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const submit = (event) => { event.preventDefault(); const next = {}; if (!form.email.trim()) next.email = 'Email is required.'; else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'; if (!form.password) next.password = 'Password is required.'; if (Object.keys(next).length) { setErrors(next); return; } const result = login(form.email, form.password); if (!result.success) { setErrors({ credentials: result.error }); return; } setErrors({}); setSubmitted(true); window.setTimeout(() => navigate('/'), 700); };
  const update = (event) => { setForm({ ...form, [event.target.name]: event.target.value }); setErrors({ ...errors, [event.target.name]: undefined, credentials: undefined }); };
  return <main className="fv-auth-page"><Container><section className="fv-auth-panel" aria-labelledby="login-heading"><div className="fv-auth-kicker">ACCOUNT / DEMO AUTHENTICATION</div><h1 id="login-heading">Sign in</h1><p className="fv-auth-intro">This is a frontend-only login demonstration. Credentials stay in this browser and are never sent to a server.</p>{submitted ? <div className="fv-form-success" role="status"><strong>Demo login successful.</strong><p>Your local demo session is active.</p><Link to="/">Return to FandomVerse</Link></div> : <form className="fv-form" onSubmit={submit} noValidate><div className="fv-form-field"><label htmlFor="login-email">Email</label><input id="login-email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'login-email-error' : undefined} />{errors.email && <span className="fv-form-error" id="login-email-error">{errors.email}</span>}</div><div className="fv-form-field"><label htmlFor="login-password">Password</label><input id="login-password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={update} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'login-password-error' : undefined} />{errors.password && <span className="fv-form-error" id="login-password-error">{errors.password}</span>}</div>{errors.credentials && <div className="fv-form-error" role="alert">{errors.credentials}</div>}<button className="fv-form-submit" type="submit">Demo sign in</button></form>}<p className="fv-auth-switch">Need a demo account? <Link to="/signup">Create one</Link></p><Link className="fv-auth-back" to="/">Back to FandomVerse</Link></section></Container></main>;
}
