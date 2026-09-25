import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const formatPrice = (value) => `$${value.toFixed(2)}`;

export function CartPage() {
  const { items, totalQuantity, subtotal, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <main className="fv-cart-page">
      <Container>
        <header className="fv-cart-header">
          <div className="fv-cart-kicker">COLLECTIBLES / TEMPORARY CART</div>
          <h1>Your cart</h1>
          <p>Collect pieces from the worlds you love. This is a demo cart with no real checkout.</p>
          <span className="fv-cart-total-count">{totalQuantity} {totalQuantity === 1 ? 'ITEM' : 'ITEMS'}</span>
        </header>

        {items.length > 0 ? (
          <div className="fv-cart-layout">
            <section className="fv-cart-items" aria-label="Cart items">
              {items.map((item) => {
                const isCharacter = item.type === 'character';
                const priceLabel = isCharacter ? 'Character collectible' : `${formatPrice(item.unitPrice)} each`;
                const lineTotal = isCharacter ? 'Character collectible' : formatPrice(item.unitPrice * item.quantity);

                return (
                <article className="fv-cart-item" key={`${item.type}-${item.id}`}>
                  <div className="fv-cart-item-image">
                    {item.image ? <img src={item.image} alt={item.title} /> : <div className="fv-cart-item-placeholder">FANDOMVERSE</div>}
                  </div>
                  <div className="fv-cart-item-info">
                    <div className="fv-cart-item-meta">{item.category} / {item.type}</div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <span className="fv-cart-item-price">{priceLabel}</span>
                  </div>
                  <div className="fv-cart-item-controls">
                    <div className="fv-cart-quantity" aria-label={`Quantity for ${item.title}`}>
                      <button type="button" onClick={() => decreaseQuantity(item.id, item.type)} aria-label={`Decrease quantity for ${item.title}`}>
                        <Minus size={16} aria-hidden="true" />
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button type="button" onClick={() => increaseQuantity(item.id, item.type)} aria-label={`Increase quantity for ${item.title}`}>
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <strong>{lineTotal}</strong>
                    <button type="button" className="fv-cart-remove" onClick={() => removeFromCart(item.id, item.type)} aria-label={`Remove ${item.title} from cart`}>
                      <Trash2 size={17} aria-hidden="true" /> Remove
                    </button>
                  </div>
                </article>
                );
              })}
            </section>

            <aside className="fv-cart-summary" aria-label="Cart summary">
              <div className="fv-cart-summary-kicker">ORDER SUMMARY</div>
              <div className="fv-cart-summary-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="fv-cart-summary-divider" />
              <div className="fv-cart-summary-row fv-cart-summary-total">
                <span>Total</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <button type="button" className="fv-cart-demo-button" disabled>
                Checkout Demo
              </button>
              <span className="fv-cart-demo-note">Purchase flow coming soon. No payment is collected.</span>
              <Link to="/search?q=merchandise" className="fv-cart-continue"><ArrowLeft size={16} aria-hidden="true" /> Continue discovering</Link>
            </aside>
          </div>
        ) : (
          <section className="fv-cart-empty">
            <ShoppingCart size={30} aria-hidden="true" />
            <span className="fv-cart-empty-number">00</span>
            <h2>Your cart is empty</h2>
            <p>Discover merchandise from your favorite worlds.</p>
            <Link to="/search?q=merchandise" className="fv-cart-discover">Browse merchandise</Link>
          </section>
        )}
      </Container>
    </main>
  );
}
