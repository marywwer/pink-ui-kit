import { Review } from '../../entities/review/types';
import { Avatar } from '../../ui/Avatar/Avatar';
import { Button } from '../../ui/Button/Button';
import { useAuth } from '../../store/auth/AuthContext';
import { useReviewsStore } from '../../store/reviews/useReviewsStore';
import styles from './Styles.module.scss';

type ReviewCardProps = {
  review: Review;
};

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const { user } = useAuth();

  const removeReview = useReviewsStore(
    (state) => state.removeReview
  );

  const canDelete =
    user?.id === review.userId ||
    user?.role === 'admin';

  const formattedDate = new Date(
    review.createdAt
  ).toLocaleDateString('ru-RU');

  const rating = Math.min(
    5,
    Math.max(0, Math.round(review.rating))
  );

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <Avatar
          name={review.userName}
          size="sm"
        />

        <div className={styles.author}>
          <strong className={styles.userName}>
            {review.userName}
          </strong>

          <span className={styles.date}>
            {formattedDate}
          </span>
        </div>

        <div
          className={styles.rating}
          aria-label={`Оценка: ${rating} из 5`}
        >
          <span aria-hidden="true">
            {'★'.repeat(rating)}
            {'☆'.repeat(5 - rating)}
          </span>
        </div>
      </div>

      <p className={styles.text}>
        {review.text}
      </p>

      {canDelete && (
        <div className={styles.actions}>
          <Button
            variant="secondary"
            type="button"
            onClick={() => removeReview(review.id)}
          >
            Удалить
          </Button>
        </div>
      )}
    </article>
  );
};