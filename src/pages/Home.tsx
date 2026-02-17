const Home = () => {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">New arrivals</p>
          <h1>Meet dolls made for every story</h1>
          <p className="hero-subtitle">
            Bring home a doll with a rich backstory, keepsake accessories, and outfits
            designed for imagination.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button">
              Shop all dolls
            </button>
            <button className="secondary-button" type="button">
              Build a bundle
            </button>
          </div>
        </div>
        <div className="hero-card" aria-hidden="true">
          <div className="hero-card__image">
            <span className="hero-logo" aria-hidden="true">
              <span className="hero-logo__text">AD</span>
              <span className="hero-logo__heart">💗</span>
            </span>
          </div>
          <div>
            <p className="muted">Starter Kit</p>
            <h3>Storytime essentials</h3>
            <p>Includes doll + outfit + activity journal.</p>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <div>
          <h2>Designed for keepsake moments</h2>
          <p className="muted">
            Every doll comes with a story card, quality fabrics, and a collectible stand.
          </p>
        </div>
        <div className="highlight-grid">
          <div>
            <h3>Outfits & accessories</h3>
            <p className="muted">Mix and match seasonal collections.</p>
          </div>
          <div>
            <h3>Story journals</h3>
            <p className="muted">Encourage creativity with guided prompts.</p>
          </div>
          <div>
            <h3>Gift-ready packaging</h3>
            <p className="muted">Beautifully boxed for celebrations.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
