import {
  Product,
  ProductCategory,
} from '../../entities/product/types';
import { useProductsStore } from '../../store/products/useProductsStore';

type ProductsFilters = {
  search?: string;
  category?: ProductCategory | 'all';
  onlyAvailable?: boolean;
};

const delay = (ms = 500) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

export const mockProductsApi = {
  async getProducts(
    filters: ProductsFilters = {}
  ): Promise<Product[]> {
    await delay();

    const products =
      useProductsStore.getState().products;

    const {
      search = '',
      category = 'all',
      onlyAvailable = false,
    } = filters;

    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.description
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        category === 'all' ||
        product.category === category;

      const matchesAvailability =
        !onlyAvailable || product.isAvailable;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  },

  async getProductById(
    id: string
  ): Promise<Product> {
    await delay(300);

    const products =
      useProductsStore.getState().products;

    const product = products.find(
      (item) => item.id === id
    );

    if (!product) {
      throw new Error('Товар не найден');
    }

    return product;
  },

  async getPopularProducts(): Promise<Product[]> {
    await delay(400);

    const products =
      useProductsStore.getState().products;

    return products.filter(
      (product) => product.isPopular
    );
  },
};