import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import SortIcon from './sort.svg';
import { KeyboardEvent } from 'react';


export const Sort = ({  sort, setSort, className, ...props }: SortProps): JSX.Element => {

	const onKeyDown = (key:KeyboardEvent, type: SortEnum) => {
		if(['Space', 'Enter'].includes(key.code)){
			key.preventDefault();
			setSort(type);
		}
	};

	return  (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={cn(styles.sortLabel)} id='sort'>Сортировка</div>
			<span
				id='rating'
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort === SortEnum.Rating,
				})}
				onKeyDown={(key:KeyboardEvent) => onKeyDown(key,SortEnum.Rating )}
				tabIndex={0}
				aria-selected={sort === SortEnum.Rating}
				aria-labelledby='sort rating'
			>
				<SortIcon className={styles.sortIcon}/> По рейтингу
			</span>
			<span
				id='price'
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort === SortEnum.Price,
				})}
				onKeyDown={(key:KeyboardEvent) => onKeyDown(key,SortEnum.Price )}
				tabIndex={0}
				aria-selected={sort === SortEnum.Price}
				aria-labelledby='sort price'
			>
				<SortIcon className={styles.sortIcon}/> По цене
			</span>
		</div>
	);
};
