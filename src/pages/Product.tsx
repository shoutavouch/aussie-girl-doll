import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

const Product = () => {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const { addItem } = useCart()
  const navigate = useNavigate()

  if (!product) {
    return (
      <div className="page">
        <h1>Product not found</h1>
        <Link className="text-link" to="/shop">
          Return to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <button className="back-button" type="button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="product-detail">
        <div className="product-detail__image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail__content">
          <Link to="/shop" className="text-link">
            Back to shop
          </Link>
          <h1>{product.name}</h1>
          <p className="muted">{product.tagline}</p>
          <div className="price-row">
            <span className="price">${product.price}</span>
            <span className="muted">{product.ageRange}</span>
          </div>
          <div className="product-actions">
            <button className="primary-button" type="button" onClick={() => addItem(product)}>
              Add to cart
            </button>
            <button className="secondary-button" type="button">
              Add gift wrap
            </button>
          </div>
          <div>
            <h2>Story notes</h2>
            <p>
              {product.name} comes with a unique story card, signature outfit details, and
              accessories designed to inspire imaginative play.
            </p>
          </div>
        </div>
      </div>
      <section className="section product-about">
        <h2>About {product.name}</h2>
        <p>
          {(
            {
              Kira:
                'She is a vet and she is kind, helping, caring, and fun, and loves to help animals.',
              Kim: 'She is kind, loves making new friends, and loves ballet.',
              Tara:
                'She is funny, kind, helpful, always happy to make a new friend, loves tenis, dancing, and building legos.',
              Bella:
                'She is kind, funny, helpful, and loves playing the piano in front of her stuffies.',
              Anna:
                'She is shy, kind, fun, likes theater, and loves performing her violin.',
              Saira:
                'She is outgoing, kind, loves crafts, and loves sports.',
            } as Record<string, string>)[product.name] ??
            'A thoughtful friend with a big imagination and a heart for adventure.'}
        </p>
        <p>{product.description}</p>
      </section>
      <section className="section">
        <div className="two-column">
          <div>
            <h2>What’s included</h2>
            <p>
              Collectible stand, keepsake packaging, and styling notes tailored to
              {` ${product.name}.`}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Product
