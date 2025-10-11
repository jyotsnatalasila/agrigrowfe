import React, { useEffect, useState } from 'react';
import { useLocationContext } from './LocationProvider';

export default function Profile() {
  const { user, setUser } = useLocationContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    colony: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [message, setMessage] = useState(null);
  const [isSaved, setIsSaved] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      fetch('http://localhost:1010/api/user/profile', { 
        headers: { Authorization: `Bearer ${token}` } 
      })
        .then(r => {
          if (!r.ok) throw new Error('Failed to fetch profile');
          return r.json();
        })
        .then(data => {
          console.log('Profile data fetched:', data);
          setUser && setUser(data);
          setForm({
            fullName: data.fullName || '',
            phone: data.phone || '',
            addressLine1: data.addressLine1 || '',
            addressLine2: data.addressLine2 || '',
            colony: data.colony || '',
            city: data.city || '',
            state: data.state || '',
            postalCode: data.postalCode || '',
            country: data.country || ''
          });
          setIsSaved(true); 
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
          setMessage('Error loading profile: ' + error.message);
          setIsSaved(false);
        })
        .finally(() => setLoading(false));
    }
  }, [setUser]);

  const handleChange = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setIsSaved(false); 
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setMessage('You must be logged in to update profile');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:1010/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      
      if (!res.ok) {
        const text = await res.text();
        console.error('Profile save failed', res.status, text);
        let messageBody = text;
        try {
          const parsed = JSON.parse(text);
          messageBody = parsed.error || parsed.message || JSON.stringify(parsed);
        } catch (parseErr) {
          // not json
        }
        throw new Error(`Status ${res.status}: ${messageBody}`);
      }
      
      const response = await res.json();
      console.log('Profile update response:', response);
      if (setUser) {
        setUser(response);
      }
      setForm({
        fullName: response.fullName || '',
        phone: response.phone || '',
        addressLine1: response.addressLine1 || '',
        addressLine2: response.addressLine2 || '',
        colony: response.colony || '',
        city: response.city || '',
        state: response.state || '',
        postalCode: response.postalCode || '',
        country: response.country || ''
      });
      
      setMessage(response.message || 'Profile updated successfully');
      setIsSaved(true); 
      
    } catch (e) {
      console.error('Error saving profile', e);
      setMessage('Error saving profile: ' + (e.message || 'unknown'));
      setIsSaved(false);
    } finally { 
      setLoading(false); 
    }
  };

  const requiredFields = ['fullName','phone','addressLine1','city','state','postalCode','country'];
  const isFormComplete = requiredFields.every(f => form[f] && form[f].toString().trim().length > 0);

  const handleClear = () => {
    setForm({ 
      fullName: '', 
      phone: '', 
      addressLine1: '', 
      addressLine2: '', 
      colony: '', 
      city: '', 
      state: '', 
      postalCode: '', 
      country: '' 
    }); 
    setMessage(null); 
    setIsSaved(false);
  };

  if (loading) return <div style={{ padding: 20 }}>Loading profile...</div>;

  return (
    <div style={{ padding: 120}}>
      <h2>My Profile</h2>
      <div style={{ maxWidth: 760, marginTop: 0}}>
        <label style={{ display: 'block', marginTop: 12 }}>Full name <span style={{ color: 'red' }}>*</span></label>
        <input 
          value={form.fullName} 
          onChange={e => handleChange('fullName', e.target.value)} 
          style={{ 
            width: '100%', 
            padding: 8, 
            borderRadius: 6,
            border: isSaved ? '2px solid #269627' : (form.fullName.trim() ? '1px solid #ccc' : '2px solid #ff4d4d') 
          }} 
        />

        <label style={{ display: 'block', marginTop: 12 }}>Phone <span style={{ color: 'red' }}>*</span></label>
        <input 
          value={form.phone} 
          onChange={e => handleChange('phone', e.target.value)} 
          style={{ 
            width: '100%', 
            padding: 8, 
            borderRadius: 6,
            border: isSaved ? '2px solid #269627' : (form.phone.trim() ? '1px solid #ccc' : '2px solid #ff4d4d')
          }} 
        />

        <label style={{ display: 'block', marginTop: 12 }}>Address line 1 <span style={{ color: 'red' }}>*</span></label>
        <input 
          value={form.addressLine1} 
          onChange={e => handleChange('addressLine1', e.target.value)} 
          style={{ 
            width: '100%', 
            padding: 8, 
            borderRadius: 6,
            border: isSaved ? '2px solid #269627' : (form.addressLine1.trim() ? '1px solid #ccc' : '2px solid #ff4d4d')
          }} 
        />

  <label style={{ display: 'block', marginTop: 12 }}>Address line 2</label>
        <input 
          value={form.addressLine2} 
          onChange={e => handleChange('addressLine2', e.target.value)} 
          style={{ 
            width: '100%', 
            padding: 8, 
            borderRadius: 6,
            border: isSaved ? '2px solid #269627' : '1px solid #ccc'
          }} 
        />

  <label style={{ display: 'block', marginTop: 12 }}>Colony / Line</label>
        <input 
          value={form.colony} 
          onChange={e => handleChange('colony', e.target.value)} 
          style={{ 
            width: '100%', 
            padding: 8, 
            borderRadius: 6,
            border: isSaved ? '2px solid #269627' : '1px solid #ccc'
          }} 
        />

        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <label>City <span style={{ color: 'red' }}>*</span></label>
            <input 
              value={form.city} 
              onChange={e => handleChange('city', e.target.value)} 
              style={{ 
                width: '100%', 
                padding: 8, 
                borderRadius: 6,
                border: isSaved ? '2px solid #269627' : (form.city.trim() ? '1px solid #ccc' : '2px solid #ff4d4d')
              }} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>State <span style={{ color: 'red' }}>*</span></label>
            <input 
              value={form.state} 
              onChange={e => handleChange('state', e.target.value)} 
              style={{ 
                width: '100%', 
                padding: 8, 
                borderRadius: 6,
                border: isSaved ? '2px solid #269627' : (form.state.trim() ? '1px solid #ccc' : '2px solid #ff4d4d')
              }} 
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <label>Postal Code <span style={{ color: 'red' }}>*</span></label>
            <input 
              value={form.postalCode} 
              onChange={e => handleChange('postalCode', e.target.value)} 
              style={{ 
                width: '100%', 
                padding: 8, 
                borderRadius: 6,
                border: isSaved ? '2px solid #269627' : (form.postalCode.trim() ? '1px solid #ccc' : '2px solid #ff4d4d')
              }} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Country <span style={{ color: 'red' }}>*</span></label>
            <input 
              value={form.country} 
              onChange={e => handleChange('country', e.target.value)} 
              style={{ 
                width: '100%', 
                padding: 8, 
                borderRadius: 6,
                border: isSaved ? '2px solid #269627' : (form.country.trim() ? '1px solid #ccc' : '2px solid #ff4d4d')
              }} 
            />
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
          <button 
            onClick={handleSave} 
            disabled={loading || isSaved || !isFormComplete}
            title={!isFormComplete ? 'Please fill all required fields' : undefined}
            style={{ 
              background: isSaved ? '#8dc63f' : '#269627', 
              color: '#fff', 
              border: 'none', 
              padding: '10px 14px', 
              borderRadius: 8,
              opacity: (loading || isSaved || !isFormComplete) ? 0.6 : 1
            }}
          >
            {loading ? 'Saving...' : isSaved ? 'Saved ✓' : 'Save'}
          </button>
          <button 
            onClick={handleClear} 
            style={{ 
              background: '#eee', 
              border: 'none', 
              padding: '10px 14px', 
              borderRadius: 8 
            }}
          >
            Clear
          </button>
        </div>
        {message && (
          <div style={{ 
            marginTop: 12, 
            color: message.includes('Error') ? 'red' : '#2f6920',
            padding: '10px',
            background: message.includes('Error') ? '#ffe6e6' : '#f0f9f0',
            borderRadius: '6px',
            border: message.includes('Error') ? '1px solid red' : '1px solid #2f6920'
          }}>
            {message}
          </div>
        )}
        {isSaved && (
          <div style={{ 
            marginTop: 20, 
            padding: 15, 
            background: '#f0f9f0', 
            borderRadius: 8, 
            border: '1px solid #269627' 
          }}>
            <h3 style={{ color: '#2f6920', marginBottom: 10 }}>Profile Saved Successfully ✓</h3>
            <p><strong>Name:</strong> {form.fullName}</p>
            <p><strong>Phone:</strong> {form.phone}</p>
            <p><strong>Address:</strong> {form.addressLine1}, {form.addressLine2}</p>
            <p><strong>Location:</strong> {form.city}, {form.state}, {form.country} - {form.postalCode}</p>
          </div>
        )}
      </div>
    </div>
  );
}