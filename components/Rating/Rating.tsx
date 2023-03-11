import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { KeyboardEvent, useEffect, useState } from 'react';

export const Rating = ({
	isEditable = false,
	rating,
	setRating,
	...props
}: RatingProps): JSX.Element => {

	const [rattingArray, setRattingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));


	useEffect(() => {
		constructRating(rating)
	}, [rating])
	
	const constructRating = (currentRating: number) => {
		const updatedArray = rattingArray.map((r:JSX.Element, index: number) => {
			return (
				<span 
					key={index}
					className={cn(styles.star,{
						[styles.filled]: index < currentRating,
						[styles.editable]: isEditable,
					})}
					onMouseEnter={() => changeDisplay(index+1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onStarClick(index+1)}
				>
					<StarIcon 
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(index+1, e)}
					/>
				</span>
			
			);
		});
		setRattingArray(updatedArray)
	};

	const changeDisplay = (index: number) => {
		if(!isEditable) return;

		return constructRating(index)
	};

	const onStarClick = (index: number) => {
		if(!isEditable || !setRating) return;
		setRating(index)
	};
	const handleSpace = (index: number, e: KeyboardEvent<SVGAElement>) => {
		if(e.code !== 'Space' || !setRating) return;
		setRating(index)
	};

	return (
		<div
			{...props}
		>
			{rattingArray.map((rating, index) => <span key={index}>{rating}</span>)}
		</div>
	);
};
