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

export const Product = ({ product,className, ...props }: ProductProps): JSX.Element => {

	return (
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
			<div className={styles.rateTitle}> {declOfNum(product.reviewCount, ['отзыв', 'отзыва','отзывов'])}</div>
			<Divider className={styles.hr}/>
			
			<div className={styles.description}>{product.description} </div>
			<div className={styles.feature}> 
				{product.characteristics.map(el => {
					return <div key={el.name} className={styles.characteristics}>
						<span className={styles.characteristicName}> {el.name}</span>
						<span className={styles.characteristicDots}/>
						<span className={styles.characteristicValue}> {el.value}</span>
					</div>
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
				<Button appearance='ghost' arrow='right' className={styles.reviewBtn}>
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};
