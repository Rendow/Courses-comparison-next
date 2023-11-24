import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import classNames from 'classnames';
import Logo from '../logo.svg'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { motion } from 'framer-motion';
import { SideBar } from '../SideBar/SideBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const variants = {
	opened: {
		opacity: 1,
		x:0,
		transition: {
			stiffness: 20
		}
	},
	closed: {
		opacity: 0,
		x:'100%',
	},
}

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const router = useRouter()

	useEffect(() => {
		setIsOpen(false)
	}, [router])
	

	return (
		<header {...props} className={classNames(className, styles.header)}>
			<Logo/>
			<ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpen(true)}/>
			<motion.div 
			className={styles.mobileMenu}
			variants={variants}
			initial='closed'
			animate={isOpen ? 'opened' : 'closed'}
			>

				<SideBar className={styles.sideBar}/>
				<ButtonIcon appearance='white' icon='close' className={styles.menuClose} onClick={() => setIsOpen(false)}/>

			</motion.div>
		</header>
	); 
};
