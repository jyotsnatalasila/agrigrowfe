import React from 'react';
import Navbar from './Navbar';
import { useLocationContext } from './LocationProvider';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';

function CartPage() {
  const { cartItems, increaseQuantityGlobal, decreaseQuantityGlobal, removeItemGlobal } = useLocationContext();
  const totalUniqueItems = cartItems.length;
  const totalValue = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <>
      <Navbar />
      <div style={{ background: "#fff", minHeight: "100vh", paddingTop: "130px", paddingBottom: "50px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#3a5f0b', 
            marginBottom: '30px',
            borderBottom: '3px solid #8dc63f',
            paddingBottom: '10px'
          }}>
            Your Shopping Cart ({totalUniqueItems} Items)
          </h1>

          {totalUniqueItems === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '100px', color: '#607f34' }}>
              <FaShoppingCart size={60} style={{ marginBottom: '20px' }} />
              <p style={{ fontSize: '1.4rem', fontWeight: 600 }}>
                Your cart is currently empty. Start shopping now!
              </p>
              <a href={'#/'} style={{ 
                display: 'inline-block', 
                marginTop: '20px', 
                padding: '10px 30px', 
                background: '#8dc63f', 
                color: 'white', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: 600 
              }}>
                Go to Home
              </a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '40px' }}>
              
              {/* Left Column: Cart Items */}
              <div>
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    style={{ 
                      display: 'flex', 
                      padding: '20px 0', 
                      borderBottom: '1px solid #e0e0e0',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <img 
                      src={item.image || (item.images && item.images[0]) || (process.env.PUBLIC_URL + '/Images/1000petals.webp')} 
                      alt={item.name} 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        objectFit: 'cover', 
                        borderRadius: '10px', 
                        marginRight: '20px',
                        border: '1px solid #dff0cb'
                      }} 
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: 700, color: '#3a5f0b', fontSize: '1.2rem' }}>{item.name}</div>
                      <div style={{ color: '#607f34', fontSize: '1rem', marginTop: '5px' }}>
                        Unit: {item.unit || 'Item'} | Price per unit: ₹{item.itemPrice}
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', paddingRight: '10px' }}>
                        {/* Quantity Controls */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #d2d8c3",
                                borderRadius: "5px",
                                overflow: "hidden",
                            }}
                        >
                            <button
                                onClick={() => decreaseQuantityGlobal(item.id)}
                                disabled={item.quantity <= 1}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    padding: "5px 10px",
                                    cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                                    color: item.quantity <= 1 ? "#d2d8c3" : "#607f34",
                                }}
                                aria-label="Decrease quantity"
                            >
                                <FaMinus size="0.8em" />
                            </button>
                            <span style={{ padding: "0 10px", fontWeight: 700, color: '#3a5f0b' }}>
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => increaseQuantityGlobal(item.id)}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                    color: "#607f34",
                                }}
                                aria-label="Increase quantity"
                            >
                                <FaPlus size="0.8em" />
                            </button>
                        </div>
                        
                        <div style={{ fontWeight: 700, fontSize: '1.3rem', color: '#3f630d' }}>
                            ₹{(item.totalPrice).toFixed(2)}
                        </div>
                        {/* Remove Button (Text) */}
                        <button 
                            onClick={() => removeItemGlobal(item.id)}
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: '#ff4d4d', 
                                cursor: 'pointer', 
                                fontSize: '1rem',
                                fontWeight: 600,
                                textDecoration: 'underline'
                            }}
                        >
                            Remove
                        </button>
                    </div>
                  </div>
                ))}
                
                {/* Placeholder for Suggested Products */}
                <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '2px solid #f0f9e8' }}>
                    <h2 style={{ fontSize: '1.8rem', color: '#607f34', fontWeight: 600 }}>You May Also Like</h2>
                    {/* In a real application, you would render a related items carousel here */}
                    <p style={{ color: '#a1b97d' }}>[Placeholder for best-selling/related items]</p>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div style={{ 
                background: '#f8fdf4', 
                padding: '25px', 
                borderRadius: '15px', 
                boxShadow: '0 4px 10px rgba(85,120,28,0.08)',
                height: 'fit-content'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3a5f0b', borderBottom: '1px solid #dff0cb', paddingBottom: '15px', marginBottom: '20px' }}>
                  Order Summary
                </h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#607f34' }}>
                  <span>Subtotal ({totalUniqueItems} items):</span>
                  <span>₹{totalValue.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', color: '#607f34' }}>
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.3rem', color: '#3f630d', paddingTop: '15px', borderTop: '2px solid #8dc63f' }}>
                  <span>Total:</span>
                  <span>₹{totalValue.toFixed(2)}</span>
                </div>
                <button 
                  style={{
                    width: '100%', 
                    padding: '15px', 
                    background: '#8dc63f', 
                    border: 'none', 
                    borderRadius: '10px', 
                    color: 'white', 
                    fontWeight: 700, 
                    fontSize: '1.1rem', 
                    cursor: 'pointer',
                    marginTop: '30px',
                    transition: 'background 0.2s',
                    boxShadow: '0 4px 10px rgba(141, 198, 63, 0.4)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#7ba934'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#8dc63f'}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;