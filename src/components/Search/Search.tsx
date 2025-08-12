import styles from './Search.module.css';
import type { SearchProps } from './Search.props';
import cn from 'classnames';

function Search({ className, ...props }: SearchProps) {
	return (
		<div className={styles['input-wrapper']}>
			<input
				className={cn(styles['input'], className)}
				{...props}
			/>
			<img className={styles['icon']} src="/search-icon.svg" alt="Иконка поика" />
		</div>
	);
}

export default Search;