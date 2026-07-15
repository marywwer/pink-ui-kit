import { Link } from 'react-router-dom';
import { Product } from "../../entities/product/types";
import { Button } from "../../ui/Button/Button";
import { Tooltip } from "../../ui/Tooltip/Tooltip";
import { useAuth } from "../../store/auth/AuthContext";
import { useCartStore } from "../../store/cart/useCartStore";
import styles from "./Styles.module.scss";

type ProductCardProps = {
  product: Product;
  onRequireAuth?: () => void;
};

export const ProductCard = ({ product, onRequireAuth }: ProductCardProps) => {
  const { isAuth } = useAuth();

  const addToCart = useCartStore((state) => state.addToCart);

  const toggleFavorite = useCartStore((state) => state.toggleFavorite);

  const isFavorite = useCartStore((state) => state.isFavorite(product.id));

  const handleAddToCart = () => {
    if (!isAuth) {
      onRequireAuth?.();
      return;
    }

    addToCart(product);
  };

  const handleFavorite = () => {
    if (!isAuth) {
      onRequireAuth?.();
      return;
    }

    toggleFavorite(product.id);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageClip}>
          <Link
            className={styles.imageLink}
            to={`/products/${product.id}`}
            aria-label={`Открыть товар ${product.title}`}
          >
            <img
              className={styles.image}
              src={product.image}
              alt={product.title}
            />
          </Link>
        </div>

        <div className={styles.badges}>
          {product.isNew && <span className={styles.badge}>Новинка</span>}

          {product.isPopular && (
            <span className={styles.badge}>Популярное</span>
          )}
        </div>

        <div className={styles.favoriteWrapper}>
          <Tooltip
            content={
              isFavorite ? "Убрать из избранного" : "Добавить в избранное"
            }
          >
            <button
              className={`${styles.favorite} ${
                isFavorite ? styles.favoriteActive : ""
              }`}
              type="button"
              aria-label={
                isFavorite ? "Убрать из избранного" : "Добавить в избранное"
              }
              onClick={handleFavorite}
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </Tooltip>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.rating}>
          <span>★ {product.rating}</span>
          <Link
            className={styles.reviewsLink}
            to={`/products/${product.id}#reviews`}
          >
            {product.reviewsCount} отзывов
          </Link>
        </div>

        <Link
          className={styles.titleLink}
          to={`/products/${product.id}`}
        >
          <h3>{product.title}</h3>
        </Link>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.footer}>
          <div className={styles.price}>
            <strong>{product.price.toLocaleString("ru-RU")}₽</strong>

            {product.oldPrice && (
              <del>{product.oldPrice.toLocaleString("ru-RU")}₽</del>
            )}
          </div>

          <Button
            type="button"
            disabled={!product.isAvailable}
            onClick={handleAddToCart}
          >
            {product.isAvailable ? "В корзину" : "Нет в наличии"}
          </Button>
        </div>
      </div>
    </article>
  );
};
