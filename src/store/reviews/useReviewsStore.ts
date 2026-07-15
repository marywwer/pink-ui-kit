import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Review } from '../../entities/review/types';

type AddReviewPayload = {
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
};

type ReviewsState = {
  reviews: Review[];

  addReview: (payload: AddReviewPayload) => void;
  removeReview: (reviewId: string) => void;
  getProductReviews: (
    productId: string
  ) => Review[];
};

export const useReviewsStore =
  create<ReviewsState>()(
    persist(
      (set, get) => ({
        reviews: [],

        addReview: (payload) => {
          const newReview: Review = {
            id: crypto.randomUUID(),
            ...payload,
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            reviews: [newReview, ...state.reviews],
          }));
        },

        removeReview: (reviewId) => {
          set((state) => ({
            reviews: state.reviews.filter(
              (review) => review.id !== reviewId
            ),
          }));
        },

        getProductReviews: (productId) => {
          return get().reviews.filter(
            (review) =>
              review.productId === productId
          );
        },
      }),
      {
        name: 'flower-shop-reviews',
      }
    )
  );