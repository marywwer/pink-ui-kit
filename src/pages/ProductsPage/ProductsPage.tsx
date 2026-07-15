import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product, ProductCategory } from "../../entities/product/types";
import { useProductsStore } from "../../store/products/useProductsStore";
import { mockProductsApi } from "../../shared/api/mockProductsApi";
import { Header } from "../../widgets/Header/Header";
import { ProductCard } from "../../widgets/ProductCard/ProductCard";
import { Input } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import { Toggle } from "../../ui/Toggle/Toggle";
import { Snackbar } from "../../ui/Snackbar/Snackbar";
import styles from "./Styles.module.scss";

type CategoryFilter = ProductCategory | "all";

type SnackbarItem = {
  id: number;
  title?: string;
  message: string;
  leaving?: boolean;
};

export const ProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [snackbarItems, setSnackbarItems] = useState<SnackbarItem[]>([]);

  const redirectTimeoutRef = useRef<number | null>(null);

  const storeProducts = useProductsStore((state) => state.products);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const data = await mockProductsApi.getProducts({
          search,
          category,
          onlyAvailable,
        });

        setProducts(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [search, category, onlyAvailable, storeProducts]);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current !== null) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const handleCloseSnackbar = (id: number) => {
    setSnackbarItems((items) => items.filter((item) => item.id !== id));
  };

  const handleRequireAuth = () => {
    const snackbarId = Date.now();

    setSnackbarItems([
      {
        id: snackbarId,
        title: "Требуется авторизация",
        message: "Для корзины и избранного необходимо войти",
      },
    ]);

    if (redirectTimeoutRef.current !== null) {
      window.clearTimeout(redirectTimeoutRef.current);
    }

    redirectTimeoutRef.current = window.setTimeout(() => {
      setSnackbarItems([]);
      navigate("/login");
    }, 1200);
  };

  return (
    <>
      <Header />

      <main className={styles.page}>
        <header className={styles.pageHeader}>
          <p>Каталог Fleur</p>

          <h1>Букеты и цветочные композиции</h1>

          <span>
            Найдите букет для праздника, признания или просто хорошего дня.
          </span>
        </header>

        <section className={styles.filters}>
          <div className={styles.search}>
            <Input
              label="Поиск"
              placeholder="Название или описание букета"
              value={search}
              onChange={setSearch}
            />
          </div>

          <div className={styles.category}>
            <Select
              label="Категория"
              value={category}
              onChange={(value) => setCategory(value as CategoryFilter)}
              options={[
                {
                  value: "all",
                  label: "Все букеты",
                },
                {
                  value: "roses",
                  label: "Розы",
                },
                {
                  value: "peonies",
                  label: "Пионы",
                },
                {
                  value: "tulips",
                  label: "Тюльпаны",
                },
                {
                  value: "mixed",
                  label: "Сборные букеты",
                },
                {
                  value: "plants",
                  label: "Растения",
                },
              ]}
            />
          </div>

          <div className={styles.available}>
            <Toggle
              label="Только в наличии"
              checked={onlyAvailable}
              onChange={setOnlyAvailable}
            />
          </div>
        </section>

        <div className={styles.result}>
          Найдено товаров: <strong>{products.length}</strong>
        </div>

        {isLoading ? (
          <p className={styles.message}>Загружаем каталог...</p>
        ) : products.length > 0 ? (
          <section className={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onRequireAuth={handleRequireAuth}
              />
            ))}
          </section>
        ) : (
          <p className={styles.message}>
            По выбранным параметрам ничего не найдено.
          </p>
        )}
      </main>

      <Snackbar items={snackbarItems} onClose={handleCloseSnackbar} />
    </>
  );
};
