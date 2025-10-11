import React, { createContext, useState, useEffect, useContext } from "react";
import ITEMS from '../data/items';

const defaultContextValue = {
  deliveryStatus: "Delivering to: Not Selected",
  setDeliveryStatus: () => {},
  pickedPosition: [22.9734, 78.6569],
  setPickedPosition: () => {},
  darkTheme: false,
  toggleTheme: () => {},
  openPicker: false,
  handleLocationClick: () => {},
  handleCloseLocationPicker: () => {},
  handleConfirmLocation: () => {},
  reverseGeocode: () => {},
  showCalculator: false,
  handleCalculatorToggle: () => {},
  cartItems: [],
  addToCartGlobal: () => {},
  increaseQuantityGlobal: () => {},
  decreaseQuantityGlobal: () => {},
  removeItemGlobal: () => {},
  isCartOpen: false,
  toggleCart: () => {},
  wishlistItems: [],
  addToWishlistGlobal: () => {},
  removeFromWishlistGlobal: () => {},
  isInWishlist: () => false,
  notifications: [],
  addNotification: () => {},
  markNotificationRead: () => {},
  orders: [],
  placeOrder: () => {},
  user: null,
  setUser: () => {},
};

export const LocationContext = createContext(defaultContextValue);

export function LocationProvider({ children }) {
  const [deliveryStatus, setDeliveryStatus] = useState(
    "Delivering to: Not Selected"
  );
  const [pickedPosition, setPickedPosition] = useState([22.9734, 78.6569]);
  
  const [darkTheme, setDarkTheme] = useState(() => {
    try {
      const storedTheme = localStorage.getItem('agrigrowTheme');
      return storedTheme === 'true'; 
    } catch (error) {
      return false;
    }
  });

  const [openPicker, setOpenPicker] = useState(false); 
  const [showCalculator, setShowCalculator] = useState(false); 
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('agrigrowCart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const storedWishlist = localStorage.getItem('agrigrowWishlist');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      return [];
    }
  });
  
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem('agrigrowNotifications');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('agrigrowOrders');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('agrigrowUser');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });
  
  const toggleTheme = () => setDarkTheme((prev) => !prev);
  const handleLocationClick = () => setOpenPicker(true);
  const handleCloseLocationPicker = () => setOpenPicker(false);
  const handleConfirmLocation = () => setOpenPicker(false);
  const handleCalculatorToggle = () => setShowCalculator((prev) => !prev);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCartGlobal = (newItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);

      // normalize defaults
      const qty = typeof newItem.quantity === 'number' ? newItem.quantity : 1;
      const unitPrice = newItem.itemPrice || newItem.price || 0;
      const total = typeof newItem.totalPrice === 'number' ? newItem.totalPrice : unitPrice * qty;

      // determine image: prefer explicit image, then images[0], then lookup in ITEMS
  const foundItem = ITEMS.find(i => i.id == newItem.id);
  const imageURL = newItem.image || (newItem.images && newItem.images.length && newItem.images[0]) || (foundItem && foundItem.images && foundItem.images[0]) || null;

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const existing = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existing,
          // prefer incoming quantity/ratings/price but keep previous fields if missing
          quantity: qty || existing.quantity || 1,
          currentRating: newItem.currentRating ?? existing.currentRating,
          totalPrice: total || existing.totalPrice,
          image: existing.image || imageURL,
          itemPrice: existing.itemPrice || unitPrice,
        };
        return updatedItems;
      } else {
        const itemToStore = {
          id: newItem.id,
          name: newItem.name,
          image: imageURL,
          itemPrice: unitPrice,
          quantity: qty,
          currentRating: newItem.currentRating || 0,
          totalPrice: total,
          unit: newItem.unit || newItem.unitLabel || 'item'
        };
        return [...prevItems, itemToStore];
      }
    });
  };

  const updateCartItemQuantity = (itemId, change) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.itemPrice * newQuantity
        };
      }
      return item;
    }));
  };

  const increaseQuantityGlobal = (itemId) => updateCartItemQuantity(itemId, 1);
  const decreaseQuantityGlobal = (itemId) => updateCartItemQuantity(itemId, -1);
  
  const removeItemGlobal = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const addToWishlistGlobal = (item) => {
    setWishlistItems(prevItems => {
        if (!prevItems.some(i => i.id === item.id)) {
            // CRITICAL FIX: Ensure image is correctly extracted from either 'image' or 'images[0]'
            const imageURL = item.images ? item.images[0] : item.image;
            
            return [...prevItems, { 
                id: item.id, 
                name: item.name, 
                image: imageURL, 
                itemPrice: item.itemPrice,
                unit: item.unit || 'item'
            }];
        }
        return prevItems;
    });
  };

  const removeFromWishlistGlobal = (itemId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const isInWishlist = (itemId) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      let place =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.hamlet ||
        data.address?.county ||
        "";
      let country = data.address?.country || "";
      if (place && country)
        setDeliveryStatus(`Delivering to: ${place}, ${country}`);
      else if (place) setDeliveryStatus(`Delivering to: ${place}`);
      else if (country) setDeliveryStatus(`Delivering to: ${country}`);
      else setDeliveryStatus("Delivering to: Location Selected");
    } catch {
      setDeliveryStatus("Delivering to: Location Selected");
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('agrigrowCart', JSON.stringify(cartItems));
    } catch (error) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('agrigrowWishlist', JSON.stringify(wishlistItems));
    } catch (error) {}
  }, [wishlistItems]);

  useEffect(() => {
    try {
      localStorage.setItem('agrigrowNotifications', JSON.stringify(notifications));
    } catch (error) {}
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('agrigrowOrders', JSON.stringify(orders));
    } catch (error) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('agrigrowUser', JSON.stringify(user));
    } catch (error) {}
  }, [user]);

  const addNotification = (notif) => {
    setNotifications(prev => [{ id: Date.now(), title: notif.title, body: notif.body, read: false, date: new Date().toISOString() }, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const placeOrder = (order) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: order.items || cartItems,
      total: order.total || cartItems.reduce((s, it) => s + (it.totalPrice || (it.itemPrice * it.quantity)), 0),
      status: order.status || 'Placed',
      date: new Date().toISOString(),
      shipping: order.shipping || null,
    };
    setOrders(prev => [newOrder, ...prev]);
    // Optionally clear cart after placing order
    setCartItems([]);
    addNotification({ title: 'Order placed', body: `Your order ${newOrder.id} has been placed.` });
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    addNotification({ title: `Order ${orderId} updated`, body: `Status changed to ${status}` });
  };
  
  useEffect(() => {
    localStorage.setItem('agrigrowTheme', darkTheme);
    if (darkTheme) {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    }
  }, [darkTheme]);

  useEffect(() => {
    reverseGeocode(pickedPosition[0], pickedPosition[1]);
  }, [pickedPosition]);
  

  return (
    <LocationContext.Provider
      value={{
        deliveryStatus,
        setDeliveryStatus,
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
        cartItems,
        addToCartGlobal,
        increaseQuantityGlobal,
        decreaseQuantityGlobal,
        removeItemGlobal,
        isCartOpen,
        toggleCart,
        wishlistItems,
        addToWishlistGlobal,
        removeFromWishlistGlobal,
        isInWishlist,
        notifications,
        addNotification,
        markNotificationRead,
        orders,
        placeOrder,
        updateOrderStatus,
        user,
        setUser,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => useContext(LocationContext);