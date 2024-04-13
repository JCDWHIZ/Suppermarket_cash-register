"use client";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const getInitialWishlist = () => {
    const data = localStorage.getItem("Wishlist");
    return data ? JSON.parse(data) : [];
  };

  const [cartItems, setCartItems] = useState(
    JSON.parse(sessionStorage.getItem("cartItems")) || []
  );

  const addToCart = (item) => {
    // Retrieve existing cart items from sessionStorage
    const existingCartItems =
      JSON.parse(sessionStorage.getItem("cartItems")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = existingCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      const updatedCartItems = [...existingCartItems];
      updatedCartItems[existingItemIndex].quantity += item.quantity;
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    } else {
      // If the item doesn't exist, add it to the cart
      const updatedCartItems = [...existingCartItems, item];
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    }
  };

  // const addToCart = (item) => {
  //   // Retrieve existing cart items from sessionStorage
  //   const existingCartItems =
  //     JSON.parse(sessionStorage.getItem("cartItems")) || [];

  //   // Add the new item to the existing cart items
  //   const updatedCartItems = [...existingCartItems, item];

  //   // Store the updated cart items in sessionStorage
  //   sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

  //   // Update the local state with the new cart items
  //   setCartItems(updatedCartItems);
  // };

  const removeFromCart = (itemId) => {
    // Retrieve existing cart items from sessionStorage
    const existingCartItems =
      JSON.parse(sessionStorage.getItem("cartItems")) || [];

    // Filter out the item with the given itemId
    const newCartItems = existingCartItems.filter((item) => item.id !== itemId);

    // Store the updated cart items in sessionStorage
    sessionStorage.setItem("cartItems", JSON.stringify(newCartItems));

    // Update the local state with the new cart items
    setCartItems(newCartItems);
  };

  // const removeFromCart = (index) => {
  //   // Retrieve existing cart items from sessionStorage
  //   const existingCartItems =
  //     JSON.parse(sessionStorage.getItem("cartItems")) || [];

  //   // Create a new array without the item to be removed
  //   const newCartItems = [
  //     ...existingCartItems.slice(0, index),
  //     ...existingCartItems.slice(index + 1),
  //   ];

  //   // Store the updated cart items in sessionStorage
  //   sessionStorage.setItem("cartItems", JSON.stringify(newCartItems));

  //   // Update the local state with the new cart items
  //   setCartItems(newCartItems);
  // };

  // const removeFromCart = (index) => {
  //   // Retrieve existing cart items from sessionStorage
  //   const existingCartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  //   // Create a new array without the item to be removed
  //   const newCartItems = [...existingCartItems.slice(0, index), ...existingCartItems.slice(index + 1)];

  //   // Store the updated cart items in sessionStorage
  //   sessionStorage.setItem("cartItems", JSON.stringify(newCartItems));

  //   // Update the local state with the new cart items
  //   setCartItems(newCartItems);
  // };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const [wishlist, setWishlist] = useState(getInitialWishlist);

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
        return [...prevWishlist, item];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((item) => item.id !== itemId);
      return updatedWishlist;
    });
  };

  useEffect(() => {
    localStorage.setItem("Wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <CartContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        cartItems,
        updateCartItemQuantity,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
