import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import cn from 'classnames';
import CheckIcon from './check.svg';


export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {

	return (
		<>
		{advantages.map(el => {
			return <div key={el._id} className={styles.advantages}>
					<CheckIcon/>
					<div className={styles.title}>{el.title}</div>
					<hr className={styles.vline}/>
					<div>{el.description}</div>
			</div>;
		})}
		
		</>
	);
};
