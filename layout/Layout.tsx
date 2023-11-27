import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import { SideBar } from './SideBar/SideBar';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { FunctionComponent, KeyboardEvent, useRef, useState } from 'react';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';
import classNames from 'classnames';


const Layout = ({ children }: LayoutProps): JSX.Element => {

	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key:KeyboardEvent) => {
		if(['Space', 'Enter'].includes(key.code)){
			key.preventDefault();
			bodyRef.current?.focus()
		}
		setIsSkipLinkDisplayed(false)
	};

	return (
		<div className={styles.container} >
			<a 
				tabIndex={1} 
				onFocus={() => setIsSkipLinkDisplayed(true)}
				onKeyDown={skipContentAction}
				className={classNames(styles.skipLink,{
					[styles.displayed]:isSkipLinkDisplayed
				})}
			> Сразу к содержанию</a>
			<Header className={styles.header}/>
			<SideBar className={styles.sidebar}/>
			<main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
				{children}
			</main>
			<Footer className={styles.footer}/>
			<Up/>
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {

	return function withLayoutComponent(props: T):JSX.Element{
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Layout>
					<Component  {...props}/>
				</Layout>
			</AppContextProvider>
			
		)
	}
}