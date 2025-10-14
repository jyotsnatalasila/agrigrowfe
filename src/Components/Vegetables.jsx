import React, { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocationContext } from "./LocationProvider";

const VEGETABLES = [
{
  id: 201,
  brand: "Farmer",
  name: "Zucchini",
  images: [process.env.PUBLIC_URL +"/Images/zucchini.webp", process.env.PUBLIC_URL +"/Images/zucchiniimg2.webp"],
  itemPrice: 200,
},
{
  id: 202,
  brand: "Farmer",
  name: "Artichoke",
  images: [process.env.PUBLIC_URL +"/Images/artichoke.jpg", process.env.PUBLIC_URL +"/Images/artichokeimg2.jpg"],
  itemPrice: 540,
},
{
  id: 203,
  brand: "Farmer",
  name: "Yam",
  images: [process.env.PUBLIC_URL +"/Images/yam.jpg", process.env.PUBLIC_URL +"/Images/yam.webp"],
  itemPrice: 180,
},
{
  id: 204,
  brand: "Farmer",
  name: "Beetroot",
  images: [process.env.PUBLIC_URL +"/Images/beetroot.jpg", process.env.PUBLIC_URL +"/Images/beetroot.webp"],
  itemPrice: 60,
},
{
  id: 205,
  brand: "Farmer",
  name: "Bell Pepper",
  images: [process.env.PUBLIC_URL +"/Images/bellpepper.jpg", process.env.PUBLIC_URL +"/Images/bellpepperimg2.jpg"],
  itemPrice: 90,
},
{
  id: 206,
  brand: "Farmer",
  name: "Eggplant",
  images: [process.env.PUBLIC_URL +"/Images/eggplant.jpg", process.env.PUBLIC_URL +"/Images/eggplantimg2.jpg"],
  itemPrice: 40,
},
{
  id: 207,
  brand: "Farmer",
  name: "Asparagus",
  images: [process.env.PUBLIC_URL +"/Images/aspargus.jpg", process.env.PUBLIC_URL +"/Images/asparagus.jpg"],
  itemPrice: 210,
},
{
  id: 208,
  brand: "Farmer",
  name: "Broccoli",
  images: [process.env.PUBLIC_URL +"/Images/broccoli1.jpg", process.env.PUBLIC_URL +"/Images/broccoliimpg3.jpg"],
  itemPrice: 105,
},
{
  id: 209,
  brand: "Farmer",
  name: "Banana Bloom",
  images: [process.env.PUBLIC_URL +"/Images/banana.webp", process.env.PUBLIC_URL +"/Images/banana.jpg"],
  itemPrice: 50,
},
{
  id: 210,
  brand: "Farmer",
  name: "Cauliflower",
  images: [process.env.PUBLIC_URL +"/Images/cauliflower.webp", process.env.PUBLIC_URL +"/Images/cauliflower.jpg"],
  itemPrice: 20,
},
{
  id: 211,
  brand: "Farmer",
  name: "Okra",
  images: [process.env.PUBLIC_URL +"/Images/okra.webp", process.env.PUBLIC_URL +"/Images/okraimg2.webp"],
  itemPrice: 45,
},
{
  id: 212,
  brand: "Farmer",
  name: "Raddish",
  images: [process.env.PUBLIC_URL +"/Images/raddish.webp", process.env.PUBLIC_URL +"/Images/raddish.jpg"],
  itemPrice: 60,
},
{
  id: 213,
  brand: "Farmer",
  name: "Lettuce",
  images: [process.env.PUBLIC_URL +"/Images/lettuce.webp", process.env.PUBLIC_URL +"/Images/lettuce.jpg"],
  itemPrice: 130,
},
{
  id: 214,
  brand: "Farmer",
  name: "Potatoes",
  images: [process.env.PUBLIC_URL +"/Images/potato.jpeg", process.env.PUBLIC_URL +"/Images/potato1.webp"],
  itemPrice: 40,
},
];

// starStyle outside component to avoid redeclaration & fix ESLint
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

