
// For sliding images...

// only runs if slider on page...
const slider = document.getElementById('slider');

if (slider) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    let currSlide = 0;
    function showSlide(index) {
        if (index >= slides.length) {
            currSlide = 0;
        }
        else if (index < 0) {
            currSlide = slides.length - 1;
        }
        else {
            currSlide = index;
        }
    
        slider.style.transform = `translateX(-${currSlide * 100}%)`;
        dots.forEach((dot, i) => {
            if (i == currSlide) {
                dot.classList.add('active');
            }
            else {
                dot.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        showSlide(currSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currSlide - 1);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // auto play
    setInterval(nextSlide, 5000);    
}

// Hamburger for mobile:

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
}

// Shopping cart
let cart = [];

function addToCart(name, price) {
    console.log("Clicked!", name, price);
    const exists = cart.find(item => item.name == name);
    if(exists) {
        exists.quantity += 1;  // increase if existing item... exists ...lol
    }
    else {
        cart.push({name: name, price: price, quantity: 1});
    }
    updateCartDisplay();
    updateCartCount();

    showCart();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
}

function showCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
}

function updateCartDisplay() {
    const items = document.getElementById('cartItems');
    const total = document.getElementById('cartTotal');
    const actions = document.getElementById('cartActions');

    if (cart.length == 0) {
        items.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        total.style.display = 'none';
        actions.style.display = 'none';
    }
    else {
        items.innerHTML = cart.map( item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
       `).join('');

       const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
       document.getElementById('totalAmount').textContent = cartTotal.toFixed(2);

       total.style.display = 'block';
       actions.style.display = 'block';
    }
}

function updateCartCount() {
    const count = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    count.textContent = totalItems;
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
    updateCartCount();
}

function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        }
        else {
            updateCartDisplay();
            updateCartCount();
        }

    }
}

function clearCart() { 
    cart = []; 
    updateCartDisplay(); 
    updateCartCount(); 
}