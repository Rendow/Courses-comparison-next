import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';

export const ReviewForm = ({ className, productId, ...props }: ReviewFormProps): JSX.Element => {

	return (
		<>
			<div className={cn(styles.reviewForm, className)}>
				
				<Input placeholder='Имя'/>
				<Input className={styles.title} placeholder='Заголовок'/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Rating rating={0}/>
				</div>
				<TextArea className={styles.description} placeholder='Текст отзыва'/>
				<div className={styles.submit}>
					<Button appearance='primary'> Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}> Ваш отзыв отправлен</div>
				<div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
				<CloseIcon className={styles.close}/>
			</div>
		</>
		
	);
};