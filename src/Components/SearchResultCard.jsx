import React from 'react';
import { useLocationContext } from './LocationProvider';

export default function SearchResultCard({ item, onClick }) {
  const { darkTheme } = useLocationContext();
  const cardBg = darkTheme ? 'linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)' : 'linear-gradient(135deg, #f8fdf4 0%, #f0f9e8 100%)';

  if (!item) return null;

  return (
    <div onClick={() => onClick && onClick(item)} style={{ display: 'flex', gap: 12, padding: 10, alignItems: 'center', cursor: 'pointer', background: cardBg }}>
      <img src={(item.images && item.images[0]) || item.image || (process.env.PUBLIC_URL + '/Images/1000petals.webp')} alt={item.name} style={{ width: 72, height: 60, objectFit: 'cover', borderRadius: 8 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, color: darkTheme ? '#8dc63f' : '#2f6920' }}>{item.name}</div>
        <div style={{ fontSize: 12, color: darkTheme ? '#ccc' : '#666' }}>{item.category || ''}</div>
        <div style={{ fontWeight: 800, color: darkTheme ? '#a8e063' : '#3f630d' }}>₹{item.itemPrice || item.price || '—'}</div>
      </div>
    </div>
  );
}
