import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { useEffect, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

type LoginForm = {
	email: {
		value: string;
	},
	password: {
		value: string;
	}
}

function Login() {
	const navigate = useNavigate();
	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch<AppDispath>();

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const { email, password } = e.target as typeof e.target & LoginForm;
		await dispatch(login({
			email: email.value,
			password: password.value
		}));
	};

	return (
		<div className={styles['page']}>
			<Headling>Вход</Headling>
			{loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='email'>Ваш email</label>
					<Input id='email' name='login' placeholder='Email' />
				</div>
				<div className={styles['field']}>
					<label htmlFor='password'>Ваш пароль</label>
					<Input id='password' name='password' placeholder='Пароль' type='password' />
				</div>
				<Button appearence='big'>Вход</Button>
			</form>
			<div className={styles['links']}>
				<div>Нет аккаунта?</div>
				<Link to='/auth/register'>Зарегистрироваться</Link>
			</div>
		</div>
	);
}

export default Login;