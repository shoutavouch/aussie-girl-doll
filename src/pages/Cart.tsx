import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, subtotal, totalItems, removeItem, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="page">
        <section className="page-hero">
          <div>
            <h1>Your cart</h1>
            <p className="muted">Your bag is empty. Let’s find a doll to love.</p>
          </div>
          <Link to="/shop" className="primary-button">
            Start shopping
          </Link>
        </section>
        <div className="empty-state">
          <div className="empty-card">
            <h2>Ready for a story?</h2>
            <p>
              Add a doll, outfit, or accessory to see them here. Your future favorites are
              waiting.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>Your cart</h1>
          <p className="muted">
            {totalItems} item{totalItems === 1 ? '' : 's'} ready for checkout.
          </p>
        </div>
        <button className="ghost-button" type="button" onClick={clearCart}>
          Clear cart
        </button>
      </section>
      <div className="cart-grid">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product.id} className="cart-item">
              <div className="cart-item__image" aria-hidden="true">
                {item.product.name.charAt(0)}
              </div>
              <div>
                <h3>{item.product.name}</h3>
                <p className="muted">{item.product.tagline}</p>
                <p className="muted">${item.product.price}</p>
              </div>
              <div className="cart-item__controls">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="cart-item__total">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="text-link"
                type="button"
                onClick={() => removeItem(item.product.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated shipping</span>
            <span>$8.00</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${(subtotal + 8).toFixed(2)}</span>
          </div>
          <button className="primary-button" type="button">
            Proceed to checkout
          </button>
        </aside>
      </div>
    </div>
  )
}

export default Cart
