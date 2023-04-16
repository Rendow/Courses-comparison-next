import { SideBarProps } from './SideBar.props';
import styles from './SideBar.module.css';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';


export const SideBar = ({ className,...props }: SideBarProps): JSX.Element => {

	return (
		<div  {...props} className={cn(className, styles.sidebar)}>
			<Logo className={styles.logo}/>
			<div>поиск</div>
			<Menu/>
		</div>
	);
};
