import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

const links = [
	{
		text: 'Меню',
		to: '/',
		icon: '/menu-icon.svg',
		iconAlt: 'Иконка меню'
	},
	{
		text: 'Корзина',
		to: '/cart',
		icon: '/cart-icon.svg',
		iconAlt: 'Иконка корзины'
	}
];

export function Layout() {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem('jwt');
		navigate('/auth/login');
	};

	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img className={styles['avatar']} src="/avatar.png" alt="Аватар пользователя" />
				<div className={styles['name']}>Иван Ежов</div>
				<div className={styles['email']}>iezh@gmail.com</div>
			</div>
			<div className={styles['menu']}>
				{links.map(link => (
					<NavLink
						className={({ isActive }) => cn(styles['link'], {
							[styles['active']]: isActive
						})}
						to={link.to}
						key={link.text}
					>
						<img src={link.icon} alt={link.iconAlt} />
						<span>{link.text}</span>
					</NavLink>
				))}
			</div>
			<Button className={styles['exit']} onClick={logout}>
				<img src="/exit-icon.svg" alt="Иконка выхода" />
				Выйти
			</Button>
		</div>
		<div className={styles['content']}>
			<Outlet />
		</div>
	</div>;
}