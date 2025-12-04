import { useState, useEffect} from 'react';

function Menu() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/menu');
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      }
      catch (error) {
        console.error('Error w fetching menu: ', error);
        setLoading(false);
      }

    };

    const addToCart = (name, price) => {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            setCart(cart.map(item => item.name === name ? { ...item, quantity: item.quantity + 1} : item ));
        }
        else {
            setCart([...cart, {name, price, quantity: 1}]);
        }
        setIsCartOpen(true);
    };

    const updateQuantity = (name, change) => {
        setCart(cart.map(item => {
            if (item.name === name) {
                const newQuantity = item.quantity + change;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
            }
            return item;
        }).filter(Boolean));
    };

    const removeFromCart = (name) => {
        setCart(cart.filter(item => item.name !== name));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
    const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <>
            <section className="menu">
                <h1>Our Menu</h1>
                <p><em>All of our food is plant based and gluten-free!</em></p><br /> 

                {/*  OLD HARDCODED VERSION...
                <h2>Breakfast:</h2> <br /> 
                <div className="menu-grid" >
                    <div className="menu-item" onClick={() => addToCart('Avocado Toast', 9.99)}>
                    <img src="https://images.unsplash.com/photo-1650092194571-d3c1534562be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"/>
                    <h3>Avocado Toast</h3>
                    <p>Smashed organic avocado on toasted GF superseed bread, topped with cherry tomatoes, microgreens, hemp seeds, and a sprinkle of sea salt. </p>
                    <div className="item-footer">
                        <span className="price">$9.99</span>
                        <span className="click-text">Click to add to cart</span>
                    </div>
                </div>

                <div className="menu-item" onClick={() => addToCart('Açai Smoothie Bowl', 8.99)}>
                    <img src="https://images.unsplash.com/photo-1684403731883-67a71a793d2d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774"/>
                    <h3>Açai Smoothie Bowl</h3>
                    <p>Blend of organic açai berries topped with fresh strawberries, sliced bananas, crunchy granola, coconut flakes.</p>
                    <div className="item-footer">
                        <span className="price">$8.99</span>
                        <span className="click-text">Click to add to cart</span>
                    </div>
                </div>
                <div className="menu-item" onClick={() => addToCart('Breakfast Burrito', 9.99)}>
                    <img src="https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"/>
                    <h3>Breakfast Burrito</h3>
                    <p>GF wrap filled with seasoned tofu scramble, creamy avocado, sautéed peppers and onions, black beans, and fresh salsa.</p>
                    <div className="item-footer">
                        <span className="price">$9.99</span>
                        <span className="click-text">Click to add to cart</span>
                    </div>
                </div> 
            </div>
            <br />
            <h2>Lunch & Dinner:</h2>
            <br />
            <div className="menu-grid">
                <div className="menu-item" onClick={() => addToCart('Roasted Veggie Bowl', 12.99)}>
                    <img src="https://images.unsplash.com/photo-1631311695255-8dde6bf96cb5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=776"/>
                    <h3>Roasted Veggie Bowl</h3>
                    <p>Roasted sweet potatoes, seasonal vegetables, chickpeas, and quinoa drizzled with creamy tahini lemon dressing.</p>
                    <div className="item-footer">
                        <span className="price">$12.99</span>
                        <span className="click-text">Click to add to cart</span>
                    </div>
                </div>
                <div className="menu-item" onClick={() => addToCart('Black Bean Burger', 12.99)}>
                    <img src="https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=776"/>
                    <h3>Black Bean Burger</h3>
                    <p>House-made black bean patty topped with fresh lettuce, tomato, avocado, and vegan aioli on a toasted GF bun. Served with crispy sweet potato fries.</p>
                    <div className="item-footer">
                        <span className="price">$12.99</span>
                        <span className="click-text">Click to add to cart</span>
                    </div>
                </div>
                <div className="menu-item" onClick={() => addToCart('Pesto Pasta', 11.99)}>
                    <img src="https://plus.unsplash.com/premium_photo-1661293863488-4bed6c84c77a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774"/>
                    <h3>Pesto Pasta</h3>
                    <p>GF pasta tossed in house-made basil pesto with roasted cherry tomatoes, spinach, and pine nuts.</p>
                    <div className="item-footer">
                        <span className="price">$11.99</span>
                        <span className="click-text">Click to add to cart</span>
                    </div>

                </div>
            </div>
          */}

          { loading ? ( <p>Loading page...</p> ) : (
            <>
              <h2>Breakfast:</h2><br />
              <div className='menu-grid'>
                { menuItems
                      .filter(item => item.category === 'breakfast')
                      .map(item => (
                        <div key={item._id} className='menu-item' onClick={() => addToCart(item.name, item.price)}>
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
              <h2>Lunch & Dinner: </h2>
              <br />
              <div className='menu-grid'>
                { menuItems
                      .filter(item => item.category === 'lunch & dinner')
                      .map(item => (
                        <div key={item._id} className='menu-item' onClick={() => addToCart(item.name, item.price)}>
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
        <div key={item.name} className="cart-item">
          <div className="cart-item-info">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-price">${item.price.toFixed(2)} each</div>
          </div>
          <div className="quantity-controls">
            <button className="quantity-btn" onClick={() => updateQuantity(item.name, -1)}>-</button>
            <span className="quantity">{item.quantity}</span>
            <button className="quantity-btn" onClick={() => updateQuantity(item.name, 1)}>+</button>
          </div>
          <button className="remove-item" onClick={() => removeFromCart(item.name)}>Remove</button>
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
      </div>
    </>
  )}
</div>

{/* Cart Overlay */}
{isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
        </>

    )
}

export default Menu;