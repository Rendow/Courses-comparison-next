import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { Card, HhData, Htag, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interfaces';

export const TopPageComponent = ({ products, firstCategory, page }: TopPageComponentProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag="h1">{page.title}</Htag>
				{products && (
					<Tag color="grey" size="m">
						{products.length}
					</Tag>
				)}
				<span>сортировка</span>
			</div>
			<div>{products && products.map((p) => <div key={p._id}> {p.title}</div>)}</div>

			<div className={styles.hhTitle}>
				<Htag tag="h2">Вакансии - {page.category}</Htag>
				<Tag color="red" size="m">
					hh.ru
				</Tag>
			</div>
			
			{firstCategory === TopLevelCategory.Courses && <HhData {...page.hh}/>}
		</div>
	);
};
