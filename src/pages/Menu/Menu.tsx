import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFFIX } from '../../helpers/API';
import type { IProduct } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

function Menu() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
    
	const getMenu = async () => {
		try {
			setIsLoading(true);
			setError('');
			const { data } = await axios.get<IProduct[]>(`${PREFFIX}/products`);
			setProducts(data);
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return <>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав'/>
		</div>
		<div>
			{isLoading && <div>Загрузка</div>}
			{!isLoading && error && <div>Ошибка:{error}</div>}
			{!isLoading && !error && <MenuList products={products}/>}
		</div>
	</>;
}

export default Menu;