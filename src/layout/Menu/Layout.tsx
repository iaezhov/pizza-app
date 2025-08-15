import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {
	const navigate = useNavigate();
	const profile = useSelector((s: RootState) => s.user.profile);
	const cartItems = useSelector((s: RootState) => s.cart.items);
	const dispatch = useDispatch<AppDispath>();

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
			iconAlt: 'Иконка корзины',
			count: cartItems.reduce((acc, item) => acc += item.count, 0)
		}
	];

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img className={styles['avatar']} src="/avatar.png" alt="Аватар пользователя" />
				<div className={styles['name']}>{profile?.name}</div>
				<div className={styles['email']}>{profile?.email}</div>
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
						{link.count && <div>{ link.count }</div> }
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