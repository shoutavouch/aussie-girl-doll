import { Link, useNavigate } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart()
  const navigate = useNavigate()
  const cloudfrontUrl = 'https://d14s99kolgjoai.cloudfront.net'
  const productImageSrc =
    product.category === 'dolls'
      ? `${cloudfrontUrl}${product.image.toLowerCase()}`
      : product.image

  return (
    <article className="product-card">
      <div className="product-card__header">
        <div
          className="product-card__image"
          role="button"
          tabIndex={0}
          onClick={() => navigate(`/shop/item/${product.slug}`)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              navigate(`/shop/item/${product.slug}`)
            }
          }}
        >
          <img src={productImageSrc} alt={product.name} loading="lazy" />
          {product.badge ? <span className="badge">{product.badge}</span> : null}
        </div>
        <p className="product-card__name">{product.name}</p>
      </div>
      <div className="product-card__content">
        <div className="product-card__meta">
          <span>${product.price}</span>
        </div>
        <div className="product-card__actions">
          <Link to={`/shop/item/${product.slug}`} className="text-link">
            View details
          </Link>
          <button
            className="secondary-button"
            type="button"
            onClick={() => addItem(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
