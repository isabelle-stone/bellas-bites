function Footer() {
    return (
      <footer>
        <div className='footer-content'>
          <div className='footer-section'>
            <h3>About Us</h3>
            <p>Bella's Bites serves delicious plant-based & gluten-free food in the heart of New York.</p>
          </div>
          <div className="footer-section">
            <h3>Business Hours</h3>
            <p>Monday-Saturday: 8:00am - 8:00pm</p>
            <p>Sunday: 10:00am - 3:00pm</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us!</h3>
            <div className="social-links">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;