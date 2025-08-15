import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.css';
import { useEffect, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';

type RegisterForm = {
	email: {
		value: string;
	},
	password: {
		value: string;
	},
	name: {
		value: string;
	}
}

function Register() {
	const navigate = useNavigate();
	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch<AppDispath>();

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const { email, password, name } = e.target as typeof e.target & RegisterForm;
		await dispatch(register({
			email: email.value,
			password: password.value,
			name: name.value
		}));
	};

	return (
		<div className={styles['page']}>
			<Headling>Регистрация</Headling>
			{registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='email'>Ваш email</label>
					<Input id='email' name='login' placeholder='Email' />
				</div>
				<div className={styles['field']}>
					<label htmlFor='password'>Ваш пароль</label>
					<Input id='password' name='password' placeholder='Пароль' type='password' />
				</div>
				<div className={styles['field']}>
					<label htmlFor='password'>Ваше имя</label>
					<Input id='name' name='name' placeholder='Имя' />
				</div>
				<Button appearence='big'>Зарегистрироваться</Button>
			</form>
			<div className={styles['links']}>
				<div>Есть акканут?</div>
				<Link to='/auth/login'>Войти</Link>
			</div>
		</div>
	);
}

export default Register;