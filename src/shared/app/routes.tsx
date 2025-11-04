import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Layout } from './layout'
import { NotFound } from '../pages/not-found'
import { About } from '../pages/about'
import { Archiver } from '../pages/archiver'

const Home = lazy(() => import('../pages/home'))
const ViewFile = lazy(() => import('../pages/view-file'))

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: <Home />,
				children: [
					{
						index: true,
						element: <Navigate to='about' replace />,
					},
					{ path: `/about`, element: <About /> },
					{ path: `/archiver`, element: <Archiver /> },
				],
			},
			{ path: '/view/:id', element: <ViewFile /> },
		],
	},
])

export default routes