function VegetablesContent() {
  const [selected, setSelected] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const sortMenuRef = useRef(null);
  const modalRef = useRef(null);

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
  const modalBg = darkTheme ? "#1e1e1e" : "#fff"; // Fix ESLint no-undef error

  // Wishlist toggle integrated with context
  const toggleWishlist = (vegetableId) => {
    if (isInWishlist(vegetableId)) {
      removeFromWishlistGlobal(vegetableId);
    } else {
      const item = VEGETABLES.find((v) => v.id === vegetableId);
      if (item) addToWishlistGlobal(item);
    }
  };

  const openModal = (vegetable) => {
    setSelected(vegetable);
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
      quantity,
      currentRating,
      totalPrice: selected.itemPrice * quantity,
      unit: "kg",
    };
    addToCartGlobal(itemToAdd);
    // Use console for notification instead of alert to enhance UX
    console.log(`${quantity}kg x ${selected.name} added/updated in cart.`);
    setSelected(null);
    setQuantity(1);
    setCurrentRating(0);
  };

  const sortedVegetables = useMemo(() => {
    let sorted = [...VEGETABLES];
    if (sortOption === "priceLowToHigh") {
      sorted.sort((a, b) => a.itemPrice - b.itemPrice);
    } else if (sortOption === "priceHighToLow") {
      sorted.sort((a, b) => b.itemPrice - a.itemPrice);
    }
    return sorted;
  }, [sortOption]);

  useEffect(() => {
    if (selected) {
      modalRef.current?.focus(); // Focus modal on open for accessibility
    }
  }, [selected]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setSortMenuOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape" && selected) {
        setSelected(null);
      }
    }
    if (sortMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [sortMenuOpen, selected]);

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
          {sortedVegetables.map((vegetable) => (
            <div
              key={vegetable.id}
              role="group"
              aria-label={`${vegetable.name} card`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openModal(vegetable)}
              onClick={() => openModal(vegetable)}
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
                src={vegetable.images[0]}
                alt={vegetable.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              />
              <button
                aria-label={
                  isInWishlist(vegetable.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(vegetable.id);
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
                  color: isInWishlist(vegetable.id) ? "#8dc63f" : "#999",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.3s ease",
                }}
              >
                {isInWishlist(vegetable.id) ? "❤️" : "🤍"}
              </button>
              <div
                style={{
                  padding: "16px 18px 0",
                  color: primaryTextColor,
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                {vegetable.brand}
              </div>
              <div
                style={{
                  padding: "0 18px",
                  color: secondaryTextColor,
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                {vegetable.name}
              </div>
              <div
                style={{
                  padding: "0 18px",
                  color: faintTextColor,
                  fontWeight: "400",
                  fontSize: "15px",
                }}
              >
                Quantity: 1kg
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
                ₹{vegetable.itemPrice}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={sortMenuRef}
          style={{
            position: "fixed",
            bottom: "8px",
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
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4b6129")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#607f34")}
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
                backgroundColor: darkTheme ? "#2a2a2a" : "#f0f9e8",
                borderRadius: "12px",
                boxShadow: darkTheme
                  ? "0 8px 20px rgba(0,0,0,0.5)"
                  : "0 8px 20px rgba(33,79,15,0.15)",
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
                    color: sortOption === value ? "#fff" : primaryTextColor,
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
            aria-labelledby="modal-title"
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
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              tabIndex={0}
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
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2e4a08")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3a5f0b")}
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
                  alt={`${selected.name} view ${selectedImageIdx + 1} of ${selected.images.length}`}
                  style={{
                    width: "75%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "20px",
                    boxShadow: "0 8px 30px rgba(33,79,15,0.1)",
                    userSelect: "none",
                    background: darkTheme ? "#2a2a2a" : "#f8fdf4",
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
                      userSelect: "none",
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
                      userSelect: "none",
                    }}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                )}
              </div>

              <div
                id="modal-title"
                style={{ color: primaryTextColor, fontWeight: "700", fontSize: "1.25rem", marginBottom: "5px" }}
              >
                {selected.brand}
              </div>

              <div
                style={{ color: secondaryTextColor, fontWeight: "600", fontSize: "1rem", marginBottom: "5px" }}
              >
                {selected.name}
              </div>
              <div
                style={{ color: faintTextColor, fontWeight: "500", fontSize: "1rem", marginBottom: "15px" }}
              >
                Quantity: {quantity}kg
              </div>

              <div
                role="radiogroup"
                aria-label="Product Rating"
                style={{ padding: "8px 18px", color: "#d2d8c3", display: "flex", gap: "8px" }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setCurrentRating(i + 1 === currentRating ? 0 : i + 1)}
                    style={{
                      ...starStyle,
                      fontSize: "28px",
                      color: i < currentRating ? "#8dc63f" : "#d2d8c3",
                      cursor: "pointer",
                    }}
                    role="radio"
                    aria-checked={i < currentRating}
                    aria-label={`${i + 1} star${i + 1 > 1 ? "s" : ""} rating`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setCurrentRating(i + 1 === currentRating ? 0 : i + 1);
                    }}
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
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(quantity - 1, 1))}
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
                  onClick={() => setQuantity(Math.min(quantity + 1, 99))}
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
                  transition: "background-color 0.3s ease",
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

export default function Vegetables() {
  return <VegetablesContent />;
}
