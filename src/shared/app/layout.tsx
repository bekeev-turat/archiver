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
			<div className='headerWrapper'>
				<Header />
			</div>

			<div className='bg-white min-h-screen w-screen overflow-y-scroll relative'>
				<Outlet />
			</div>
		</ErrorBoundary>
	)
}
