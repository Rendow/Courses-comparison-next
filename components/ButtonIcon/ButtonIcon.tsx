import { ButtonIconProps, icons } from './ButtonIcon.props';
import styles from './ButtonIcon.module.css';
import cn from 'classnames';

export const ButtonIcon = ({ 
	className, appearance ,icon,  ...props 
}: ButtonIconProps): JSX.Element => {

	const IconComponent = icons[icon];

	return (
		<button
			className={cn(styles.button, className,{
				[styles.primary] : appearance === 'primary',
				[styles.white] : appearance === 'white',
			})}
			{...props}
		>
			<IconComponent/>
		</button>
	);
};
