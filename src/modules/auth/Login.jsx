import React, { useState, useEffect } from 'react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@erp.com');
  const [password, setPassword] = useState('password');
  const [rememberMe, setRememberRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    const rememberedPass = localStorage.getItem('remembered_pass');
    if (rememberedEmail && rememberedPass) {
      setEmail(rememberedEmail);
      setPassword(rememberedPass);
      setRememberRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@erp.com' && password === 'password') {
      if (rememberMe) {
        localStorage.setItem('remembered_email', email);
        localStorage.setItem('remembered_pass', password);
      } else {
        localStorage.removeItem('remembered_email');
        localStorage.removeItem('remembered_pass');
      }
      onLoginSuccess();
    } else {
      alert('Security Refused: admin@erp.com / password');
    }
  };

  return (
    <div style={styles.loginWrapper}>
      <div style={styles.loginCard}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <h2 style={{ ...styles.logoText, fontSize: '26px', fontWeight: 'bold' }}>
            <span>Smart</span><span style={{ color: '#ea580c' }}>Tex</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <div style={styles.loginGroup}>
            <label style={styles.loginLabel}>User Email Address</label>
            <input type="email" required style={styles.loginInput} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={styles.loginGroup}>
            <label style={styles.loginLabel}>Access Password</label>
            <input type="password" required style={styles.loginInput} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div style={styles.checkboxGroup}>
            <input type="checkbox" id="saveLoginCredentials" style={styles.checkboxInput} checked={rememberMe} onChange={(e) => setRememberRememberMe(e.target.checked)} />
            <label htmlFor="saveLoginCredentials" style={styles.checkboxLabel}>Remember ID and Password on this device</label>
          </div>

          <button type="submit" style={styles.loginButton}>Secure Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  loginWrapper: { display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' },
  loginCard: { backgroundColor: '#e0e0e0', padding: '30px', borderRadius: '6px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', width: '100%', maxWidth: '380px' },
  logoText: { margin: 0, fontSize: '19px', color: '#0f172a', fontWeight: '700', whiteSpace: 'nowrap', letterSpacing: '0.2px' },
  loginForm: { display: 'flex', flexDirection: 'column', gap: '12px' },
  loginGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  loginLabel: { fontSize: '11px', fontWeight: '500', color: '#475569' },
  loginInput: { padding: '8px 10px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none', backgroundColor: '#f6f6f6', color: '#0f172a', width: '100%', boxSizing: 'border-box' },
  loginButton: { backgroundColor: '#0f172a', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', marginTop: '6px' },
  checkboxGroup: { display: 'flex', alignItems: 'center', gap: '6px', margin: '1px 0' },
  checkboxInput: { cursor: 'pointer', width: '14px', height: '14px', accentColor: '#0f172a' },
  checkboxLabel: { fontSize: '11.5px', color: '#475569', cursor: 'pointer', userSelect: 'none' }
};