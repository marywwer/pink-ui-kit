import { Header } from '../../widgets/Header/Header';
import { Button } from '../../ui/Button/Button';
import { useProductsStore } from '../../store/products/useProductsStore';
import styles from './Styles.module.scss';

export const AdminPage = () => {
  const products = useProductsStore(
    (state) => state.products
  );

  const toggleAvailability = useProductsStore(
    (state) => state.toggleAvailability
  );

  const resetProducts = useProductsStore(
    (state) => state.resetProducts
  );

  const availableCount = products.filter(
    (product) => product.isAvailable
  ).length;

  return (
    <>
      <Header />

      <main className={styles.page}>
        <header className={styles.pageHeader}>
          <div>
            <p className={styles.eyebrow}>
              Панель управления
            </p>

            <h1>Администрирование товаров</h1>

            <span>
              Здесь администратор может менять
              наличие товаров в каталоге.
            </span>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={resetProducts}
          >
            Сбросить изменения
          </Button>
        </header>

        <section className={styles.statistics}>
          <article>
            <span>Всего товаров</span>
            <strong>{products.length}</strong>
          </article>

          <article>
            <span>В наличии</span>
            <strong>{availableCount}</strong>
          </article>

          <article>
            <span>Нет в наличии</span>
            <strong>
              {products.length - availableCount}
            </strong>
          </article>
        </section>

        <section className={styles.products}>
          {products.map((product) => (
            <article
              className={styles.product}
              key={product.id}
            >
              <img
                className={styles.image}
                src={product.image}
                alt={product.title}
              />

              <div className={styles.info}>
                <h2>{product.title}</h2>

                <p>{product.description}</p>

                <strong>
                  {product.price.toLocaleString(
                    'ru-RU'
                  )}{' '}
                  ₽
                </strong>
              </div>

              <div className={styles.actions}>
                <span
                  className={
                    product.isAvailable
                      ? styles.available
                      : styles.unavailable
                  }
                >
                  {product.isAvailable
                    ? 'В наличии'
                    : 'Нет в наличии'}
                </span>

                <Button
                  type="button"
                  variant={
                    product.isAvailable
                      ? 'secondary'
                      : 'primary'
                  }
                  onClick={() =>
                    toggleAvailability(product.id)
                  }
                >
                  {product.isAvailable
                    ? 'Снять с продажи'
                    : 'Вернуть в продажу'}
                </Button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};