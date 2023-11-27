import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { KeyboardEvent, useState } from 'react';
import SearchIcon from './searchIcon.svg';
import { useRouter } from 'next/router';


export const Search = ({ className, ...props }: SearchProps): JSX.Element => {

	const [search, setSearch] = useState('');
	const router = useRouter();

	const handleKeyDown = (e:KeyboardEvent) => {
		if(e.key === 'Enter'){
			goToSearch();
		}
	};

	const goToSearch = () => {
		router.push({
			pathname: '/searh',
			query: {
				q: search
			}
		});
	};

	return (
		<form className={cn(className, styles.search)} {...props} role='search'>
			<Input
				placeholder='Поиск'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className={styles.input}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance='primary'
				className={styles.button}
				onClick={goToSearch}  
				aria-label='Искать по сайту'
			>
				<SearchIcon/>
			</Button>
		</form>
	);
};
