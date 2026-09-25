import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { useCart } from '../../context/CartContext';

export function AddToCartButton({
  product,
  itemType = 'merchandise',
  label = 'Add to Cart',
  className = '',
  style,
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product.id, itemType);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Button type="button" variant="ghost" className={className} style={{...style, position: 'relative', overflow: 'hidden'}} onClick={handleAdd}>
      <AnimatePresence mode="wait">
        {added ? (
          <motion.div
            key="added"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Check size={16} aria-hidden="true" />
            <span>Added</span>
          </motion.div>
        ) : (
          <motion.div
            key="add"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShoppingCart size={16} aria-hidden="true" />
            <span>{label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
