import { useState } from 'react';
import { Bookmark, BookmarkCheck, Check, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { useCart } from '../../context/CartContext';
import { useBookmarks } from '../../context/BookmarkContext';
import { getContentDestination } from '../../utils/contentData';

export function AddToCartButton({
  product,
  itemType = 'merchandise',
  label = 'Add to Cart',
  className = '',
  style,
}) {
  const { addToCart } = useCart();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [added, setAdded] = useState(false);
  const isCharacterAction = itemType === 'character';
  const bookmarked = isCharacterAction && isBookmarked(product.id);

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isCharacterAction) {
      toggleBookmark({
        ...product,
        contentType: 'Character',
        destination: getContentDestination(product, 'Character'),
      });
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1200);
      return;
    }

    addToCart(product.id, itemType);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  const buttonLabel = isCharacterAction ? (bookmarked ? 'Saved to Collection' : 'Add to Collection') : label;
  const StatusIcon = isCharacterAction ? (bookmarked ? BookmarkCheck : Bookmark) : ShoppingCart;

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
            <span>{isCharacterAction ? 'Saved' : 'Added'}</span>
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
            <StatusIcon size={16} aria-hidden="true" />
            <span>{buttonLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
