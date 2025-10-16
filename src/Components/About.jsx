import React from "react";

function About() {
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
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.2)")
              }
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "none")}
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      {/* Main content - consistent styling with services page */}
      <main
        style={{
          padding: "60px 20px",
          maxWidth: 960,
          margin: "0 auto",
          boxSizing: "border-box",
          minHeight: "70vh",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 20,
          boxShadow: "0 8px 32px rgba(0, 100, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* Image */}
        <div
          style={{
            width: "100%",
            maxHeight: 450,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(31, 85, 31, 0.22)",
          }}
        >
          <img
            src={process.env.PUBLIC_URL +"/Images/about-farming.jpg"}
            alt="Farming landscape"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              borderRadius: 16,
            }}
          />
        </div>

        {/* Text Content */}
        <section
          style={{
            color: "#255d27",
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          <h1
            style={{
              fontSize: 34,
              fontWeight: 900,
              marginBottom: 24,
              letterSpacing: 2,
              textAlign: "center",
            }}
          >
            About AgriGrow
          </h1>
          <p>
            At AgriGrow, we are passionate about empowering farmers and agricultural professionals
            with innovative technologies and expert insights. Established with the vision of transforming
            agriculture through sustainability and connectivity, we provide comprehensive solutions ranging from
            precision soil analysis to crop insurance to help you maximize your farm’s potential.
          </p>
          <p>
            Our team of experienced agronomists, data scientists, and tech experts have come together to create an
            accessible platform that combines cutting-edge AI with real-world agricultural wisdom.
            Whether you seek to enhance your crop yields, manage resources more efficiently, or protect your investments,
            AgriGrow is your trusted partner every step of the way.
          </p>
          <p>
            Join our community of forward-thinking farmers and stakeholders committed to growing smarter, better, and greener.
            With AgriGrow, cultivate your success sustainably.
          </p>
        </section>
      </main>
    </div>
  );
}

export default About;
