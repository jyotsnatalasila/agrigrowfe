import React from "react";

const services = [
  {
    title: "Precision Soil Analysis",
    desc: "Get real-time insights into soil health, nutrients and custom crop recommendations."
  },
  {
    title: "Smart Irrigation Scheduling",
    desc: "AI plans to minimize water waste and optimize application for each field."
  },
  {
    title: "Crop Insurance & Risk Management",
    desc: "Protect your yields and profits from unpredictable weather and disasters."
  },
  {
    title: "Farm Data Dashboard",
    desc: "Monitor resources, yields, and economic data in a single unified panel."
  },
  {
    title: "Marketplace Integration",
    desc: "Seamless access to new buyers, suppliers, and streamlined logistics."
  },
  {
    title: "Expert Agronomy Consultation",
    desc: "Personalized advice and actionable solutions from professional agronomists."
  },
  {
    title: "Resource Planning & Management",
    desc: "Smarter tools for input planning, task scheduling, and record keeping."
  },
  {
    title: "Training & Knowledge Hub",
    desc: "Guides, webinars, and courses for the latest sustainable agri-practices."
  },
];

function Services() {
  return (
    <div
      style={{
        fontFamily: '"Segoe UI", sans-serif',
        backgroundImage: `url("${process.env.PUBLIC_URL}/Images/loginbg.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        minHeight: "100vh",
        minWidth: 320,
        color: "#2e7d32",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "rgba(34, 70, 34, 0.85)",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
          flexWrap: "wrap",
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        }}
      >
        <div className="logo" style={{ flexShrink: 0 }}>
          <img
            src= {process.env.PUBLIC_URL +"/Images/agrigrowlogo.png"}
            alt="AgriGrow Logo"
            style={{ height: "60px" }}
          />
        </div>
        <div
          className="nav-links"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "flex-end",
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          {["Home", "Services", "Contact", "About"].map((link) => (
            <a
              key={link}
              href={`#/${link.toLowerCase()}`}
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseOver={e =>
                (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")
              }
              onMouseOut={e =>
                (e.currentTarget.style.backgroundColor = "none")
              }
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      {/* Main content with animated service boxes */}
      <main
        style={{
          padding: "60px 20px",
          maxWidth: 1050,
          margin: "0 auto",
          boxSizing: "border-box",
          minHeight: "70vh",
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: 20,
          boxShadow: "0 8px 32px rgba(0, 100, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <section style={{ color: "#255d27", fontSize: 18, lineHeight: 1.7 }}>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 900,
              marginBottom: 32,
              letterSpacing: 2,
              textAlign: "center",
            }}
          >
            Our Services
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 32,
              marginTop: 10,
            }}
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 3px 22px rgba(50,100,50,0.14)",
                  padding: "34px 25px",
                  textAlign: "center",
                  border: "1.5px solid #e3efd2",
                  fontWeight: 500,
                  minHeight: 132,
                  cursor: "pointer",
                  transition: "transform 0.22s cubic-bezier(.17, .96, .61, 1.07), box-shadow 0.22s",
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = "translateY(-11px) scale(1.045)";
                  e.currentTarget.style.boxShadow = "0 15px 44px rgba(31,85,31,0.18)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 3px 22px rgba(50,100,50,0.14)";
                }}
                tabIndex={0}
                onFocus={e => {
                  e.currentTarget.style.transform = "translateY(-11px) scale(1.045)";
                  e.currentTarget.style.boxShadow = "0 15px 44px rgba(31,85,31,0.18)";
                }}
                onBlur={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 3px 22px rgba(50,100,50,0.14)";
                }}
              >
                <div style={{ fontSize: 21, fontWeight: 700, marginBottom: 13, color: "#235f37" }}>
                  {service.title}
                </div>
                <div style={{ fontSize: 15.6, color: "#336947" }}>
                  {service.desc}
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 44, textAlign: "center" }}>
            <span style={{ fontWeight: 500 }}>AgriGrow</span> delivers modern, sustainable, and smart farming services for all.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Services;
