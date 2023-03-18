import { SideBarProps } from './SideBar.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';


export const SideBar = ({ ...props }: SideBarProps): JSX.Element => {

	return (
		<div  {...props}>
			<Menu/>
		</div>
	);
};
