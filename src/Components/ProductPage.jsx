// ProductPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ITEMS from '../data/items';
import { useLocationContext } from './LocationProvider';

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCartGlobal, darkTheme } = useLocationContext();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID
  const product = ITEMS.find(item => item.id.toString() === productId);

  if (!product) {
    return (
      <div style={{ 
        padding: '150px 20px 50px 20px', 
        textAlign: 'center',
        background: darkTheme ? '#1a1a1a' : '#fff',
        color: darkTheme ? '#fff' : '#000',
        minHeight: '100vh'
      }}>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            background: '#269627',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCartGlobal({
      id: product.id,
      name: product.name,
      itemPrice: product.itemPrice,
      quantity: quantity,
      totalPrice: product.itemPrice * quantity,
      image: product.images[0],
      unit: product.unit
    });
    
    alert(`${quantity} ${product.unit} of ${product.name} added to cart!`);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div style={{ 
      padding: '150px 20px 50px 20px', 
      minHeight: '100vh',
      background: darkTheme ? '#1a1a1a' : '#fff',
      color: darkTheme ? '#fff' : '#000'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '50px',
        alignItems: 'start'
      }}>
        
        {/* Product Images Section */}
        <div>
          {/* Main Image */}
          <div style={{
            width: '100%',
            height: '400px',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '20px',
            background: darkTheme ? '#333' : '#f5f5f5',
            border: `1px solid ${darkTheme ? '#444' : '#ddd'}`
          }}>
            <img 
              src={product.images[0]} 
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          
          {/* Thumbnail Images */}
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {product.images.map((image, index) => (
              <div
                key={index}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: selectedImageIndex === index ? '3px solid #269627' : `2px solid ${darkTheme ? '#555' : '#ddd'}`,
                  background: darkTheme ? '#333' : '#f5f5f5'
                }}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div style={{ padding: '20px' }}>
          <h1 style={{ 
            fontSize: '2.5rem',
            marginBottom: '10px',
            color: darkTheme ? '#fff' : '#2f6920'
          }}>
            {product.name}
          </h1>
          
          <p style={{ 
            color: darkTheme ? '#ccc' : '#666',
            fontSize: '1.1rem',
            marginBottom: '20px'
          }}>
            Category: <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
          </p>

          {/* Price */}
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold',
            color: '#269627',
            marginBottom: '30px'
          }}>
            ₹{product.itemPrice}
            <span style={{ 
              fontSize: '1rem',
              color: darkTheme ? '#ccc' : '#666',
              marginLeft: '8px'
            }}>
              / {product.unit}
            </span>
          </div>

          {/* Description - THIS WILL NOW SHOW */}
          <div style={{ 
            marginBottom: '30px',
            lineHeight: '1.6'
          }}>
            <h3 style={{ 
              marginBottom: '15px',
              color: darkTheme ? '#fff' : '#333',
              fontSize: '1.5rem'
            }}>
              Product Description
            </h3>
            <p style={{ 
              color: darkTheme ? '#ccc' : '#666',
              fontSize: '1.1rem',
              lineHeight: '1.8'
            }}>
              {product.description}
            </p>
          </div>

          {/* Features - THIS WILL NOW SHOW */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ 
              marginBottom: '15px',
              color: darkTheme ? '#fff' : '#333',
              fontSize: '1.5rem'
            }}>
              Key Features
            </h3>
            <ul style={{ 
              color: darkTheme ? '#ccc' : '#666',
              paddingLeft: '20px',
              fontSize: '1.1rem',
              lineHeight: '1.8'
            }}>
              {product.features.map((feature, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector */}
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ 
              marginBottom: '15px',
              color: darkTheme ? '#fff' : '#333',
              fontSize: '1.2rem'
            }}>
              Select Quantity
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button 
                onClick={decreaseQuantity}
                style={{
                  padding: '10px 20px',
                  background: darkTheme ? '#444' : '#f0f0f0',
                  color: darkTheme ? '#fff' : '#333',
                  border: `1px solid ${darkTheme ? '#555' : '#ddd'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}
              >
                -
              </button>
              <span style={{ 
                fontSize: '1.3rem',
                fontWeight: 'bold',
                minWidth: '50px',
                textAlign: 'center',
                color: darkTheme ? '#fff' : '#333'
              }}>
                {quantity}
              </span>
              <button 
                onClick={increaseQuantity}
                style={{
                  padding: '10px 20px',
                  background: darkTheme ? '#444' : '#f0f0f0',
                  color: darkTheme ? '#fff' : '#333',
                  border: `1px solid ${darkTheme ? '#555' : '#ddd'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}
              >
                +
              </button>
              <span style={{ 
                color: darkTheme ? '#ccc' : '#666',
                marginLeft: '10px',
                fontSize: '1.1rem'
              }}>
                {product.unit}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
            <button 
              onClick={handleAddToCart}
              style={{
                padding: '15px 40px',
                background: '#269627',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                flex: 1
              }}
              onMouseEnter={(e) => e.target.style.background = '#2f6920'}
              onMouseLeave={(e) => e.target.style.background = '#269627'}
            >
              🛒 Add to Cart
            </button>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: '#269627'
            }}>
              Total: ₹{product.itemPrice * quantity}
            </div>
          </div>

          {/* Additional Info */}
          <div style={{
            padding: '25px',
            background: darkTheme ? '#333' : '#f9f9f9',
            borderRadius: '12px',
            border: `1px solid ${darkTheme ? '#444' : '#ddd'}`
          }}>
            <h4 style={{ 
              marginBottom: '15px',
              color: darkTheme ? '#fff' : '#333',
              fontSize: '1.3rem'
            }}>
              🌟 Why Choose AgriGrow?
            </h4>
            <div style={{ 
              color: darkTheme ? '#ccc' : '#666',
              fontSize: '1rem',
              lineHeight: '1.6'
            }}>
              <p style={{ marginBottom: '10px' }}>✅ Fresh and high quality products</p>
              <p style={{ marginBottom: '10px' }}>✅ Direct from farm to your home</p>
              <p style={{ marginBottom: '10px' }}>✅ Free delivery on orders above ₹500</p>
              <p style={{ marginBottom: '10px' }}>✅ 100% quality guarantee</p>
              <p style={{ marginBottom: '10px' }}>✅ Secure and easy returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}