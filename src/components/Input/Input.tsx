import styles from './Input.module.css';
import type { InputProps } from './Input.props';
import cn from 'classnames';

function Input({ className, isValid = true, ...props }: InputProps) {
	return (
		<input
			className={cn(styles['input'], className, { [styles['invalid']]: !isValid })}
			{...props}
		/>
	);
}

export default Input;