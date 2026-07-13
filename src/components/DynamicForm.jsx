// src/components/DynamicForm.jsx
import React, { useState } from 'react';

export const DynamicForm = ({ setupItem, onSave }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      setupItemId: setupItem.id, 
      data: formData, 
      timestamp: new Date() 
    });
    alert(`${setupItem.name} saved successfully!`);
    setFormData({});
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.formTitle}>Add New {setupItem.name}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        {setupItem.fields.map((field) => (
          <div key={field} style={styles.inputGroup}>
            <label style={styles.label}>
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type={
                field.toLowerCase().includes('date') 
                  ? 'date' 
                  : field.toLowerCase().includes('time') 
                  ? 'time' 
                  : 'text'
              }
              required
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              style={styles.input}
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
        <button type="submit" style={styles.submitBtn}>
          Save Entry
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    maxWidth: '500px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '16px',
    marginTop: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
    textTransform: 'capitalize',
  },
  input: {
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    outline: 'none',
  },
  submitBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }
};