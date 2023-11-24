import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import classNames from 'classnames';
import React, { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

const reviewVariants = {
	visible: {
		opacity: 1,
		height: 'auto'
	},
	hidden: {
		opacity: 0,
		height: 0
	}
};


// eslint-disable-next-line react/display-name
export const Product = motion(forwardRef(({ product,className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

	const reviewRef = useRef<HTMLDivElement>(null);

	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior:'smooth',
			block:'start',
		});
	};
	
	return (
		<div className={className} ref={ref}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image 
						src={ process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && 
						<Tag className={styles.oldPrice} color='green'>
							{priceRu(product.price - product.oldPrice)}
						</Tag>
					}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit) }/ <span className={styles.month}>мес</span>
				</div>
				
				<div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
				<div className={styles.tags}>
					{product.categories.map(c => <Tag className={styles.category} key={c} color='ghost'>{c}</Tag>)}
				</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>кредит</div>
				<div className={styles.rateTitle}> 
					<a href="#ref" onClick={scrollToReview}> {declOfNum(product.reviewCount, ['отзыв', 'отзыва','отзывов'])}</a>
				</div>
				<Divider className={styles.hr}/>
				
				<div className={styles.description}>{product.description} </div>
				<div className={styles.feature}> 
					{product.characteristics.map(el => {
						return <div key={el.name} className={styles.characteristics}>
							<span className={styles.characteristicName}> {el.name}</span>
							<span className={styles.characteristicDots}/>
							<span className={styles.characteristicValue}> {el.value}</span>
						</div>;
					})}
				</div>
				<div className={styles.advBlock}>
					{product.advantages &&
					<div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>}
					{product.disadvantages &&
					<div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>}
				</div>
				<Divider className={classNames(styles.hr, styles.hr2) }/>
				
				<div className={styles.actions}>
					<Button appearance='primary'>
						Узнать подробнее
					</Button>
					<Button 
						appearance='ghost' 
						arrow={isReviewOpened ? 'down' : 'right' }
						className={styles.reviewBtn}
						onClick={() => setIsReviewOpened(prev => !prev)}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<motion.div 
				layout
				variants={reviewVariants}
				initial={'hidden'}
				animate={isReviewOpened ? 'visible' : 'hidden'}
			>
				<Card 
					color='blue' 
					className={classNames(styles.review) }
					ref={reviewRef}
				>
						{product.reviews.map(el => (
							<React.Fragment key={el._id} >
								<Review  review={el} />
								<Divider/>
							</React.Fragment>
							
						))}
						<ReviewForm productId={product._id} />
				</Card>
			</motion.div>
		</div>
		
	);
}));
