import { useState, useEffect} from 'react';

function Menu() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
    const [orderStatus, setOrderStatus] = useState('');

    useEffect(() => { fetchMenuItems(); }, []);

    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://bellas-bites.onrender.com/');
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      }
      catch (error) {
        console.error('Error w fetching menu: ', error);
        setLoading(false);
      }
    };

    const addToCart = (menuItem) => {
        const existingItem = cart.find(item => item._id === menuItem._id);
        if (existingItem) {
          setCart(cart.map(item => item._id === menuItem._id ? { ...item, quantity: item.quantity + 1} : item ));
        }
        else {
          setCart([...cart, {...menuItem, quantity: 1}]);
        }
        setIsCartOpen(true);
    };

    const updateQuantity = (name, change) => {
        setCart(cart.map(item => {
            if (item._id === name) {
              const newQuantity = item.quantity + change;
              return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
            }
            return item;
        }).filter(Boolean));
    };

    const removeFromCart = (name) => {
        setCart(cart.filter(item => item._id !== name));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
    const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
      setOrderStatus('submitting');

      try {
        const orderData = {
          customerInfo,
          items: cart,
          totalAmount: getTotalPrice()
        };
        const response = await fetch('https://bellas-bites.onrender.com/api/orders', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(orderData)
        });
        const result = await response.json();
        
        if (response.ok) {
          setOrderStatus('success');
          setCart([]);
          setCustomerInfo({ name: '', email: '', phone: ''});
          setTimeout(() => {
            setShowCheckout(false);
            setOrderStatus('');
            setIsCartOpen(false);
          }, 3000);
        }
        else {
          setOrderStatus('error');
        }
      } catch (error) {
        console.error('Order submission error: ', error);
        setOrderStatus('error');
      }
    };

    return (
        <>
            <section className="menu">
                <h1>Our Menu</h1>
                <p><em>All of our food is plant based and gluten-free!</em></p><br /> 

                {loading ? ( 
                    <p>Loading page...</p> 
                ) : (
                    <>
                      <h2>Breakfast:</h2><br />
                      <div className='menu-grid'>
                        {menuItems
                              .filter(item => item.category === 'breakfast')
                              .map(item => (
                                <div key={item._id} className='menu-item' onClick={() => addToCart(item)}>
                                  <img src={item.image} alt={item.name} />
                                  <h3>{item.name}</h3>
                                  <p>{item.description}</p>
                                  <div className='item-footer'>
                                    <span className='price'>${item.price.toFixed(2)}</span>
                                    <span className='click-text'>Click to add to cart</span>
                                  </div>
                                </div>
                              ))}
                      </div>
                      <br />
                      <h2>Lunch & Dinner:</h2>
                      <br />
                      <div className='menu-grid'>
                        {menuItems
                              .filter(item => item.category === 'lunch & dinner')
                              .map(item => (
                                <div key={item._id} className='menu-item' onClick={() => addToCart(item)}>
                                  <img src={item.image} alt={item.name} />
                                  <h3>{item.name}</h3>
                                  <p>{item.description}</p>
                                  <div className='item-footer'>
                                    <span className="price">${item.price.toFixed(2)}</span>
                                    <span className='click-text'>Click to add to cart</span>
                                  </div>
                                </div>
                              ))
                        }
                      </div>
                    </>
                )}
            </section>

            {/* Floating Cart Button */}
            <div className="floating-cart-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
              <i className="fa fa-shopping-cart" style={{fontSize:'24px'}}></i>
              <span className="cart-count">{getTotalItems()}</span>
            </div>

            {/* Cart Sidebar */}
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
              <div className="cart-header">
                <button className="close-cart" onClick={() => setIsCartOpen(false)}>✖</button>
                <h2>Your Cart</h2>
              </div>
              <div className="cart-items">
                {cart.length === 0 ? (
                  <p className="empty-cart">Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} className="cart-item">
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">${item.price.toFixed(2)} each</div>
                      </div>
                      <div className="quantity-controls">
                        <button className="quantity-btn" onClick={() => updateQuantity(item._id, -1)}>-</button>
                        <span className="quantity">{item.quantity}</span>
                        <button className="quantity-btn" onClick={() => updateQuantity(item._id, 1)}>+</button>
                      </div>
                      <button className="remove-item" onClick={() => removeFromCart(item._id)}>Remove</button>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <>
                  <div className="cart-actions">
                    <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
                  </div>
                  <div className="cart-total">
                    <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
                    <button 
                      className='checkout-btn'
                      onClick={() => setShowCheckout(true)}
                      disabled={cart.length === 0}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Cart Overlay */}
            {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}

            {/* Checkout Modal */}
            {showCheckout && (
              <div className='checkout-overlay'>
                <div className='checkout-modal'>
                  <div className='checkout-header'>
                    <h2>Checkout</h2>
                    <button onClick={() => setShowCheckout(false)}>✖</button>
                  </div>

                  {orderStatus === 'success' ? (
                    <div className='success-message'>
                      <h3>Order placed successfully</h3>
                      <p>Thank you for your order!</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
                      <div className='form-group'>
                        <label>Name:</label>
                        <input 
                          type='text'
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Email:</label>
                        <input 
                          type='email'
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Phone:</label>
                        <input 
                          type='tel'
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className='order-summary'>
                        <h3>Order Summary:</h3>
                        {cart.map(item => (
                          <div key={item.name}>
                            {item.name} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        ))}
                        <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                      </div>

                      <button 
                        type='submit'
                        disabled={orderStatus === 'submitting'}
                        className='place-order-btn'
                      > 
                        {orderStatus === 'submitting' ? 'Placing Order...' : 'Place Order'}
                      </button>
                      
                      {orderStatus === 'error' && (
                        <p className='error-message'>Error placing order. Please try again later.</p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            )}
        </>
    );
}

export default Menu;