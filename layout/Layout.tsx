import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import { SideBar } from './SideBar/SideBar';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { FunctionComponent } from 'react';


const Layout = ({ children }: LayoutProps): JSX.Element => {

	return (
		<div className={styles.container}>
			<Header className={styles.header}/>
			<SideBar className={styles.sidebar}/>
			<div className={styles.body}>
				{children}
			</div>
			<Footer className={styles.footer}/>
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {

	return function withLayoutComponent(props: T):JSX.Element{
		return (
			<Layout>
				<Component  {...props}/>
			</Layout>
		)
	}
}