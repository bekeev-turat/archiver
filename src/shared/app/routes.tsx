import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { Layout } from './layout'
import { NotFound } from '../pages/not-found'

const Home = lazy(() => import('../pages/home'))

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
])

export default routes
