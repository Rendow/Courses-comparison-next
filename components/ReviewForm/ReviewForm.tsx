import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';
import { generalApi } from '../../api/general';
import { useState } from 'react';

export const ReviewForm = ({ className, productId,isOpened, ...props }: ReviewFormProps): JSX.Element => {

	const [isSuccessSend, setIsSuccessSend] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>({
		defaultValues: {
			name: '',
			title: '',
			description: '',
		},
	});

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await generalApi.createReview({...formData, productId});
			if(data.message){
				setIsSuccessSend(true);
				reset();
			} else {
				setErrorMessage('Что-то пошло не так');
			}
		} catch (error) {
			setErrorMessage((error as Error).message );
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}>
				<Controller
					control={control}
					name="name"
					rules={{
						required: 'Заполните поле.',
					}}
					render={({ field }) => {
						return <Input 
									{...field} 
									placeholder="Имя" 
									error={errors.name} 
									tabIndex={isOpened ? 0 : -1}
									aria-invalid={!!errors.name}
								/>;
					}}
				/>
				<Controller
					control={control}
					name="title"
					rules={{
						required: 'Заполните поле.',
					}}
					render={({ field }) => {
						return <Input 
									{...field} 
									tabIndex={isOpened ? 0 : -1} 
									placeholder="Заголовок" 
									className={styles.title} 
									error={errors.title} 
									aria-invalid={!!errors.title}
								/>;
					}}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name="rating"
						rules={{
							required: 'Укажите рейтинг',
						}}
						render={({ field }) => {
							return <Rating 
										isEditable 
										setRating={field.onChange} 
										rating={field.value} 
										ref={field.ref} 
										error={errors.rating} 
										tabIndex={isOpened ? 0 : -1}
									/>;
						}}
					/>
				</div>
				<Controller
					control={control}
					name="description"
					rules={{
						required: 'Заполните поле.',
					}}
					render={({ field }) => {
						return <TextArea 
									className={styles.description} 
									placeholder="Текст отзыва" 
									{...field}
									error={errors.description}
									tabIndex={isOpened ? 0 : -1}
									aria-label='Текст отзыва'
									aria-invalid={!!errors.description}

								/>;
					}}
				/>

				<div className={styles.submit}>
					<Button appearance="primary" tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}> Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccessSend &&
			<div className={cn(styles.success, styles.panel) } role='alert'>
				<div className={styles.successTitle}> Ваш отзыв отправлен</div>
				<div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
				<button  className={styles.close} onClick={() => setIsSuccessSend(false)} aria-label='Закрыть оповещение'>
					<CloseIcon/>
				</button>
				
			</div>}
			{errorMessage &&
			<div className={cn(styles.error, styles.panel) } role='alert'>
				Что-то пошло не так, попробуйте обновить страницу.
				<button onClick={() => setErrorMessage(undefined)} className={styles.close} aria-label='Закрыть оповещение'>
					<CloseIcon />
				</button>
			</div>}
		</form>
	);
};
