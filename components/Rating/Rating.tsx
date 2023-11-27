import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { ForwardedRef, KeyboardEvent, forwardRef, useEffect, useRef, useState } from 'react';

// eslint-disable-next-line react/display-name
export const Rating = forwardRef(
	(
		{ isEditable = false, rating, setRating, error, tabIndex, ...props }: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [rattingArray, setRattingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		useEffect(() => {
			constructRating(rating);
		}, [rating, tabIndex]);

		const computeFocus = (r: number, index: number): number => {
			if (!isEditable) return -1;

			if (!r && index === 0) {
				return tabIndex ?? 0;
			}
			if (r === index + 1) {
				return tabIndex ?? 0;
			}
			return -1;
		};

		const constructRating = (currentRating: number) => {
			const updatedArray = rattingArray.map((r: JSX.Element, index: number) => {
				return (
					<span
						key={index}
						className={cn(styles.star, {
							[styles.filled]: index < currentRating,
							[styles.editable]: isEditable,
						})}
						onMouseEnter={() => changeDisplay(index + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onStarClick(index + 1)}
						tabIndex={computeFocus(rating, index)}
						onKeyDown={handleKey}
						ref={(r) => ratingArrayRef.current?.push(r)}
						role={isEditable ? 'slider' : ''}
						aria-valuemin={1}
						aria-valuemax={5}
						aria-valuenow={rating}
						aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
						aria-invalid={!!error}
					>
						<StarIcon />
					</span>
				);
			});
			setRattingArray(updatedArray);
		};

		const changeDisplay = (index: number) => {
			if (!isEditable) return;

			return constructRating(index);
		};

		const onStarClick = (index: number) => {
			if (!isEditable || !setRating) return;
			setRating(index);
		};

		const handleKey = (e: KeyboardEvent) => {
			if (!setRating || !isEditable) return;
			if (['ArrowRight', 'ArrowUp'].includes(e.code)) {
				e.preventDefault();
				if (!rating) {
					setRating(1);
				} else {
					setRating(rating < 5 ? rating + 1 : 5);
					ratingArrayRef.current[rating]?.focus();
				}
			}
			if (['ArrowLeft', 'ArrowDown'].includes(e.code)) {
				e.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		};

		return (
			<div
				{...props}
				ref={ref}
				className={cn(styles.ratingWrapper, {
					[styles.error]: error,
				})}
			>
				{rattingArray.map((rating, index) => (
					<span key={index}>{rating}</span>
				))}
				{error && (
					<span role="alert" className={styles.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);
