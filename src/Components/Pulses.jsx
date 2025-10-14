import React, { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocationContext } from "./LocationProvider";

const PULSE = [
{
  id: 700,
  brand: "Farmer",
  name: "Kidney Beans(Rajma)",
  images: [process.env.PUBLIC_URL +"/Images/kidney.jpeg", process.env.PUBLIC_URL +"/Images/kidneyimg2.webp"],
  itemPrice: 25,
},
{
  id: 701,
  brand: "Farmer",
  name: "Chickpeas",
  images: [process.env.PUBLIC_URL +"/Images/chickpeas.webp", process.env.PUBLIC_URL +"/Images/chickpeasimg2.webp"],
  itemPrice: 44,
},
{
  id: 702,
  brand: "Farmer",
  name: "Green Gram",
  images: [process.env.PUBLIC_URL +"/Images/greengram.webp", process.env.PUBLIC_URL +"/Images/greengramimg2.webp"],
  itemPrice: 23,
},
{
  id: 703,
  brand: "Farmer",
  name: "Red Lentils",
  images: [process.env.PUBLIC_URL +"/Images/redlentils.jpg", process.env.PUBLIC_URL +"/Images/redlentilsimg2.jpg"],
  itemPrice: 42,
},
{
  id: 704,
  brand: "Farmer",
  name: "Horse Gram",
  images: [process.env.PUBLIC_URL +"/Images/horsegram.jpg", process.env.PUBLIC_URL +"/Images/horsegram.webp"],
  itemPrice: 55,
},
{
  id: 705,
  brand: "Farmer",
  name: "Bengal Gram",
  images: [process.env.PUBLIC_URL +"/Images/bengalgram.jpg", process.env.PUBLIC_URL +"/Images/bengalgramimg2.jpg"],
  itemPrice: 80,
},
{
  id: 706,
  brand: "Farmer",
  name: "Black Beans",
  images: [process.env.PUBLIC_URL +"/Images/blackbeans.jpg", process.env.PUBLIC_URL +"/Images/blackbeansimg2.jpeg"],
  itemPrice: 26,
},
];

const starStyle = {
  fontSize: "22px",
  margin: "0 2px",
  cursor: "pointer",
  userSelect: "none",
};

const SORT_OPTIONS = [
  { value: "default", label: "Relevance" },
  { value: "priceLowToHigh", label: "Price: Lowest First" },
  { value: "priceHighToLow", label: "Price: Highest First" },
];

