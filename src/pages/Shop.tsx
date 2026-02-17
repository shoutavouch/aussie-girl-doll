import { NavLink, useParams, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const Shop = () => {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  const [isDollsMenuOpen, setIsDollsMenuOpen] = useState(false)

  const categoryLabel = category
    ? `${category.charAt(0).toUpperCase()}${category.slice(1)}`
    : 'Shop all dolls'
  const typeLabel = type ? `${type.charAt(0).toUpperCase()}${type.slice(1)}` : ''
  const heading = typeLabel ? `${typeLabel} ${categoryLabel}` : categoryLabel

  const filteredProducts = products.filter((product) => {
    if (category && product.category !== category) return false
    if (type && product.type !== type) return false
    return true
  })

  const visibleProducts = !category && !type ? filteredProducts.slice(0, 6) : filteredProducts

  const typeOptions: Record<string, { key: string; label: string }[]> = {
    dolls: [
      { key: 'classic', label: 'Classic' },
      { key: 'historical', label: 'Historical' },
      { key: 'modern', label: 'Modern' },
      { key: 'limited', label: 'Limited' },
      { key: 'best-sellers', label: 'Best sellers' },
    ],
    clothing: [
      { key: 'everyday', label: 'Everyday' },
      { key: 'party', label: 'Party' },
      { key: 'school', label: 'School' },
      { key: 'sleep', label: 'Sleep' },
      { key: 'seasonal', label: 'Seasonal' },
    ],
    accessories: [
      { key: 'hair', label: 'Hair & styling' },
      { key: 'travel', label: 'Travel' },
      { key: 'play', label: 'Play' },
      { key: 'room', label: 'Room decor' },
      { key: 'pets', label: 'Pets' },
    ],
    books: [
      { key: 'story', label: 'Story' },
      { key: 'activity', label: 'Activity' },
    ],
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>{heading}</h1>
          <p className="muted">{visibleProducts.length} results</p>
          <p className="muted">
            {type
              ? `Browse ${typeLabel.toLowerCase()} picks curated for you.`
              : 'Discover dolls, outfits, and accessories made for storytelling.'}
          </p>
        </div>
        <div className="filter-row">
          <NavLink to="/shop" end className={({ isActive }) => `pill ${isActive ? 'pill--active' : ''}`}>
            All dolls
          </NavLink>
          <div className="nav-dropdown">
            <button
              className={`pill ${category === 'dolls' ? 'pill--active' : ''}`}
              type="button"
              aria-expanded={isDollsMenuOpen}
              aria-controls="shop-dolls-menu"
              onClick={() => setIsDollsMenuOpen((prev) => !prev)}
            >
              Dolls
            </button>
            {isDollsMenuOpen ? (
              <div className="dropdown-panel" id="shop-dolls-menu">
                <p className="dropdown-title">Doll categories</p>
                <div className="dropdown-links">
                  <NavLink to="/shop/dolls" className="text-link">
                    All dolls
                  </NavLink>
                  <NavLink to="/shop/dolls?type=classic" className="text-link">
                    Classic
                  </NavLink>
                  <NavLink to="/shop/dolls?type=historical" className="text-link">
                    Historical
                  </NavLink>
                  <NavLink to="/shop/dolls?type=modern" className="text-link">
                    Modern
                  </NavLink>
                  <NavLink to="/shop/dolls?type=limited" className="text-link">
                    Limited
                  </NavLink>
                  <NavLink to="/shop/dolls?type=best-sellers" className="text-link">
                    Best sellers
                  </NavLink>
                </div>
              </div>
            ) : null}
          </div>
          <NavLink
            to="/shop/accessories"
            className={() => `pill ${category === 'accessories' ? 'pill--active' : ''}`}
          >
            Accessories
          </NavLink>
          <NavLink
            to="/shop/clothing"
            className={() => `pill ${category === 'clothing' ? 'pill--active' : ''}`}
          >
            Clothing
          </NavLink>
          <NavLink
            to="/shop/books"
            className={() => `pill ${category === 'books' ? 'pill--active' : ''}`}
          >
            Books
          </NavLink>
        </div>
        {category && typeOptions[category] ? (
          <div className="filter-row">
            {typeOptions[category].map((option) => (
              <NavLink
                key={option.key}
                to={`/shop/${category}?type=${option.key}`}
                className={() => `pill ${type === option.key ? 'pill--active' : ''}`}
              >
                {option.label}
              </NavLink>
            ))}
          </div>
        ) : null}
      </section>

      {visibleProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-card">
            <h2>No matches yet</h2>
            <p>Try a different category or browse all dolls.</p>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop
