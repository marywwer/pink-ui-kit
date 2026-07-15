import { Product } from '../../entities/product/types';

export const products: Product[] = [
  {
    id: 'pink-cloud',
    title: 'Розовое облако',
    description:
      'Воздушный букет из розовых роз, эустомы и нежной зелени.',
    price: 4590,
    oldPrice: 5190,
    image: '/images/products/pink_cloud_flowers.jpg',
    category: 'roses',
    rating: 4.9,
    reviewsCount: 38,
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'peony-morning',
    title: 'Пионовое утро',
    description:
      'Нежный сезонный букет с пионами в молочно-розовой гамме.',
    price: 5890,
    image: '/images/products/peony_morning_flowers.jpg',
    category: 'peonies',
    rating: 5,
    reviewsCount: 24,
    isAvailable: true,
    isNew: true,
  },
  {
    id: 'spring-letter',
    title: 'Весеннее письмо',
    description:
      'Яркие тюльпаны для тех, кто соскучился по весне.',
    price: 2990,
    image: '/images/products/spring_letter_flowers.jpg',
    category: 'tulips',
    rating: 4.8,
    reviewsCount: 17,
    isAvailable: true,
  },
  {
    id: 'berry-dessert',
    title: 'Ягодный десерт',
    description:
      'Сборный букет с выразительными ягодными оттенками.',
    price: 3990,
    image: '/images/products/berry_dessert_flowers.jpg',
    category: 'mixed',
    rating: 4.7,
    reviewsCount: 31,
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'white-pearl',
    title: 'Белая жемчужина',
    description:
      'Светлый минималистичный букет для особенного события.',
    price: 4290,
    image: '/images/products/white_pearl_flowers.jpg',
    category: 'mixed',
    rating: 4.9,
    reviewsCount: 19,
    isAvailable: false,
  },
  {
    id: 'home-garden',
    title: 'Домашний сад',
    description:
      'Композиция из живых растений в декоративном кашпо.',
    price: 3490,
    image: '/images/products/home_garden_flowers.jpg',
    category: 'plants',
    rating: 4.6,
    reviewsCount: 12,
    isAvailable: true,
  },
];