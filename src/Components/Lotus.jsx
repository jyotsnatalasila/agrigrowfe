import React, { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocationContext } from "./LocationProvider";

const LOTUS = [
{
  id: 300,
  brand: "Farmer",
  name: "Water Lily (White Lotus)",
  images: [process.env.PUBLIC_URL +"/Images/whitelotus.jpg", process.env.PUBLIC_URL +"/Images/whitelotusimg2.jpg"],
  itemPrice: 10,
},
{
  id: 301,
  brand: "Farmer",
  name: "Water Lily (Pink Lotus)",
  images: [process.env.PUBLIC_URL +"/Images/pinklotus.jpg", process.env.PUBLIC_URL +"/Images/pinklotus.webp"],
  itemPrice: 15,
},
{
  id: 302,
  brand: "Farmer",
  name: "Water Lily (Blue Lotus)",
  images: [process.env.PUBLIC_URL +"/Images/bluelotus.jpg", process.env.PUBLIC_URL +"/Images/bluelotusimg2.jpg"],
  itemPrice: 40,
},
{
  id: 303,
  brand: "Farmer",
  name: "Water Lily (Purple Lotus)",
  images: [process.env.PUBLIC_URL +"/Images/purplelotus.jpg", process.env.PUBLIC_URL +"/Images/purplelotusimg2.jpg"],
  itemPrice: 50,
},
{
  id: 304,
  brand: "Farmer",
  name: "Water Lily (Red Lotus)",
  images: [process.env.PUBLIC_URL +"/Images/redlotus.webp", process.env.PUBLIC_URL +"/Images/redlotus.jpg"],
  itemPrice: 55,
},
{
  id: 305,
  brand: "Farmer",
  name: "Water Lily (Yellow Lotus)",
  images: [process.env.PUBLIC_URL +"/Images/yellowlotus.webp", process.env.PUBLIC_URL +"/Images/yellowlotus.jpg"],
  itemPrice: 70,
},
];

// Define starStyle outside component to fix ESLint no-undef
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

