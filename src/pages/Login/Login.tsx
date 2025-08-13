import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { useState, type FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFFIX } from '../../helpers/API';
import type { LoginResponse } from '../../interfaces/auth.interface';

type LoginForm = {
	email: {
		value: string;
	},
	password: {
		value: string;
	}
}

function Login() {
	const [error, setError] = useState<string | undefined | null>();
	const navigate = useNavigate();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		const { email, password } = e.target as typeof e.target & LoginForm;
		await sendLogin({
			email: email.value,
			password: password.value
		});
	};

	const sendLogin = async ({ email, password } : { email: string, password: string }) => {
		try {
			setError(null);
			const { data } = await axios.post<LoginResponse>(`${PREFFIX}/auth/login`, {
				email,
				password
			});
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data?.message);
			}
		}
		
	};

	return (
		<div className={styles['page']}>
			<Headling>Вход</Headling>
			{error && <div className={styles['error']}>{error}</div>}
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