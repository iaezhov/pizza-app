import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import type { ProductCardProps } from './ProductCard.props';
import { useDispatch } from 'react-redux';
import type { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import type { MouseEvent } from 'react';

function ProductCard({ title, description, price, id, rating, image }: ProductCardProps) {
	const dispatch = useDispatch<AppDispath>();

	const addToCart = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(id));
	};

	return (
		<Link to={`/product/${id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div className={styles['head']} style={{ backgroundImage: `url(${image})`}}>
					<div className={styles['price']}>
						{price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-card']}>
						<img src="/cart-button-icon.svg" alt="Добавить в корзину" onClick={addToCart}/>
					</button>
					<div className={styles['rating']}>
						{rating}&nbsp;
						<img src="/star-icon.svg" alt="Иконка звезды" />
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{title}</div>
					<div className={styles['description']}>{description}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;