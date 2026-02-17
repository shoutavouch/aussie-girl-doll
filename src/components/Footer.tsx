const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>About Australian Girl</h3>
          <p>
            A modern doll brand celebrating imagination, confidence, and unforgettable
            stories.
          </p>
        </div>
        <div>
          <h3>Customer Care</h3>
          <ul>
            <li>Shipping & returns</li>
            <li>Care instructions</li>
            <li>Gift packaging</li>
          </ul>
        </div>
        <div>
          <h3>Stay in touch</h3>
          <p>Get updates on new dolls, bundles, and storytelling tips.</p>
          <div className="newsletter">
            <input type="email" placeholder="Email address" />
            <button type="button">Sign up</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Australian Girl. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
