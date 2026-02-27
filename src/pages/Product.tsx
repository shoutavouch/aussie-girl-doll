import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

const Product = () => {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const { addItem } = useCart()
  const navigate = useNavigate()
  const cloudfrontUrl = 'https://d14s99kolgjoai.cloudfront.net'
  const detailVideoByName: Record<string, string> = {
    kira: `${cloudfrontUrl}/kira.mp4`,
    kim: `${cloudfrontUrl}/kim.mp4`,
    tara: `${cloudfrontUrl}/Tara.mp4`,
    bella: `${cloudfrontUrl}/Bella.mp4`,
    anna: `${cloudfrontUrl}/Anna.mp4`,
    saira: `${cloudfrontUrl}/Saira.mp4`,
  }
  const detailVideoSrc = product ? detailVideoByName[product.name.toLowerCase()] : undefined
  const isKim = product?.name.toLowerCase() === 'kim'
  const productImageSrc = product && product.category === 'dolls' ? `${cloudfrontUrl}${product.image.toLowerCase()}` : product?.image
  console.log('productImageSrc', productImageSrc)

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
        <div>
          <div className="product-detail__image">
            <img
              className={isKim ? 'product-detail__image-item product-detail__image-item--kim' : 'product-detail__image-item'}
              src={productImageSrc}
              alt={product.name}
            />
          </div>
          {detailVideoSrc ? (
            <video className="product-detail__video" controls preload="metadata">
              <source src={detailVideoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
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
              Mira:
                'She is a vet and she is kind, helping, caring, and fun, and loves to help animals.',
              katherin: 'She is kind, loves making new friends, and loves ballet.',
              Sophia:
                'She is funny, kind, helpful, always happy to make a new friend, loves tenis, dancing, and building legos.',
              Lana:
                'She is kind, funny, helpful, and loves playing the piano in front of her stuffies.',
              Lisa:
                'She is shy, kind, fun, likes theater, and loves performing her violin.',
              Annie:
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
