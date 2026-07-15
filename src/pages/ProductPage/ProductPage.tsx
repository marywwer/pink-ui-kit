import {
  useMemo,
  useState,
} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "../../ui/Button/Button";
import { Snackbar } from "../../ui/Snackbar/Snackbar";
import { Tooltip } from "../../ui/Tooltip/Tooltip";

import { Header } from "../../widgets/Header/Header";
import { ReviewCard } from "../../widgets/ReviewCard/ReviewCard";
import { ReviewForm } from "../../widgets/ReviewForm/ReviewForm";

import { useAuth } from "../../store/auth/AuthContext";
import { useCartStore } from "../../store/cart/useCartStore";
import { useProductsStore } from "../../store/products/useProductsStore";
import { useReviewsStore } from "../../store/reviews/useReviewsStore";

import styles from "./Styles.module.scss";

export const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { isAuth } = useAuth();

  const products = useProductsStore((state) => state.products);

  const addToCart = useCartStore((state) => state.addToCart);

  const toggleFavorite = useCartStore((state) => state.toggleFavorite);

  const isFavorite = useCartStore((state) =>
    productId ? state.isFavorite(productId) : false,
  );

  const allReviews = useReviewsStore(
  (state) => state.reviews
);

const reviews = useMemo(() => {
  return allReviews.filter(
    (review) => review.productId === productId
  );
}, [allReviews, productId]);

  type SnackbarItem = {
    id: number;
    title?: string;
    message: string;
    leaving?: boolean;
  };

  const [snackbarItems, setSnackbarItems] = useState<SnackbarItem[]>([]);

  const product = products.find((item) => item.id === productId);

  const closeSnackbar = (id: number) => {
    setSnackbarItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              leaving: true,
            }
          : item,
      ),
    );

    window.setTimeout(() => {
      setSnackbarItems((currentItems) =>
        currentItems.filter((item) => item.id !== id),
      );
    }, 300);
  };

  const showSnackbar = (message: string) => {
    const id = Date.now();

    setSnackbarItems((currentItems) => [
      ...currentItems,
      {
        id,
        message,
      },
    ]);

    window.setTimeout(() => {
      closeSnackbar(id);
    }, 3000);
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    if (!isAuth) {
      showSnackbar("Войдите, чтобы добавить букет в корзину");

      return;
    }

    addToCart(product);
    showSnackbar("Букет добавлен в корзину");
  };

  const handleFavorite = () => {
    if (!product) {
      return;
    }

    if (!isAuth) {
      showSnackbar("Войдите, чтобы добавлять букеты в избранное");

      return;
    }

    toggleFavorite(product.id);

    showSnackbar(
      isFavorite ? "Букет удалён из избранного" : "Букет добавлен в избранное",
    );
  };

  if (!product) {
    return (
      <>
        <Header />

        <main className={styles.notFound}>
          <span className={styles.notFoundIcon}>♡</span>

          <h1>Букет не найден</h1>

          <p>Возможно, его уже разобрали или ссылка оказалась неправильной.</p>

          <Button type="button" onClick={() => navigate("/products")}>
            Вернуться в каталог
          </Button>
        </main>
      </>
    );
  }

  const reviewsRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : product.rating;

  const displayedReviewsCount =
    reviews.length > 0 ? reviews.length : product.reviewsCount;

  return (
    <>
      <Header />

      <main className={styles.page}>
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link to="/">Главная</Link>
          <span>/</span>
          <Link to="/products">Букеты</Link>
          <span>/</span>
          <span>{product.title}</span>
        </nav>

        <section className={styles.product}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={product.image}
              alt={product.title}
            />

            <div className={styles.badges}>
              {product.isNew && <span>Новинка</span>}

              {product.isPopular && <span>Популярное</span>}
            </div>
          </div>

          <div className={styles.productInfo}>
            <p className={styles.eyebrow}>Цветочная композиция</p>

            <h1>{product.title}</h1>

            <a className={styles.rating} href="#reviews">
              <span>★ {reviewsRating.toFixed(1)}</span>

              <span>
                {displayedReviewsCount}{" "}
                {displayedReviewsCount === 1 ? "отзыв" : "отзывов"}
              </span>
            </a>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.availability}>
              <span
                className={
                  product.isAvailable ? styles.available : styles.unavailable
                }
              />

              {product.isAvailable
                ? "Букет в наличии"
                : "Букет временно недоступен"}
            </div>

            <div className={styles.price}>
              <strong>{product.price.toLocaleString("ru-RU")} ₽</strong>

              {product.oldPrice && (
                <del>{product.oldPrice.toLocaleString("ru-RU")} ₽</del>
              )}
            </div>

            <div className={styles.actions}>
              <Button
                type="button"
                disabled={!product.isAvailable}
                onClick={handleAddToCart}
              >
                {product.isAvailable ? "Добавить в корзину" : "Нет в наличии"}
              </Button>

              <Tooltip
                content={
                  isFavorite ? "Убрать из избранного" : "Добавить в избранное"
                }
              >
                <button
                  className={`${styles.favoriteButton} ${
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

            <div className={styles.details}>
              <article>
                <strong>Фото перед доставкой</strong>
                <span>Покажем готовый букет перед отправкой</span>
              </article>

              <article>
                <strong>Бережная упаковка</strong>
                <span>Цветы приедут свежими и защищёнными</span>
              </article>

              <article>
                <strong>Доставка день в день</strong>
                <span>При оформлении заказа до 17:00</span>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.reviewsSection} id="reviews">
          <div className={styles.reviewsHeader}>
            <div>
              <p className={styles.eyebrow}>Мнение покупателей</p>

              <h2>Отзывы о букете</h2>
            </div>

            <div className={styles.reviewSummary}>
              <strong>{reviewsRating.toFixed(1)}</strong>

              <span>★ из 5</span>
            </div>
          </div>

          <div className={styles.reviewsLayout}>
            <div className={styles.reviewsList}>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div className={styles.emptyReviews}>
                  <span>♡</span>

                  <h3>Пока нет пользовательских отзывов</h3>

                  <p>Станьте первым, кто расскажет об этом букете.</p>
                </div>
              )}
            </div>

            <aside className={styles.reviewAside}>
              {isAuth ? (
                <ReviewForm productId={product.id} />
              ) : (
                <div className={styles.authMessage}>
                  <h2>Хотите оставить отзыв?</h2>

                  <p>
                    Смотреть отзывы можно без регистрации, а для публикации
                    необходимо войти в аккаунт.
                  </p>

                  <Button type="button" onClick={() => navigate("/login")}>
                    Войти
                  </Button>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>

      <Snackbar items={snackbarItems} onClose={closeSnackbar} />
    </>
  );
};
