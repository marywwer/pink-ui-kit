import { FormEvent, useState } from 'react';

import { Button } from '../../ui/Button/Button';
import { Select } from '../../ui/Select/Select';
import { Snackbar } from '../../ui/Snackbar/Snackbar';

import { useAuth } from '../../store/auth/AuthContext';
import { useReviewsStore } from '../../store/reviews/useReviewsStore';

import styles from './Styles.module.scss';

type ReviewFormProps = {
  productId: string;
};

type SnackbarItem = {
  id: number;
  title?: string;
  message: string;
  leaving?: boolean;
};

export const ReviewForm = ({
  productId,
}: ReviewFormProps) => {
  const { user } = useAuth();

  const addReview = useReviewsStore(
    (state) => state.addReview
  );

  const [rating, setRating] = useState('5');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const [snackbarItems, setSnackbarItems] = useState<
    SnackbarItem[]
  >([]);

  const showSnackbar = (
    message: string,
    title?: string
  ) => {
    const id = Date.now();

    setSnackbarItems((currentItems) => [
      ...currentItems,
      {
        id,
        title,
        message,
      },
    ]);

    window.setTimeout(() => {
      closeSnackbar(id);
    }, 3000);
  };

  const closeSnackbar = (id: number) => {
    setSnackbarItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              leaving: true,
            }
          : item
      )
    );

    window.setTimeout(() => {
      setSnackbarItems((currentItems) =>
        currentItems.filter((item) => item.id !== id)
      );
    }, 300);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!user) {
      setError(
        'Чтобы оставить отзыв, необходимо авторизоваться'
      );

      return;
    }

    const normalizedText = text.trim();

    if (normalizedText.length < 10) {
      setError(
        'Отзыв должен содержать минимум 10 символов'
      );

      return;
    }

    if (normalizedText.length > 500) {
      setError(
        'Отзыв должен содержать не более 500 символов'
      );

      return;
    }

    addReview({
      productId,
      userId: user.id,
      userName: user.name,
      rating: Number(rating),
      text: normalizedText,
    });

    setText('');
    setRating('5');
    setError('');

    showSnackbar(
      'Ваш отзыв успешно добавлен',
      'Отзыв опубликован'
    );
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);

    if (error) {
      setError('');
    }
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div className={styles.header}>
          <h2>Оставить отзыв</h2>

          <p>
            Расскажите, понравился ли вам букет и
            соответствовал ли он фотографиям.
          </p>
        </div>

        <Select
          label="Оценка"
          value={rating}
          onChange={setRating}
          options={[
            {
              value: '5',
              label: '5 — великолепно',
            },
            {
              value: '4',
              label: '4 — хорошо',
            },
            {
              value: '3',
              label: '3 — нормально',
            },
            {
              value: '2',
              label: '2 — есть проблемы',
            },
            {
              value: '1',
              label: '1 — не понравилось',
            },
          ]}
        />

        <label className={styles.textareaLabel}>
          <span>Ваш отзыв</span>

          <textarea
            value={text}
            placeholder="Расскажите о впечатлениях..."
            minLength={10}
            maxLength={500}
            rows={5}
            onChange={handleTextChange}
          />

          <small>{text.length}/500</small>
        </label>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <Button type="submit">
          Опубликовать отзыв
        </Button>
      </form>

      <Snackbar
        items={snackbarItems}
        onClose={closeSnackbar}
      />
    </>
  );
};