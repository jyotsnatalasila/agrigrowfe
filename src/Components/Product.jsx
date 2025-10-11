import React from 'react';
import { useParams } from 'react-router-dom';
import ITEMS from '../data/items';
import Navbar from './Navbar';
import { useLocationContext } from './LocationProvider';

export default function Product() {
  const { id } = useParams();
  const pid = parseInt(id, 10);
  const item = ITEMS.find(i => i.id === pid);
  const { addToCartGlobal } = useLocationContext();

  if (!item) return <div style={{ padding: 24 }}>Product not found.</div>;

  const handleAdd = () => {
    const payload = {
      id: item.id,
      name: item.name,
      image: item.images && item.images.length ? item.images[0] : item.image,
      itemPrice: item.itemPrice || item.price || 0,
      quantity: 1,
      totalPrice: (item.itemPrice || item.price || 0) * 1,
    };
    addToCartGlobal(payload);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: -20, maxWidth: 1000, margin: 'auto' }}>
        <div style={{ display: 'flex', gap: 24, marginTop: 180 }}>
          <div>
            <img src={item.images[0]} alt={item.name} style={{ width: 350, height: 300, objectFit: 'cover', borderRadius: 10 }} />
            <h2 style={{ marginTop: 12 }}>{item.name}</h2>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#2f6920' }}>₹{item.itemPrice}</div>
            <div style={{ marginTop: 15 }}>{item.category}</div>
            <div style={{ marginTop: 18 }}>
              <button onClick={handleAdd} style={{ background: '#269627', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 8 }}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
