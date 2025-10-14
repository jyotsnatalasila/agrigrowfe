import React, { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocationContext } from "./LocationProvider";

const Bs = [
  {
  id: 6,
  brand: "Farmer",
  name: "Jasmine Rice",
  images: [process.env.PUBLIC_URL +"/Images/jasmine-rice.webp", process.env.PUBLIC_URL +"/Images/jasmine-riceimg2.webp"],
  priceOptions: [{ unit: "kg", unitPrice: 140 }],
},
{
  id: 71,
  brand: "Farmer",
  name: "Sweet Corn",
  images: [process.env.PUBLIC_URL +"/Images/sweetcorn.jpg", process.env.PUBLIC_URL +"/Images/sweetcornimg2.jpg"],
  priceOptions: [{ unit: "item", unitPrice: 20 }],
},
{
  id: 95,
  brand: "Farmer",
  name: "Water Lily (Yellow Lotus)",
  images: [process.env.PUBLIC_URL +"/Images/yellowlotus.webp", process.env.PUBLIC_URL +"/Images/yellowlotus.jpg"],
  priceOptions: [{ unit: "item", unitPrice: 70 }],
},
{
  id: 120,
  brand: "Farmer",
  name: "Tumeric",
  images: [process.env.PUBLIC_URL +"/Images/turmericimg2.jpg", process.env.PUBLIC_URL +"/Images/turmeric.jpg"],
  priceOptions: [{ unit: "grams", unitPrice: 40, gramWeight: 100 }],
},
{
  id: 92,
  brand: "Farmer",
  name: "Lithops",
  images: [process.env.PUBLIC_URL +"/Images/lithopsimg2.webp", process.env.PUBLIC_URL +"/Images/lithops.webp"],
  priceOptions: [{ unit: "item", unitPrice: 100 }],
},
{
  id: 54,
  brand: "Farmer",
  name: "Banyan Sappling",
  images: [process.env.PUBLIC_URL +"/Images/banyan.jpg", process.env.PUBLIC_URL +"/Images/banyanimg2.jpg"],
  priceOptions: [{ unit: "item", unitPrice: 30 }],
},
{
  id: 110,
  brand: "Farmer",
  name: "Saffron",
  images: [process.env.PUBLIC_URL +"/Images/saffron.cms", process.env.PUBLIC_URL +"/Images/saffronimg2.jpg"],
  priceOptions: [{ unit: "grams", unitPrice: 25000, gramWeight: 100 }],
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


const formatUnitLabel = (unit, quantity = 1, gramWeight) => {
  if (unit === "half_kg") return "1/2 kg";
  if (unit === "grams" && gramWeight) return `${gramWeight} grams`;
  return quantity > 1 ? `${unit}s` : unit;
};


function BsContent() {
  const [selected, setSelected] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const sortMenuRef = useRef(null);


  const { addToCartGlobal, darkTheme, addToWishlistGlobal, removeFromWishlistGlobal, isInWishlist } = useLocationContext();


  const mainBg = darkTheme ? "#121212" : "#fff";
  const cardBg = darkTheme ? "linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)" : "linear-gradient(135deg, #f8fdf4 0%, #f0f9e8 100%)";
  const primaryTextColor = darkTheme ? "#8dc63f" : "#3a5f0b";
  const secondaryTextColor = darkTheme ? "#a1b97d" : "#607f34";
  const faintTextColor = darkTheme ? "#666" : "#a1b97d";
  const priceColor = darkTheme ? "#a8e063" : "#3f630d";
  const sortMenuBg = darkTheme ? "#2a2a2a" : "#f0f9e8";
  const modalBg = darkTheme ? "#1e1e1e" : "#fff";


  const currentPriceOption = useMemo(() => {
    if (!selected || !selectedUnit) return null;
    return selected.priceOptions.find(opt => opt.unit === selectedUnit);
  }, [selected, selectedUnit]);


  const toggleWishlist = (bs) => {
    if (isInWishlist(bs.id)) {
      removeFromWishlistGlobal(bs.id);
    } else {
      addToWishlistGlobal(bs);
    }
  };


  const getMinQuantity = (unit) => {
    // Start grams at 100, others at 1
    return unit === "grams" ? 100 : 1;
  };
  
  const openModal = (bs) => {
    setSelected(bs);
    setSelectedImageIdx(0);
    setCurrentRating(0);
    // Set the default unit and quantity based on the first option
    const defaultUnit = bs.priceOptions[0]?.unit || null;
    setSelectedUnit(defaultUnit); 
    setQuantity(getMinQuantity(defaultUnit)); 
  };
  
  const incrementQuantity = () => {
    if (!selectedUnit) return;


    if (selectedUnit === "grams") {
      setQuantity((q) => q + 100);
    } else {
      setQuantity((q) => Math.min(q + 1, 99));
    }
  };
  
  const decrementQuantity = () => {
    if (!selectedUnit) return;
    const minQ = getMinQuantity(selectedUnit);


    if (selectedUnit === "grams") {
      setQuantity((q) => Math.max(q - 100, minQ));
    } else {
      setQuantity((q) => Math.max(q - 1, minQ));
    }
  };


  const handleAddToCart = () => {
    if (!selected || !currentPriceOption) return;


    const itemPrice = currentPriceOption.unitPrice;
    
    let quantityInUnits = quantity;
    let unitLabel = formatUnitLabel(selectedUnit, 1, currentPriceOption.gramWeight);
    let finalPrice = itemPrice * quantity;


    if (selectedUnit === "grams" && currentPriceOption.gramWeight) {
      quantityInUnits = quantity / currentPriceOption.gramWeight;
      finalPrice = itemPrice * quantityInUnits;
      unitLabel = "grams"; 
    }
    
    const itemToAdd = {
      id: selected.id,
      name: selected.name,
      image: selected.images[0],
      itemPrice: itemPrice, 
      quantity: quantityInUnits,
      currentRating: currentRating,
      totalPrice: finalPrice,
      unit: unitLabel, 
    };


    addToCartGlobal(itemToAdd);


    alert(`${quantity}${selectedUnit === 'grams' ? 'g' : ''} of ${selected.name} added/updated in cart.`);
    setSelected(null);
    setQuantity(1);
    setCurrentRating(0);
    setSelectedUnit(null);
  };


  const sortedBs = useMemo(() => {
    const bsWithDefaultPrice = Bs.map(bs => ({
      ...bs,
      itemPrice: bs.priceOptions[0].unitPrice 
    }));
    
    if (sortOption === "default") return [...bsWithDefaultPrice];
    
    let sorted = [...bsWithDefaultPrice];
    if (sortOption === "priceLowToHigh") {
      sorted.sort((a, b) => a.itemPrice - b.itemPrice);
    } else if (sortOption === "priceHighToLow") {
      sorted.sort((a, b) => b.itemPrice - a.itemPrice);
    }
    return sorted;
  }, [sortOption]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target)
      ) {
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
      <div style={{ background: mainBg, height: "100px" }}></div>


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
          {sortedBs.map((bs) => (
            <div
              key={bs.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openModal(bs)}
              onClick={() => openModal(bs)}
              style={{
                borderRadius: "20px",
                background: cardBg, 
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
                src={bs.images[0]}
                alt={bs.name}
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
                  toggleWishlist(bs);
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
                  color: isInWishlist(bs.id) ? "#8dc63f" : "#999",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.3s ease",
                }}
              >
                {isInWishlist(bs.id) ? "❤️" : "🤍"}
              </button>
              <div
                style={{
                  padding: "16px 18px 0",
                  color: primaryTextColor,
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                {bs.brand}
              </div>
              <div
                style={{
                  padding: "0 18px",
                  color: secondaryTextColor,
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                {bs.name}
              </div>
              <div
                style={{
                  padding: "0 18px",
                  color: faintTextColor,
                  fontWeight: "400",
                  fontSize: "15px",
                }}
              >
                {/* Corrected card quantity display to show the correct unit/quantity combination */}
                Quantity: {formatUnitLabel(bs.priceOptions[0].unit, 1, bs.priceOptions[0].gramWeight)} 
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
                ₹{bs.priceOptions[0].unitPrice} 
              </div>
            </div>
          ))}
        </div>


        <div
          ref={sortMenuRef}
          style={{
            position: "fixed",
            bottom: "10px", 
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
                backgroundColor: sortMenuBg, 
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


        {selected && currentPriceOption && ( 
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
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "auto",
                minWidth: "300px", 
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
                    background: darkTheme ? "#2a2a2a" : "#f8fdf4", 
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
                  display: "flex",
                  gap: "10px",
                  marginBottom: "15px",
                  marginTop: "10px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {/* Only show unit selection buttons if there are multiple price options */}
                {selected.priceOptions.length > 1 && selected.priceOptions.map((option) => (
                  <button
                    key={option.unit}
                    onClick={() => {
                      setSelectedUnit(option.unit);
                      setQuantity(getMinQuantity(option.unit)); 
                    }}
                    style={{
                      padding: "8px 15px",
                      border: selectedUnit === option.unit ? "2px solid #8dc63f" : (darkTheme ? "2px solid #444" : "2px solid #b5cd95"),
                      borderRadius: "15px",
                      background: selectedUnit === option.unit ? "#8dc63f" : "transparent",
                      color: selectedUnit === option.unit ? "#fff" : (darkTheme ? "#fff" : "#3a5f0b"),
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontSize: "0.95rem",
                    }}
                  >
                    ₹{option.unitPrice} / {formatUnitLabel(option.unit, 1, option.gramWeight)}
                  </button>
                ))}
              </div>
              
              <div
                style={{
                  color: faintTextColor,
                  fontWeight: "500",
                  fontSize: "1rem",
                  marginBottom: "15px",
                }}
              >
                {/* Correct quantity display for grams: 100g, others: 1 x item/kg/etc. */}
                Quantity: {selectedUnit === 'grams' ? `${quantity}g` : `${quantity} x ${formatUnitLabel(currentPriceOption.unit, 1, currentPriceOption.gramWeight)}`}
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
                    border: darkTheme ? "2px solid #444" : "2px solid #b5cd95", 
                    borderRadius: "15px",
                    padding: "6px 15px",
                    userSelect: "none",
                  }}
                >
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity === getMinQuantity(selectedUnit)}
                    style={{
                      border: "none",
                      background: "transparent",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                      color: quantity === getMinQuantity(selectedUnit) ? faintTextColor : secondaryTextColor,
                      cursor: quantity === getMinQuantity(selectedUnit) ? "not-allowed" : "pointer",
                      userSelect: "none",
                    }}
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span style={{ margin: "0 10px" }}>
                    {selectedUnit === 'grams' ? `${quantity}g` : quantity}
                  </span>
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
                Total: ₹{(currentPriceOption.unitPrice * (selectedUnit === 'grams' ? (quantity / currentPriceOption.gramWeight) : quantity)).toFixed(2)}
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


export default function BestsellersPage() {
  return <BsContent />;
}
