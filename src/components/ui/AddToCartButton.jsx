import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { Button } from './Button';
import { useCart } from '../../context/CartContext';

export function AddToCartButton({ product, className = '', style }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Button type="button" variant="ghost" className={className} style={style} onClick={handleAdd}>
      {added ? <Check size={16} aria-hidden="true" /> : <ShoppingCart size={16} aria-hidden="true" />}
      {added ? 'Added' : 'Add to Cart'}
    </Button>
  );
}
