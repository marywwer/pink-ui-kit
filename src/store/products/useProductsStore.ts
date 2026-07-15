import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../../entities/product/types';
import { products as initialProducts } from '../../shared/data/products';

type ProductsState = {
  products: Product[];

  toggleAvailability: (productId: string) => void;
  resetProducts: () => void;
};

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      products: initialProducts,

      toggleAvailability: (productId) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  isAvailable: !product.isAvailable,
                }
              : product
          ),
        }));
      },

      resetProducts: () => {
        set({
          products: initialProducts,
        });
      },
    }),
    {
      name: 'flower-shop-products',
    }
  )
);