function PulsesContent() {
  const [selected, setSelected] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [currentRating, setCurrentRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const sortMenuRef = useRef(null);

  const { addToCartGlobal, darkTheme } = useLocationContext();

  // Define dynamic styles based on darkTheme
  const mainBg = darkTheme ? "#121212" : "#fff";
  const cardBg = darkTheme ? "linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)" : "linear-gradient(135deg, #f8fdf4 0%, #f0f9e8 100%)";
  const primaryTextColor = darkTheme ? "#8dc63f" : "#3a5f0b";
  const secondaryTextColor = darkTheme ? "#a1b97d" : "#607f34";
  const faintTextColor = darkTheme ? "#666" : "#a1b97d";
  const priceColor = darkTheme ? "#a8e063" : "#3f630d";
  const sortMenuBg = darkTheme ? "#2a2a2a" : "#f0f9e8";
  const modalBg = darkTheme ? "#1e1e1e" : "#fff";

  const toggleWishlist = (pulseId) => {
    setWishlist((prev) =>
      prev.includes(pulseId)
        ? prev.filter((id) => id !== pulseId)
        : [...prev, pulseId]
    );
  };

  const openModal = (pulse) => {
    setSelected(pulse);
    setSelectedImageIdx(0);
    setCurrentRating(0);
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    const itemToAdd = {
      id: selected.id,
      name: selected.name,
      image: selected.images[0],
      itemPrice: selected.itemPrice,
      quantity: quantity,
      currentRating: currentRating,
      totalPrice: selected.itemPrice * quantity,
      unit: "1/2 kg"
    };

    addToCartGlobal(itemToAdd);

    alert(
      `${quantity} unit(s) of 1/2 kg x ${selected.name} added/updated in cart.`
    );
    setSelected(null);
    setQuantity(1);
    setCurrentRating(0);
  };

  const sortedPulses = useMemo(() => {
    if (sortOption === "default") return [...PULSE];
    const sorted = [...PULSE];
    if (sortOption === "priceLowToHigh") {
      sorted.sort((a, b) => a.itemPrice - b.itemPrice);
    } else if (sortOption === "priceHighToLow") {
      sorted.sort((a, b) => b.itemPrice - a.itemPrice);
    }
    return sorted;
  }, [sortOption]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setSortMenuOpen(false);
      }
    }
    if (sortMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortMenuOpen]);

  return (
    <>
    <Navbar />
      <div style={{ background: mainBg, height: "100px" }} />

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          marginTop: "50px",
          padding: "0 15px 60px",
          background: mainBg, // Dynamic Background fix
          minHeight: "100vh",
          position: "relative",
          paddingBottom: "100px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {sortedPulses.map((pulse) => (
            <div
              key={pulse.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openModal(pulse)}
              onClick={() => openModal(pulse)}
              style={{
                borderRadius: "20px",
                background: cardBg, // Dynamic Card Background
                boxShadow: darkTheme ? "0 6px 20px rgba(0,0,0,0.5)" : "0 6px 20px rgba(85,120,28,0.06)",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                userSelect: "none",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = darkTheme ? "0 10px 30px rgba(0,0,0,0.8)" : "0 10px 30px rgba(85,120,28,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = darkTheme ? "0 6px 20px rgba(0,0,0,0.5)" : "0 6px 20px rgba(85,120,28,0.06)";
              }}
            >
              <img
                src={pulse.images[0]}
                alt={pulse.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              />
              <button
                aria-label="Toggle wishlist"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(pulse.id);
                }}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: darkTheme ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.75)",
                  border: "none",
                  fontSize: "24px",
                  color: wishlist.includes(pulse.id) ? "#8dc63f" : "#999",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.3s ease",
                }}
              >
                {wishlist.includes(pulse.id) ? "❤️" : "🤍"}
              </button>
              <div
                style={{
                  padding: "16px 18px 0",
                  color: primaryTextColor,
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                {pulse.brand}
              </div>
              <div
                style={{
                  padding: "0 18px",
                  color: secondaryTextColor,
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                {pulse.name}
              </div>
              <div
                style={{
                  padding: "0 18px",
                  color: faintTextColor,
                  fontWeight: "400",
                  fontSize: "15px",
                }}
              >
                Quantity: 1/2 kg
              </div>
              <div style={{ padding: "8px 18px", color: "#d2d8c3" }}>
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <span key={i} style={{ fontSize: "22px" }}>
                      ★
                    </span>
                  ))}
              </div>
              <div
                style={{
                  padding: "0 18px 20px 18px",
                  color: priceColor,
                  fontWeight: "700",
                  fontSize: "22px",
                }}
              >
                ₹{pulse.itemPrice}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={sortMenuRef}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5000,
            userSelect: "none",
            textAlign: "center",
          }}
        >
          <button
            onClick={() => setSortMenuOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={sortMenuOpen}
            aria-controls="sort-options-list"
            style={{
              padding: "12px 28px",
              fontSize: "1.1rem",
              fontWeight: "700",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#607f34",
              color: "#fff",
              boxShadow: "0 4px 16px rgba(96,127,52,0.4)",
              minWidth: "200px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#4b6129")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#607f34")
            }
            aria-label="Toggle sort by options"
          >
            Sort By ▼
          </button>

          {sortMenuOpen && (
            <ul
              id="sort-options-list"
              role="menu"
              style={{
                marginTop: "6px",
                backgroundColor: sortMenuBg, // Dynamic Sort Menu BG
                borderRadius: "12px",
                boxShadow: darkTheme ? "0 8px 20px rgba(0,0,0,0.5)" : "0 8px 20px rgba(33,79,15,0.15)",
                listStyleType: "none",
                padding: "6px 0",
                width: "200px",
              }}
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <li
                  key={value}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => {
                    setSortOption(value);
                    setSortMenuOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSortOption(value);
                      setSortMenuOpen(false);
                    }
                  }}
                  style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    backgroundColor:
                      sortOption === value ? "#8dc63f" : "transparent",
                    color: sortOption === value ? "#fff" : primaryTextColor, // Dynamic Text Color
                    fontWeight: sortOption === value ? "700" : "500",
                    borderRadius: "12px",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (sortOption !== value)
                      e.currentTarget.style.backgroundColor = darkTheme ? "#444" : "#dff0cb";
                  }}
                  onMouseLeave={(e) => {
                    if (sortOption !== value)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              zIndex: 4000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              userSelect: "none",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: modalBg, // Dynamic Modal BG
                borderRadius: "24px",
                width: "40vw",
                maxWidth: "800px",
                maxHeight: "85vh",
                padding: "15px",
                boxShadow: "0 20px 65px rgba(49,81,15,0.25)",
                textAlign: "center",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "auto",
              }}
            >
              <button
                aria-label="Close modal"
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  backgroundColor: "#3a5f0b",
                  border: "none",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "600",
                  width: "35px",
                  height: "35px",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: 0,
                  transition: "background-color 0.3s ease",
                  zIndex: 10,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2e4a08")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3a5f0b")
                }
              >
                ×
              </button>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <img
                  src={selected.images[selectedImageIdx]}
                  alt={`${selected.name} view`}
                  style={{
                    width: "75%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "20px",
                    boxShadow: "0 8px 30px rgba(33,79,15,0.1)",
                    userSelect: "none",
                    background: darkTheme ? "#2a2a2a" : "#f8fdf4", // Dynamic Image Placeholder BG
                  }}
                />
                {selectedImageIdx > 0 && (
                  <button
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "#607f34",
                      border: "none",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      fontSize: "20px",
                      color: "white",
                      cursor: "pointer",
                      boxShadow: "0 2px 12px rgba(106,71,114,0.1)",
                      userSelect: "none",
                    }}
                    onClick={() => setSelectedImageIdx(0)}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                )}
                {selectedImageIdx < selected.images.length - 1 && (
                  <button
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "#607f34",
                      border: "none",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      fontSize: "20px",
                      color: "white",
                      cursor: "pointer",
                      boxShadow: "0 2px 12px rgba(106,71,114,0.1)",
                      userSelect: "none",
                    }}
                    onClick={() => setSelectedImageIdx(1)}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                )}
              </div>

              <div
                style={{
                  color: primaryTextColor,
                  fontWeight: "700",
                  fontSize: "1.25rem",
                  marginBottom: "5px",
                }}
              >
                {selected.brand}
              </div>

              <div
                style={{
                  color: secondaryTextColor,
                  fontWeight: "600",
                  fontSize: "1rem",
                  marginBottom: "5px",
                }}
              >
                {selected.name}
              </div>
              <div
                style={{
                  color: faintTextColor,
                  fontWeight: "500",
                  fontSize: "1rem",
                  marginBottom: "15px",
                }}
              >
                Quantity: {quantity} unit(s) of 1/2 kg
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  marginBottom: "15px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      onClick={() => {
                        if (currentRating === i + 1) {
                          setCurrentRating(0);
                        } else {
                          setCurrentRating(i + 1);
                        }
                      }}
                      style={{
                        ...starStyle,
                        fontSize: "28px",
                        color: i < currentRating ? "#8dc63f" : "#d2d8c3",
                        transition: "color 0.3s",
                      }}
                      role="radio"
                      aria-checked={i < currentRating}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (currentRating === i + 1) {
                            setCurrentRating(0);
                          } else {
                            setCurrentRating(i + 1);
                          }
                        }
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    color: primaryTextColor,
                    border: darkTheme ? "2px solid #444" : "2px solid #b5cd95", // Dynamic border color
                    borderRadius: "15px",
                    padding: "6px 15px",
                    userSelect: "none",
                  }}
                >
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity === 1}
                    style={{
                      border: "none",
                      background: "transparent",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                      color: quantity === 1 ? faintTextColor : secondaryTextColor,
                      cursor: quantity === 1 ? "not-allowed" : "pointer",
                      userSelect: "none",
                    }}
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span style={{ margin: "0 10px" }}>{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    style={{
                      border: "none",
                      background: "transparent",
                      fontWeight: "900",
                      fontSize: "1.3rem",
                      color: secondaryTextColor,
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div
                style={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                  color: priceColor,
                  marginBottom: "12px",
                }}
              >
                Total: ₹{selected.itemPrice * quantity}
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  backgroundColor: "#607f34",
                  borderRadius: "15px",
                  border: "none",
                  color: "#fff",
                  padding: "12px 0",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  width: "100%",
                  boxShadow: "0 4px 16px rgba(96,127,52,0.4)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4b6129")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#607f34")
                }
                aria-label="Add to cart"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function Pulses() {
  return (
    <PulsesContent />
  );
}
