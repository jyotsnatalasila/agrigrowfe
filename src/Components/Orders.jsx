import React from 'react';
import { useLocationContext } from './LocationProvider';

export default function Orders() {
  const { orders = [], updateOrderStatus } = useLocationContext();

  if (!orders || orders.length === 0) return <div style={{ padding: 24 }}>You have no orders yet.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Orders</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {orders.map(o => (
          <div key={o.id} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{o.id}</div>
                <div style={{ fontSize: 13, color: '#666' }}>{new Date(o.date).toLocaleString()}</div>
              </div>
              <div style={{ fontWeight: 800 }}>{o.status}</div>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 700 }}>Items</div>
              <ul>
                {o.items.map(it => <li key={it.id}>{it.name} x {it.quantity || 1}</li>)}
              </ul>
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <button onClick={() => updateOrderStatus(o.id, 'Shipped')} style={{ padding: '6px 10px' }}>Mark Shipped</button>
              <button onClick={() => updateOrderStatus(o.id, 'Delivered')} style={{ padding: '6px 10px' }}>Mark Delivered</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
