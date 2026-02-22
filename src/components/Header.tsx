import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link nav-link--active' : 'nav-link'

const Header = () => {
  const { totalItems } = useCart()
  const [isDollsOpen, setIsDollsOpen] = useState(false)
  const [isAccessoriesOpen, setIsAccessoriesOpen] = useState(false)
  const [isClothingOpen, setIsClothingOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const accessoriesRef = useRef<HTMLDivElement | null>(null)
  const clothingRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isDollsActive = location.pathname.startsWith('/shop/dolls')
  const isAccessoriesActive = location.pathname.startsWith('/shop/accessories')
  const isClothingActive = location.pathname.startsWith('/shop/clothing')

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsDollsOpen(false)
      }
      if (accessoriesRef.current && !accessoriesRef.current.contains(event.target as Node)) {
        setIsAccessoriesOpen(false)
      }
      if (clothingRef.current && !clothingRef.current.contains(event.target as Node)) {
        setIsClothingOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <header className="site-header">
      <div className="container header-content">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            AD
          </span>
          <div>
            <p className="brand-title">
              Australian Doll <span className="brand-heart" aria-hidden="true">💗</span>
            </p>
            <p className="brand-subtitle">Stories to treasure</p>
          </div>
        </Link>
        <nav className="nav">
          <NavLink to="/" className={navLinkClassName} end>
            Home
          </NavLink>
          <NavLink to="/shop" className={navLinkClassName} end>
            Shop
          </NavLink>
          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              className={`nav-link nav-link--button ${isDollsActive ? 'nav-link--active' : ''}`}
              type="button"
              aria-expanded={isDollsOpen}
              aria-controls="dolls-menu"
              onClick={() => {
                navigate('/shop/dolls')
                setIsDollsOpen((prev) => !prev)
              }}
            >
              Dolls
            </button>
            {isDollsOpen ? (
              <div className="dropdown-panel" id="dolls-menu">
                <p className="dropdown-title">Shop by doll category</p>
                <div className="dropdown-links">
                  <Link
                    to="/shop/dolls"
                    className="text-link"
                    onClick={() => setIsDollsOpen(false)}
                  >
                    All dolls
                  </Link>
                  <Link
                    to="/shop/dolls?type=classic"
                    className="text-link"
                    onClick={() => setIsDollsOpen(false)}
                  >
                    Classic dolls
                  </Link>
                  <Link
                    to="/shop/dolls?type=historical"
                    className="text-link"
                    onClick={() => setIsDollsOpen(false)}
                  >
                    Historical dolls
                  </Link>
                  <Link
                    to="/shop/dolls?type=modern"
                    className="text-link"
                    onClick={() => setIsDollsOpen(false)}
                  >
                    Modern dolls
                  </Link>
                  <Link
                    to="/shop/dolls?type=limited"
                    className="text-link"
                    onClick={() => setIsDollsOpen(false)}
                  >
                    Limited editions
                  </Link>
                  <Link
                    to="/shop/dolls?type=best-sellers"
                    className="text-link"
                    onClick={() => setIsDollsOpen(false)}
                  >
                    Best sellers
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          <div className="nav-dropdown" ref={accessoriesRef}>
            <button
              className={`nav-link nav-link--button ${isAccessoriesActive ? 'nav-link--active' : ''}`}
              type="button"
              aria-expanded={isAccessoriesOpen}
              aria-controls="accessories-menu"
              onClick={() => {
                navigate('/shop/accessories')
                setIsAccessoriesOpen((prev) => !prev)
              }}
            >
              Accessories
            </button>
            {isAccessoriesOpen ? (
              <div className="dropdown-panel" id="accessories-menu">
                <p className="dropdown-title">Shop by accessory</p>
                <div className="dropdown-links">
                  <Link
                    to="/shop/accessories?type=hair"
                    className="text-link"
                    onClick={() => setIsAccessoriesOpen(false)}
                  >
                    Hair & styling
                  </Link>
                  <Link
                    to="/shop/accessories?type=travel"
                    className="text-link"
                    onClick={() => setIsAccessoriesOpen(false)}
                  >
                    Travel sets
                  </Link>
                  <Link
                    to="/shop/accessories?type=play"
                    className="text-link"
                    onClick={() => setIsAccessoriesOpen(false)}
                  >
                    Play accessories
                  </Link>
                  <Link
                    to="/shop/accessories?type=room"
                    className="text-link"
                    onClick={() => setIsAccessoriesOpen(false)}
                  >
                    Room decor
                  </Link>
                  <Link
                    to="/shop/accessories?type=school"
                    className="text-link"
                    onClick={() => setIsAccessoriesOpen(false)}
                  >
                    School supplies
                  </Link>
                  <Link
                    to="/shop/accessories?type=little-dolls"
                    className="text-link"
                    onClick={() => setIsAccessoriesOpen(false)}
                  >
                    Little dolls
                  </Link>
                  <Link
                    to="/shop/accessories?type=instruments"
                    className="text-link"
                    onClick={() => setIsAccessoriesOpen(false)}
                  >
                    Instruments
                  </Link>
                  <Link
                    to="/shop/accessories?type=pets"
                    className="text-link"
                    onClick={() => setIsAccessoriesOpen(false)}
                  >
                    Pets & companions
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          <div className="nav-dropdown" ref={clothingRef}>
            <button
              className={`nav-link nav-link--button ${isClothingActive ? 'nav-link--active' : ''}`}
              type="button"
              aria-expanded={isClothingOpen}
              aria-controls="clothing-menu"
              onClick={() => {
                navigate('/shop/clothing')
                setIsClothingOpen((prev) => !prev)
              }}
            >
              Clothing
            </button>
            {isClothingOpen ? (
              <div className="dropdown-panel" id="clothing-menu">
                <p className="dropdown-title">Shop by clothing</p>
                <div className="dropdown-links">
                  <Link
                    to="/shop/clothing?type=everyday"
                    className="text-link"
                    onClick={() => setIsClothingOpen(false)}
                  >
                    Everyday outfits
                  </Link>
                  <Link
                    to="/shop/clothing?type=party"
                    className="text-link"
                    onClick={() => setIsClothingOpen(false)}
                  >
                    Party looks
                  </Link>
                  <Link
                    to="/shop/clothing?type=school"
                    className="text-link"
                    onClick={() => setIsClothingOpen(false)}
                  >
                    School uniforms
                  </Link>
                  <Link
                    to="/shop/clothing?type=sleep"
                    className="text-link"
                    onClick={() => setIsClothingOpen(false)}
                  >
                    Sleepwear & cozy
                  </Link>
                  <Link
                    to="/shop/clothing?type=seasonal"
                    className="text-link"
                    onClick={() => setIsClothingOpen(false)}
                  >
                    Seasonal sets
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          <NavLink to="/shop/books" className={navLinkClassName}>
            Books
          </NavLink>
          <NavLink to="/about" className={navLinkClassName}>
            About
          </NavLink>
          <NavLink to="/cart" className={navLinkClassName}>
            Cart ({totalItems})
          </NavLink>
          <NavLink to="/search" className={navLinkClassName}>
            Search
          </NavLink>
        </nav>
        <button className="cta-button" type="button">
          Join the Club
        </button>
      </div>
    </header>
  )
}

export default Header
