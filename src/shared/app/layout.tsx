import { Outlet } from 'react-router-dom'

import { Header } from '../components/header'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorScreen } from '../components/error-screen'

export function Layout() {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorScreen}
			onError={(error) => {
				console.error('Ошибка в компоненте:', error)
			}}
		>
			<Header />

			<div className='max-w-7xl mx-auto bg-white min-h-screen'>
				<Outlet />
			</div>
		</ErrorBoundary>
	)
}
