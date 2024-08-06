// button that display's count useState count +1 or -1 for item quantity


//if you not logged in you can still add things to your cart , 
//but if you are logged in the products you added to your cart will be added to your new profile 

import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Cart.css"

const Cart = ({ cart, setCart, isLoggedIn }) => {
  const navigate = useNavigate()

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate('/checkout'); // Need a checkout page to do this.
    } else {
      alert('Please log in to checkout'); // This would typically be a modal or a link to a login page.
      navigate('/secure/login'); //add it later
    }
  };

  return (
    // create a css class for cart-container *Bradley*
    <div className='cart-container'>
      <h2>MY CART</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className='cart-item'>
            <h3 className='item-name'>{item.name}</h3>
            <p className='item-description'>{item.description}</p>
            <p className='item-price'>Price: ${item.price}</p>
            <div className='item-controls'>
              <button className='remove-button' onClick={() => handleRemoveFromCart(index)}>Remove</button>

            </div>
          </div>
        ))
      )}
      <button className='checkout-button' onClick={handleCheckout} disabled={cart.length === 0}>Checkout</button>
      {/* the disable is used to disable the button when certain conditions are met, aka if the cart is empty   */}
    </div>
  )

}

export default Cart