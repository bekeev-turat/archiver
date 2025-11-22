import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
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
			<Toaster
				position='top-right'
				richColors
				closeButton
				toastOptions={{ className: 'rounded-lg p-4 shadow-md' }}
			/>
		</ErrorBoundary>
	)
}
