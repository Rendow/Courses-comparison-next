import { KeyboardEvent, useContext, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interfaces';

import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Menu.module.css';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion'


const variants = {
	visible: {
		marginBottom: 20,
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.1
		}
	},
	hidden: {
		marginBottom: 0
	}
}



export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);

	const router = useRouter();
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>()



	const openSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if(m._id.secondCategory === secondCategory){
				setAnnounce(m.isOpened ? 'closed' : 'opened')
				m.isOpened = !m.isOpened;
			}
			return m
		}))	
	};

	const openSecondLevelKey = (key:KeyboardEvent, secondCategory: string ) => {
		if(['Space', 'Enter'].includes(key.code)){
			key.preventDefault();
			openSecondLevel(secondCategory)
		}
	};

	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map((m) => (
					<li key={m.route} aria-expanded={m.id === firstCategory}>
						<Link href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id === firstCategory,
								})}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Link>

						{m.id === firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock} >
				{menu.map((m) => {
					if(m.pages.map(p => p.alias).includes(router.asPath.split('/')[2]) ){
						m.isOpened = true;
					}

					return (
						<li key={m._id.secondCategory} >
							<button 
								className={styles.secondLevel} 
								onClick={()=> openSecondLevel(m._id.secondCategory)}
								onKeyDown={(key:KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
								aria-expanded={m.isOpened}
							>
								{m._id.secondCategory}
							</button>
							<motion.ul
								layout
								layoutRoot
								variants={variants}
								className={styles.secondLevelBlock}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
							>
								{buildThirdLevel(m.pages, menuItem.route, !!m.isOpened)}
							</motion.ul>
						</li>
					)
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened:boolean) => {

		const getVariants = (category: string) => {
			return {
				visible: {
					opacity: 1,
					height: category.length > 22 ? 40 : 29,
				},
				hidden: {
					opacity: 0,
					height: 0
				}
			}
		};

		return pages.map((p) => (
			<motion.li 
				variants={getVariants(p.category)} 
				key={`/${route}/${p.alias}`}
			>
				<Link
					href={`/${route}/${p.alias}`}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
					})}
					tabIndex={isOpened ? 0 : -1}
					aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false}
				>
					
					{p.category}
				</Link> 
			</motion.li>
			
		));
	};

	return <nav className={styles.menu} role='navigation'>
			{announce && 
				<span className='visualyHidden' role='log'>
					{announce === 'opened' ? 'Развернуто' : 'Свернуто'}
				</span>}
			{buildFirstLevel()}
		</nav>;
};
