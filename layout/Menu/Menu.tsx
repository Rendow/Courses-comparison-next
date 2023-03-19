import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interfaces';
import CoursesItem from './icons/courses.svg';
import ServicesItem from './icons/services.svg';
import ProductItem from './icons/product.svg';
import BooksItem from './icons/books.svg';
import { TopLevelCategory } from '../../interfaces/page.interfaces';
import styles from './Menu.module.css';
import cn from 'classnames';

const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Курсы', icon: <CoursesItem/>, id: TopLevelCategory.Courses },
	{ route: 'services', name: 'Сервисы', icon: <ServicesItem/>, id: TopLevelCategory.Services },
	{ route: 'books', name: 'Книги', icon: <BooksItem/>, id: TopLevelCategory.Books },
	{ route: 'product', name: 'Товары', icon: <ProductItem/>, id: TopLevelCategory.Product },
];

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((m) => (
					<div key={m.route}>
						<a href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id === firstCategory,
								})}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</a>
						{m.id === firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div  className={styles.secondBlock}>
				{menu.map((m) => (
					<div key={m._id.secondCategory}>
						<div className={styles.secondLevel}>{m._id.secondCategory}</div>
						<div
							className={cn(styles.secondLevelBlock, {
								[styles.secondLevelBlockOpened]: m.isOpened,
							})}
						>
							{buildThirdLevel(m.pages, menuItem.route)}
						</div>
					</div>
				))}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map((p) => (
			<a
				key={`/${route}/${p.alias}`}
				href={`/${route}/${p.alias}`}
				className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]: false,
				})}
				
			>
				{p.category}
			</a>
		));
	};

	return (
		<div className={styles.menu}>
			{buildFirstLevel()}
		</div>
	);
};
