import { SideBarProps } from './SideBar.props';
import styles from './Layout.module.css';
import cn from 'classnames';


export const SideBar = ({ ...props }: SideBarProps): JSX.Element => {

	return (
		<div  {...props}>
			SideBar
		</div>
	);
};
