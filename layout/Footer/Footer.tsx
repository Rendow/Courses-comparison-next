import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';
import {format} from 'date-fns';


export const Footer = ({ children,className, ...props }: FooterProps): JSX.Element => {

	return (
		<footer   className={cn(styles.footer, className)}>
			<div>
				OwlTop © 2019-{format(new Date(), 'yyyy')} Все права защищены
			</div>
			<a href='#'>
				Пользовательское соглашение
			</a>
			<a  href='#'>
				Политика конфиденциальности
			</a>
		</footer>
	);
};
