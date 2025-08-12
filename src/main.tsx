import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Error } from './pages/Error/Error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFFIX } from './helpers/API.ts';

const Menu = lazy(() => import('./pages/Menu/Menu'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const LoaderComponent = <div>Загрузка...</div>;
const ErrorComponent = <div>Ошибка</div>;

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Suspense fallback={LoaderComponent}><Menu /></Suspense>
			},
			{
				path: '/cart',
				element: <Suspense fallback={LoaderComponent}><Cart /></Suspense>
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: ErrorComponent,
				loader: async ({ params }) => {
					const { data } = await axios.get(`${PREFFIX}/products/${params.id}`);
					return data;
				}
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
