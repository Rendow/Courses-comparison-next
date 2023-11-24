import { SideBarProps } from './SideBar.props';
import styles from './SideBar.module.css';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';
import { Search } from '../../components';


export const SideBar = ({ className,...props }: SideBarProps): JSX.Element => {

	return (
		<div  {...props} className={cn( styles.sidebar, className)}>
			<Logo className={styles.logo}/>
			<Search />
			<Menu/>
		</div>
	);
};
