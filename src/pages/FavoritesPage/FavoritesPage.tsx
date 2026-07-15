import { Link } from "react-router-dom";
import { useProductsStore } from "../../store/products/useProductsStore";
import { useCartStore } from "../../store/cart/useCartStore";
import { Header } from "../../widgets/Header/Header";
import { ProductCard } from "../../widgets/ProductCard/ProductCard";
import { Button } from "../../ui/Button/Button";

import styles from "./Styles.module.scss";

export const FavoritesPage = () => {
  const products = useProductsStore((state) => state.products);

  const favoriteIds = useCartStore((state) => state.favoriteIds);

  const favoriteProducts = products.filter((product) =>
    favoriteIds.includes(product.id),
  );

  if (favoriteProducts.length === 0) {
    return (
      <>
        <Header />

        <main className={styles.empty}>
          <div className={styles.icon}>♡</div>

          <h1>В избранном пока пусто</h1>

          <p>
            Добавляйте понравившиеся букеты, чтобы не потерять их среди всей
            этой цветочной красоты.
          </p>

          <Link to="/products">
            <Button type="button">Смотреть букеты</Button>
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className={styles.page}>
        <header className={styles.header}>
          <p>Ваш выбор</p>
          <h1>Избранные букеты</h1>
          <span>Сохранено товаров: {favoriteProducts.length}</span>
        </header>

        <section className={styles.grid}>
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
};
