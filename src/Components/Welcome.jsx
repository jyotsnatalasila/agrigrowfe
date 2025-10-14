import React from 'react';
import { Link } from 'react-router-dom'; 

const Welcome = () => {
  return (
    <div
      style={{
        backgroundImage: `url("${process.env.PUBLIC_URL}/Images/loginbg.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/Images/agrigrowlogo.png"}
        alt="AgriGrow Logo"
        style={{
          width: '100px',
          marginTop: '80px',
          marginBottom: '20px',
          zIndex: 2,
        }}
      />

      <div
        style={{
          background: 'rgba(34, 70, 34, 0.3)',
          borderRadius: '20px',
          padding: '40px 60px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          zIndex: 4,
          marginTop: '60px',
        }}
      >
        <h1
          style={{
            fontSize: '45px',
            marginBottom: '15px',
            fontWeight: 'bold',
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Welcome to AgriGrow
        </h1>

        <p
          style={{
            fontSize: '20px',
            marginBottom: '30px',
          }}
        >
          Your gateway to smarter agricultural shopping
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(to right, #4caf50, #2e7d32)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(to right, #4caf50, #2e7d32)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