function LotusContent() {
  const [selected, setSelected] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const sortMenuRef = useRef(null);

  const {
    addToCartGlobal,
    darkTheme,
    wishlistItems,
    addToWishlistGlobal,
    removeFromWishlistGlobal,
    isInWishlist,
  } = useLocationContext();

  const primaryTextColor = darkTheme ? "#8dc63f" : "#3a5f0b";
  const secondaryTextColor = darkTheme ? "#a1b97d" : "#607f34";
  const faintTextColor = darkTheme ? "#666" : "#a1b97d";
  const priceColor = darkTheme ? "#a8e063" : "#3f630d";
  const mainBg = darkTheme ? "#121212" : "#fff";
  const cardBg = darkTheme
    ? "linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)"
    : "linear-gradient(135deg, #f8fdf4 0%, #f0f9e8 100%)";

  // Fix: define modalBg to fix eslint no-undef
  const modalBg = darkTheme ? "#1e1e1e" : "#fff";

  const toggleWishlist = (lotusId) => {
    if (isInWishlist(lotusId)) {
      removeFromWishlistGlobal(lotusId);
    } else {
      const item = LOTUS.find((l) => l.id === lotusId);
      if (item) addToWishlistGlobal(item);
    }
  };

  const openModal = (lotus) => {
    setSelected(lotus);
    setSelectedImageIdx(0);
    setCurrentRating(0);
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    if (!selected) return;
    const itemToAdd = {
      id: selected.id,
      name: selected.name,
      image: selected.images[0],
      itemPrice: selected.itemPrice,
      quantity: quantity,
      currentRating: currentRating,
      totalPrice: selected.itemPrice * quantity,
      unit: "item",
    };
    addToCartGlobal(itemToAdd);
    alert(`${quantity} item(s) of ${selected.name} added/updated in cart.`);
    setSelected(null);
    setQuantity(1);
    setCurrentRating(0);
  };

  const sortedLotus = useMemo(() => {
    let sorted = [...LOTUS];
    if (sortOption === "priceLowToHigh") {
      sorted.sort((a, b) => a.itemPrice - b.itemPrice);
    } else if (sortOption === "priceHighToLow") {
      sorted.sort((a, b) => b.itemPrice - a.itemPrice);
    }
    return sorted;
  }, [sortOption]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target))
        setSortMenuOpen(false);
    }
    if (sortMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          background: mainBg,
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
          {sortedLotus.map((lotus) => (
            <div
              key={lotus.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openModal(lotus)}
              onClick={() => openModal(lotus)}
              style={{
                borderRadius: "20px",
                background: cardBg,
                boxShadow: darkTheme
                  ? "0 6px 20px rgba(0,0,0,0.5)"
                  : "0 6px 20px rgba(85,120,28,0.06)",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                userSelect: "none",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = darkTheme
                  ? "0 10px 30px rgba(0,0,0,0.8)"
                  : "0 10px 30px rgba(85,120,28,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = darkTheme
                  ? "0 6px 20px rgba(0,0,0,0.5)"
                  : "0 6px 20px rgba(85,120,28,0.06)";
              }}
            >
              <img
                src={lotus.images[0]}
                alt={lotus.name}
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
                  toggleWishlist(lotus.id);
                }}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: darkTheme
                    ? "rgba(0,0,0,0.6)"
                    : "rgba(255,255,255,0.75)",
                  border: "none",
                  fontSize: "24px",
                  color: isInWishlist(lotus.id) ? "#8dc63f" : "#999",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.3s ease",
                }}
              >
                {isInWishlist(lotus.id) ? "❤️" : "🤍"}
              </button>
              <div
                style={{
                  padding: "16px 18px 0",
                  color: primaryTextColor,
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                {lotus.brand}
              </div>
              <div
                style={{
                  padding: "0 18px",
                  color: secondaryTextColor,
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                {lotus.name}
              </div>
              <div
                style={{
                  padding: "0 18px",
                  color: faintTextColor,
                  fontWeight: "400",
                  fontSize: "15px",
                }}
              >
                Quantity: 1 item
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
                ₹{lotus.itemPrice}
              </div>
            </div>
          ))}
        </div>

        {/* Sort button and dropdown omitted for brevity (use your existing code here) */}

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
                background: modalBg,
                borderRadius: "24px",
                width: "40vw",
                maxWidth: "800px",
                maxHeight: "85vh",
                padding: "15px",
                boxShadow: "0 20px 65px rgba(49,81,15,0.25)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "auto",
                position: "relative",
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
                  }}
                />
                {selectedImageIdx > 0 && (
                  <button
                    onClick={() => setSelectedImageIdx(selectedImageIdx - 1)}
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
                    }}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                )}
                {selectedImageIdx < selected.images.length - 1 && (
                  <button
                    onClick={() => setSelectedImageIdx(selectedImageIdx + 1)}
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
                    }}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                )}
              </div>

              <div style={{ color: primaryTextColor, fontWeight: "700" }}>{selected.brand}</div>
              <div style={{ color: secondaryTextColor, fontWeight: "600" }}>{selected.name}</div>
              <div style={{ color: faintTextColor, marginBottom: "15px" }}>
                Quantity: {quantity} item{quantity > 1 ? "s" : ""}
              </div>

              <div
                style={{
                  padding: "8px 18px",
                  color: "#d2d8c3",
                  display: "flex",
                  gap: "8px",
                }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      ...starStyle,
                      fontSize: "28px",
                      color: i < currentRating ? "#8dc63f" : "#d2d8c3",
                    }}
                    role="radio"
                    aria-checked={i < currentRating}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setCurrentRating(i + 1 === currentRating ? 0 : i + 1);
                      }
                    }}
                    onClick={() => setCurrentRating(i + 1 === currentRating ? 0 : i + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  marginBottom: "15px",
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  disabled={quantity === 1}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "24px",
                    fontWeight: "900",
                    color: quantity === 1 ? faintTextColor : secondaryTextColor,
                    cursor: quantity === 1 ? "not-allowed" : "pointer",
                  }}
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span style={{ margin: "0 10px" }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(q + 1, 99))}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "24px",
                    fontWeight: "900",
                    color: secondaryTextColor,
                    cursor: "pointer",
                  }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
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
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4b6129")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#607f34")}
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

export default function Lotus() {
  return <LotusContent />;
}
