import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MdLocationOn } from "react-icons/md";
import { useLocationContext } from "./LocationProvider";
import {
  FaSearch,
  FaShoppingCart,
  FaBell,
  FaUser,
  FaCalculator,
  FaSun,
  FaMoon,
  FaHome,
  FaBars,
  FaTimes,
  FaHeart,
} from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useNavigate } from 'react-router-dom';

const languages = [
  { code: "en", label: "English" },
  { code: "ml", label: "Malayalam" },
  { code: "bn", label: "Bengali" },
  { code: "pa", label: "Punjabi" },
  { code: "gu", label: "Gujarati" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "ja", label: "Japanese" },
];

function CustomTranslateDropdown({ selectedLang, onChangeLanguage }) {
  return (
    <>
      <style>{`
        .custom-select {
          width: 120px;
          padding: 6px 30px 6px 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-color: white;
          background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-size: 14px 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
      <select
        id="language-select"
        className="custom-select"
        value={selectedLang}
        onChange={(e) => onChangeLanguage(e.target.value)}
        aria-label="Select language"
      >
        {languages.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}

function LocationPickerModal({
  openPicker,
  handleCloseLocationPicker,
  handleConfirmLocation,
  pickedPosition,
  setPickedPosition,
  reverseGeocode,
}) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!openPicker) return;

    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      if (mapRef.current) {
        mapRef.current.remove();
        markerRef.current = null;
      }
      mapContainerRef.current.style.height = "100%";
      mapContainerRef.current.style.width = "100%";

      const map = L.map(mapContainerRef.current).setView(pickedPosition, 4);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const markerIcon = L.icon({
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        shadowSize: [41, 41],
      });

      const marker = L.marker(pickedPosition, {
        icon: markerIcon,
        draggable: true,
      }).addTo(map);
      marker.bindPopup("Drag me or click map").openPopup();

      marker.on("dragend", () => {
        const { lat, lng } = marker.getLatLng();
        setPickedPosition([lat, lng]);
        marker.setLatLng([lat, lng]);
        reverseGeocode(lat, lng);
      });
      map.on("click", (e) => {
        marker.setLatLng(e.latlng);
        setPickedPosition([e.latlng.lat, e.latlng.lng]);
        reverseGeocode(e.latlng.lat, e.latlng.lng);
      });

      mapRef.current = map;
      markerRef.current = marker;
      map.invalidateSize();
    }, 120);

    return () => clearTimeout(timer);
  }, [openPicker, pickedPosition, setPickedPosition, reverseGeocode]);

  if (!openPicker) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      aria-modal="true"
      role="dialog"
      aria-label="Select your location"
    >
      <div
        style={{
          width: "85vw",
          height: "80vh",
          backgroundColor: "#fff",
          borderRadius: 18,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: 12, background: '#f6f7f3', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input ref={searchInputRef} placeholder="Search place or address" aria-label="Search location" style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }} />
          <button onClick={async () => {
              const q = searchInputRef.current?.value?.trim();
              if (!q) return;
              try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`);
                const results = await res.json();
                if (results && results.length) {
                  const r = results[0];
                  const lat = parseFloat(r.lat);
                  const lon = parseFloat(r.lon);
                  if (mapRef.current) {
                    mapRef.current.setView([lat, lon], 16);
                    if (markerRef.current) {
                      markerRef.current.setLatLng([lat, lon]);
                    } else {
                      const marker = L.marker([lat, lon]).addTo(mapRef.current);
                      markerRef.current = marker;
                    }
                  }
                  setPickedPosition([lat, lon]);
                  reverseGeocode(lat, lon);
                } else {
                  alert('No location found. Try a different query.');
                }
              } catch (e) {
                console.error(e);
                alert('Error searching location');
              }
          }} style={{ padding: '10px 14px', borderRadius: 8, background: '#26a65b', color: '#fff', border: 'none' }}>Search</button>
        </div>

        <div
          ref={mapContainerRef}
          style={{ flex: 1, minHeight: 350, borderRadius: "18px 18px 0 0" }}
        />
        <div
          style={{
            padding: "15px 28px",
            textAlign: "right",
            background: "#fafafa",
            borderRadius: "0 0 18px 18px",
          }}
        >
          <button
            onClick={handleCloseLocationPicker}
            style={{
              marginRight: 12,
              padding: "8px 16px",
              borderRadius: 5,
              fontWeight: "bold",
              border: "none",
              background: "#eee",
              color: "#232323",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmLocation}
            style={{
              background: "#26a65b",
              color: "#fff",
              padding: "8px 20px",
              border: "none",
              borderRadius: 5,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Select Location
          </button>
        </div>
      </div>
    </div>
  );
}

function CurrencyConverterDialog({ open, onClose }) {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState("");
  const [loading, setLoading] = useState(false);
  const CURRENCY_CODES = ["USD", "INR", "EUR", "GBP", "JPY", "CAD", "AUD"];

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) return;
    if (from === to) {
      setConverted(amount);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await res.json();
      const rate = data.rates[to];
      if (rate) setConverted((parseFloat(amount) * rate).toFixed(2));
      else setConverted("Conversion rate not found");
    } catch {
      setConverted("Error fetching conversion rate");
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 20,
          width: 560,
          maxWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 24,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Close dialog"
        >
          &times;
        </button>
        <div
          style={{
            fontWeight: "bold",
            fontSize: 26,
            marginBottom: 14,
            color: "#222",
            textAlign: "center",
          }}
        >
          Select your Currency
        </div>
        <label
          htmlFor="from-currency"
          style={{
            fontWeight: "bold",
            fontSize: 18,
            display: "block",
            marginBottom: 6,
            color: "#444",
          }}
        >
          From:
        </label>
        <select
          id="from-currency"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{
            padding: 14,
            fontSize: 18,
            borderRadius: 16,
            border: "1.5px solid #222",
            outline: "none",
            width: "100%",
            marginBottom: 22,
          }}
        >
          {CURRENCY_CODES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label
          htmlFor="to-currency"
          style={{
            fontWeight: "bold",
            fontSize: 18,
            display: "block",
            marginBottom: 6,
            color: "#444",
          }}
        >
          To:
        </label>
        <select
          id="to-currency"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{
            padding: 14,
            fontSize: 18,
            borderRadius: 16,
            border: "1.5px solid #222",
            outline: "none",
            width: "100%",
            marginBottom: 22,
          }}
        >
          {CURRENCY_CODES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: 17,
            fontSize: 18,
            borderRadius: 13,
            border: "1.5px solid #222",
            outline: "none",
            width: "93%",
            marginBottom: 22,
          }}
        />
        <button
          onClick={handleConvert}
          style={{
            padding: "14px 0",
            fontSize: 20,
            backgroundColor: "#269627",
            color: "white",
            border: "none",
            borderRadius: 16,
            width: "100%",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Convert
        </button>
        <div
          style={{
            fontWeight: "bold",
            fontSize: 26,
            margin: "38px 0 10px 0",
            textAlign: "center",
            color: "#222",
          }}
        >
          Your Converted Currency
        </div>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#269627",
            padding: 12,
            textAlign: "center",
            border: "1.5px solid #222",
            borderRadius: 16,
            minHeight: 40,
            width: "93%",
            background: "#fff",
          }}
        >
          {loading ? "Loading..." : converted || "---"}
        </div>
      </div>
    </div>
  );
}

