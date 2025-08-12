import { useLoaderData } from 'react-router-dom';
import type { IProduct } from '../../interfaces/product.interface';

export function Product() {
	const product = useLoaderData<IProduct>();
	return <>Product: {product?.name}</>;
}