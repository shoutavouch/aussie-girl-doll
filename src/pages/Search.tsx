import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const Search = () => {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return []
    return products.filter((product) => {
      const haystack = `${product.name} ${product.tagline} ${product.description}`.toLowerCase()
      return haystack.includes(trimmed)
    })
  }, [query])

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>Search</h1>
          <p className="muted">Find dolls, outfits, and accessories.</p>
        </div>
        <Link to="/shop" className="ghost-button">
          Browse all
        </Link>
      </section>

      <div className="search-panel">
        <label className="search-label" htmlFor="search-input">
          What are you looking for?
        </label>
        <div className="search-input">
          <input
            id="search-input"
            type="search"
            placeholder="Search by name, story, or style"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className="primary-button" type="button">
            Search
          </button>
        </div>
      </div>

      {query.trim().length === 0 ? (
        <div className="empty-state">
          <div className="empty-card">
            <h2>Start typing to search</h2>
            <p>Use keywords like classic, cozy, or adventure.</p>
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-card">
            <h2>No matches yet</h2>
            <p>Try a different keyword or browse all dolls.</p>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