function CategoryBar() {
  const [allMenuOpen, setAllMenuOpen] = useState(false);
  const allMenuRef = useRef(null);
  const { wishlistItems, removeFromWishlistGlobal, darkTheme } = useLocationContext();

  useEffect(() => {
    function handleClickOutside(event) {
      if (allMenuRef.current && !allMenuRef.current.contains(event.target)) {
        setAllMenuOpen(false);
      }
    }
    if (allMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [allMenuOpen]);

  const handleAllClick = (e) => {
    e.preventDefault();
    setAllMenuOpen((prev) => !prev);
  };

  return (
    <>
      <style>{`
        .category-bar {
          display: flex;
          align-items: center;
          margin-top: 2;
          background: linear-gradient(to right, #2f6920, #a8e063, #2f6920);
          padding: 0 24px;
          height: 40px;
          font-size: 17px;
          font-weight: bold;
          color: #fff;
          overflow-x: auto;
          scrollbar-width: none;
          position: fixed;
          top: 90px;
          left: 0;
          right: 0;
          z-index: 1050;
        }
        .category-bar::-webkit-scrollbar { display: none; }
        .category-link {
          color: #fff;
          text-decoration: none !important;
          padding: 0 15px;
          line-height: 40px;
          border-right: 1px solid rgba(255,255,255,0.15);
          transition: background 0.2s;
          white-space: nowrap;
          display: flex;
          align-items: center;
          font-weight: bold;
          cursor: pointer;
          position: relative;
          z-index: 1051;
        }
        .category-link:first-child { padding-left: 0; }
        .category-link:last-child { border-right: none; padding-right: 0; }
        .category-link:hover,
        .category-link:focus {
          text-decoration: none !important;
          background: #F5F4EA;
          color: #232323;
          border-radius: 12px 12px 0 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          font-weight: bold;
        }
        .category-icon { margin-right: 7px; }
        .category-bar .fa-bars,
        .all-bars-icon {
          font-size: 1.1em;
          margin-left: 7px;
          color: #f1ede8ff;
          transition: color 0.2s;
        }
        .category-link:hover .all-bars-icon { color: #232323 !important; }
        .wishlist-dropdown {
          position: fixed;
          top: 130px;
          right: 24px;
          z-index: 99999;
          background: ${darkTheme ? '#333' : 'white'};
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          min-width: 320px;
          max-width: 420px;
          max-height: 500px;
          overflow-y: auto;
          padding: 16px;
          border: 1px solid ${darkTheme ? '#555' : '#ddd'};
          color: ${darkTheme ? '#ccc' : '#232323'};
        }
        .wishlist-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-bottom: 1px solid ${darkTheme ? '#444' : '#f0f0f0'};
          transition: background 0.2s;
        }
        .wishlist-item:last-child { border-bottom: none; }
        .wishlist-item:hover {
          background: ${darkTheme ? '#444' : '#f8f8f8'};
          border-radius: 8px;
        }
        .wishlist-item img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 8px;
        }
        .wishlist-item-info { flex: 1; }
        .wishlist-item-name {
          font-weight: 600;
          color: ${darkTheme ? '#8dc63f' : '#2f6920'};
          font-size: 14px;
          margin-bottom: 4px;
        }
        .wishlist-item-price {
          color: ${darkTheme ? '#a8e063' : '#3f630d'};
          font-weight: 700;
          font-size: 16px;
        }
        .wishlist-remove-btn {
          background: #ff4d4d;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 6px 10px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: background 0.2s;
        }
        .wishlist-remove-btn:hover { background: #cc0000; }
        .wishlist-empty {
          text-align: center;
          padding: 40px 20px;
          color: ${darkTheme ? '#666' : '#999'};
        }
        .wishlist-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid ${darkTheme ? '#8dc63f' : '#2f6920'};
        }
        .wishlist-title {
          font-size: 18px;
          font-weight: 700;
          color: ${darkTheme ? '#8dc63f' : '#2f6920'};
          display: flex;
          align-items: center;
          gap: 8px;
        }
       wishlistCountStyle = {
          background: darkTheme ? '#8dc63f' : '#2f6920',
          color: darkTheme ? '#232323' : 'white',
          borderRadius: '25%',  
          width: 5,         
          height: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 7,        
          fontWeight: 700,
          border: '1px solid white',  
          padding: 0,
          lineHeight: '16px',
      };
      <span style={wishlistCountStyle}>{wishlistCount}</span>

      `}</style>
      <div className="category-bar">
        <a href={process.env.PUBLIC_URL + '/#/home'} className="category-link">
          <FaHome className="category-icon" /> Home
        </a>
        <a href={process.env.PUBLIC_URL + '/#/bestsellers'} className="category-link">Best Sellers</a>
        <a href={process.env.PUBLIC_URL + '/#/todaydeals'} className="category-link">Today's Deals</a>
        <a href={process.env.PUBLIC_URL + '/#/newreleases'} className="category-link">New Releases</a>
        <a href={process.env.PUBLIC_URL + '/#/lotus'} className="category-link">Lotus</a>
        <a href={process.env.PUBLIC_URL + '/#/fruits'} className="category-link">Fruits</a>
        <a href={process.env.PUBLIC_URL + '/#/flowers'} className="category-link">Flowers</a>
        <a href={process.env.PUBLIC_URL + '/#/vegetables'} className="category-link">Vegetables</a>
        <a href={process.env.PUBLIC_URL + '/#/aquaticfeed'} className="category-link">Aquatic Feed</a>
        <a href={process.env.PUBLIC_URL + '/#/sapplings'} className="category-link">Seeds & Saplings</a>
        <div 
          ref={allMenuRef}
          className="category-link"
          role="button"
          tabIndex={0}
          onClick={handleAllClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleAllClick(e);
            }
          }}
          style={{ position: 'relative' }}
        >
          All <FaBars className="all-bars-icon" style={{ marginLeft: "5px" }} />
          {allMenuOpen && (
            <div style={{ position: 'absolute', top: 36, left: 0, background: '#fff', color: '#000', borderRadius: 6, padding: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 2200 }}>
              <a href={process.env.PUBLIC_URL + '/#/our-farmers'} style={{ display: 'block', padding: '6px 10px', color: '#333', textDecoration: 'none' }}>Our farmers page</a>
              <a href={process.env.PUBLIC_URL + '/#/quality-assurance'} style={{ display: 'block', padding: '6px 10px', color: '#333', textDecoration: 'none' }}>Quality Assurance</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    deliveryStatus,
    pickedPosition,
    setPickedPosition,
    darkTheme,
    toggleTheme,
    openPicker,
    handleLocationClick,
    handleCloseLocationPicker,
    handleConfirmLocation,
    reverseGeocode,
    showCalculator,
    handleCalculatorToggle,
    cartItems = [],
    wishlistItems = [],
    removeFromWishlistGlobal,
    addToCartGlobal,
    notifications = [],
    markNotificationRead,
    user,
  } = useLocationContext();

  const [selectedLang, setSelectedLang] = useState(() => {
    try { return localStorage.getItem('agrigrowLang') || 'en'; } catch { return 'en'; }
  });

  useEffect(() => {
    try { i18n.changeLanguage(selectedLang); } catch (e) {}
  }, []);

  const onChangeLanguage = (lang) => {
    setSelectedLang(lang);
    try { i18n.changeLanguage(lang); localStorage.setItem('agrigrowLang', lang); } catch (e) {}
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  // We'll try to use Fuse.js for high-quality fuzzy search when available.
  // If Fuse cannot be imported (not installed), we'll fall back to the simple scorer.
  const [fuseInstance, setFuseInstance] = useState(null);

  // Use the centralized ITEMS index for product-level search
  // Import dynamically to avoid circular import issues with Navbar being used in Product page
  const [itemSearchIndex, setItemSearchIndex] = React.useState([]);
  useEffect(() => {
    (async () => {
      try {
        const module = await import('../data/items');
        const items = module.default || [];
        // include images so search preview can show thumbnails
        const indexed = items.map(it => ({ name: it.name, path: `/product/${it.id}`, id: it.id, itemPrice: it.itemPrice, category: it.category, images: it.images || [] }));
        setItemSearchIndex(indexed);
        // Try to dynamically import Fuse.js and build an index (optional)
        try {
          const { default: Fuse } = await import('fuse.js');
          const fuse = new Fuse(indexed, { keys: ['name', 'category'], threshold: 0.35, includeScore: true });
          setFuseInstance(fuse);
        } catch (err) {
          // Fuse not available; we'll continue using the fallback scorer
          setFuseInstance(null);
        }
      } catch (e) {
        // fallback to minimal index
        setItemSearchIndex([]);
      }
    })();
  }, []);

  // Simple normalization for fallback
  const normalize = (s) => (s || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '');

  useEffect(() => {
    if (!searchQuery) { setSearchResults([]); setHighlightIndex(-1); return; }
    (async () => {
      if (fuseInstance) {
        // Use Fuse for high-quality fuzzy results
        const raw = fuseInstance.search(searchQuery).slice(0, 10).map(r => r.item);
        setSearchResults(raw);
        setHighlightIndex(raw.length ? 0 : -1);
        return;
      }
      // Fallback scorer (simple substring / loose char match)
      const qn = normalize(searchQuery);
      const fuzzyScore = (target, q) => {
        if (!target || !q) return 0;
        if (target.includes(q)) return 100 + q.length;
        let ti = 0, qi = 0, score = 0;
        while (ti < target.length && qi < q.length) {
          if (target[ti] === q[qi]) { score += 2; qi++; }
          ti++;
        }
        return score;
      };

      const scored = itemSearchIndex.map(item => {
        const nameNorm = normalize(item.name);
        const score = fuzzyScore(nameNorm, qn);
        const catScore = item.category ? fuzzyScore(normalize(item.category), qn) : 0;
        return { item, score: Math.max(score, catScore) };
      }).filter(s => s.score > 0).sort((a,b) => b.score - a.score).slice(0,10).map(s => s.item);
      setSearchResults(scored);
      setHighlightIndex(scored.length ? 0 : -1);
    })();
  }, [searchQuery, itemSearchIndex, fuseInstance]);

  const doSearch = (item) => { if (!item) return; setSearchQuery(''); setSearchResults([]); if (item.path) navigate(item.path); else if (item.id) navigate(`/product/${item.id}`); };

  // Remove modal/preview flow per request; search results will render full product-style cards inline.

  const totalUniqueItems = (cartItems && cartItems.length) || 0;
  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const wishlistCount = wishlistItems.length;

  // Per-icon gaps (px) - set each individually and add a comment where applied
  const GAP_THEME_TO_CALC = 8; // gap between theme toggle and calculator
  const GAP_CALC_TO_SEARCH = 10; // gap between calculator and search input
  const GAP_SEARCH_TO_LANGUAGE = 20; // gap between search area and language dropdown
  const GAP_LANGUAGE_TO_RETURNS = 20; // gap between language dropdown and Returns & Orders (increased per request)
  const GAP_RETURNS_TO_CART = 20; // gap between Returns & Orders and cart
  const GAP_CART_TO_NOTIF = 20; // gap between cart and notifications
  const GAP_NOTIF_TO_WISHLIST = 20; // gap between notifications and wishlist
  const GAP_WISHLIST_TO_ACCOUNT = 20; // gap between wishlist and account

  return (
    <>
      <nav
        className="navbar"
        style={{
          background: darkTheme
            ? "linear-gradient(to right, #222, #444, #222)"
            : "linear-gradient(to right, rgb(47, 105, 20), #a8e063, rgb(47, 105, 20))",
          height: "90px",
          display: "flex",
          alignItems: "center",
          padding: "0 44px",
          color: "#fff",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2000,
          fontWeight: "bold",
        }}
      >
        <div
          className="container-fluid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {/* FIRST COLUMN: Logo + Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "flex-start",
              marginRight: "12px",
            }}
          >
            <a className="navbar-brand" href={process.env.PUBLIC_URL + '/#/'}>
              <img
                src= {process.env.PUBLIC_URL +"/Images/agrigrowlogo.png"}
                alt="AgriGrow Logo"
                style={{ height: "55px" }}
                className="d-inline-block align-text-top"
              />
            </a>
            <div
              onClick={handleLocationClick}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: "10px",
              }}
              title={t('navbar.selectLocation') || 'Select Location'}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleLocationClick();
              }}
            >
              <MdLocationOn
                size="3.1em"
                style={{ color: "white", filter: "drop-shadow(0 0 20px black)" }}
              />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "0.95em",
                  color: "white",
                  maxWidth: 400,
                  display: "inline-block",
                }}
              >
                {deliveryStatus}
              </span>
            </div>
          </div>
          {/* SECOND COLUMN: Theme Toggle, Calculator, Search, Language */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5em",
                color: "#fff",
                marginRight: `${GAP_THEME_TO_CALC}px`, /* gap between theme toggle and calculator */
              }}
              title={darkTheme ? t('navbar.lightTheme') : t('navbar.darkTheme')}
            >
              {darkTheme ? <FaSun size="1.3em" /> : <FaMoon size="1.3em" />}
            </button>
            <button
              onClick={handleCalculatorToggle}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5em",
                color: "#fff",
                marginRight: `${GAP_CALC_TO_SEARCH}px`, /* gap between calculator and search */
              }}
              title={t('navbar.currencyConverter')}
            >
              <FaCalculator />
            </button>
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightIndex(i => Math.min((searchResults.length - 1), Math.max(0, i + 1))); }
                  else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightIndex(i => Math.max(0, (i - 1))); }
                  else if (e.key === 'Enter') { e.preventDefault(); if (highlightIndex >= 0 && searchResults[highlightIndex]) doSearch(searchResults[highlightIndex]); }
                }}
                placeholder={t('navbar.searchPlaceholder')}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px 0 0 4px",
                  border: "1px solid #ccc",
                  outline: "none",
                  minWidth: 240,
                }}
              />
              <button
                style={{
                  background: "#56ab2f",
                  border: "none",
                  borderRadius: "0 4px 4px 0",
                  padding: "7px 12px",
                  cursor: "pointer",
                }}
                title="Search"
                onClick={() => { if (searchResults.length) doSearch(searchResults[0]); }}
              >
                <FaSearch size="1.3em" style={{ color: "#fff" }} />
              </button>
              {searchResults.length > 0 && (
                <div style={{ position: 'absolute', top: 42, left: 0, background: '#fff', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 2100, minWidth: 280 }}>
                  {searchResults.map((r, idx) => (
                    <div key={r.id || r.path} onClick={() => doSearch(r)} style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #eee', color: highlightIndex === idx ? '#fff' : '#232323', background: highlightIndex === idx ? '#269627' : 'transparent', fontWeight: 700 }}>
                      {r.name}
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>₹{r.itemPrice || '—'}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: `${GAP_SEARCH_TO_LANGUAGE}px`, /* gap between search and language */
              }}
            >
              <label htmlFor="language-select" style={{ fontWeight: "bold", color: '#fff' }}>
                {t('navbar.language')}
              </label>
              <CustomTranslateDropdown
                selectedLang={selectedLang}
                onChangeLanguage={onChangeLanguage}
              />
            </div>
          </div>
          {/* THIRD COLUMN: Returns & Orders, Cart, Notifications, Wishlist, User */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '40px', marginLeft: GAP_LANGUAGE_TO_RETURNS }}>
            {/* Returns & Orders - forced to single line */}
            <a href={process.env.PUBLIC_URL + '/#/orders'} style={{ color: '#fff', fontWeight: '650', textDecoration: 'none', display: 'inline-block', fontSize: '16px', lineHeight: '1.2', whiteSpace: 'nowrap', textAlign: 'center', marginRight: GAP_RETURNS_TO_CART }}>
              Returns & Orders
            </a>
            
            <a href={process.env.PUBLIC_URL + '/#/cart'} style={{ position: 'relative', display: 'inline-block', cursor: 'pointer', color: 'white', textDecoration: 'none', marginRight: `${GAP_RETURNS_TO_CART}px` }} title={t('navbar.viewCart')}>
              <FaShoppingCart size="1.8em" />
              {totalUniqueItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-10px",
                    background: "#ff4d4d",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    lineHeight: "20px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    textAlign: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    border: "1px solid white",
                  }}
                >
                  {totalUniqueItems}
                </span>
              )}
            </a>
            
            <div style={{ position: 'relative', marginRight: `${GAP_CART_TO_NOTIF}px` }}>
              <button 
                onClick={() => setShowNotifications(s => !s)} 
                title={t('navbar.notifications')} 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#fff', 
                  cursor: 'pointer', 
                  padding: 0,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <FaBell size="1.8em" />
                {unreadNotifCount > 0 && (
                  <span 
                    style={{ 
                      position: 'absolute',
                      top: '-8px',
                      right: '-10px',
                      background: '#ff4d4d', 
                      color: '#fff', 
                      borderRadius: '50%', 
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      border: '1px solid white',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {unreadNotifCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div style={{ position: 'fixed', right: 24, top: 100, width: 360, background: '#fff', color: '#000', borderRadius: 8, boxShadow: '0 16px 48px rgba(0,0,0,0.18)', zIndex: 2100, maxHeight: 400, overflowY: 'auto' }}>
                  <div style={{ padding: 12, borderBottom: '1px solid #eee', fontWeight: 700, position: 'sticky', top: 0, background: '#fff' }}>Notifications</div>
                  {notifications && notifications.length > 0 ? notifications.map(n => (
                    <div key={n.id} style={{ padding: 10, borderBottom: '1px solid #f2f2f2', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{n.title}</div>
                        <div style={{ fontSize: 13 }}>{n.body}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {!n.read && <button onClick={() => markNotificationRead(n.id)} style={{ background: '#26a65b', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 8px', cursor: 'pointer', fontSize: 12 }}>Mark</button>}
                      </div>
                    </div>
                  )) : <div style={{ padding: 12 }}>No notifications</div>}
                </div>
              )}
            </div>
            
            <div style={{ position: 'relative', marginRight: `${GAP_NOTIF_TO_WISHLIST}px` }}>
              <button 
                onClick={() => setShowWishlist(s => !s)} 
                title="Wishlist" 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#fff', 
                  cursor: 'pointer', 
                  padding: 0,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <FaHeart size="1.8em" />
                {wishlistCount > 0 && (
                  <span 
                    style={{ 
                      position: 'absolute',
                      top: '-8px',
                      right: '-10px',
                      background: '#8dc63f', 
                      color: '#000', 
                      borderRadius: '50%', 
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      border: '1px solid white',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>
              {showWishlist && (
                <div style={{ position: 'fixed', right: 24, top: 100, width: 360, background: '#fff', color: '#000', borderRadius: 8, boxShadow: '0 16px 48px rgba(0,0,0,0.18)', zIndex: 2100 }}>
                  <div style={{ padding: 12, borderBottom: '1px solid #eee', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Wishlist</span>
                    <span style={{ background: '#2f6920', color: '#fff', borderRadius: '999px', padding: '2px 8px', fontSize: 12 }}>{wishlistCount}</span>
                  </div>
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {wishlistItems.length === 0 && <div style={{ padding: 16, textAlign: 'center', color: '#999' }}>No items in wishlist</div>}
                    {wishlistItems.map(it => (
                      <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderBottom: '1px solid #f2f2f2' }}>
                        <img src={it.image || '/Images/1000petals.webp'} alt={it.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{it.name}</div>
                          <div style={{ color: '#666', fontSize: 13 }}>{it.unit || ''} • ₹{it.itemPrice || ''}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <button onClick={() => { addToCartGlobal({ id: it.id, name: it.name, itemPrice: it.itemPrice || 0, quantity: 1, totalPrice: (it.itemPrice || 0), image: it.image || (it.images && it.images[0]) }); removeFromWishlistGlobal(it.id); }} style={{ background: '#269627', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Add</button>
                          <button onClick={() => removeFromWishlistGlobal(it.id)} style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ marginRight: `${GAP_WISHLIST_TO_ACCOUNT}px` }}>
              <button 
                title="Account" 
                onClick={() => navigate('/profile')} 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#fff', 
                  cursor: 'pointer', 
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '1em'
                }}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name || 'Account'} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff' }} />
                ) : (
                  <div style={{ width: 29, height: 29, borderRadius: '50%', background: '#fff', color: '#2f6920', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{user?.name ? user.name.split(' ').map(n => n[0]).slice(0,2).join('') : <FaUser color="#2f6920" />}</div>
                )}
                {user?.name && <span style={{ fontWeight: 700 }}>{user.name}</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Search result modal (full product card) */}
      {/* Modal removed - inline product card is used in search dropdown */}

      <>
        <CategoryBar />

        <LocationPickerModal
          openPicker={openPicker}
          handleCloseLocationPicker={handleCloseLocationPicker}
          handleConfirmLocation={handleConfirmLocation}
          pickedPosition={pickedPosition}
          setPickedPosition={setPickedPosition}
          reverseGeocode={reverseGeocode}
        />

        <CurrencyConverterDialog
          open={showCalculator}
          onClose={handleCalculatorToggle}
        />
      </>
    </>
  );
}