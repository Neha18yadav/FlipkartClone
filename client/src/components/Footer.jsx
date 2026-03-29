// Footer.jsx — Flipkart-style dark footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top section with links */}
        <div className="footer-top">
          <div className="footer-column">
            <h4>ABOUT</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>HELP</h4>
            <ul>
              <li><a href="#">Payments</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Cancellation & Returns</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>POLICY</h4>
            <ul>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Terms Of Use</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>SOCIAL</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
          <div className="footer-column footer-contact">
            <h4>Mail Us:</h4>
            <p>Flipkart Internet Private Limited,</p>
            <p>Buildings Alyssa, Begonia &</p>
            <p>Clove Embassy Tech Village,</p>
            <p>Bengaluru, 560103</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <span>Become a Seller</span>
            <span>Advertise</span>
            <span>Gift Cards</span>
            <span>Help Center</span>
            <span>© 2026 Flipkart Clone</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
