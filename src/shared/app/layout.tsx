import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Header } from '../components/header'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorScreen } from '../components/error-screen'
import { SidebarProvider, SidebarInset } from '../components/ui/sidebar'
import { AppSidebar } from '../components/app-sidebar'

export function Layout() {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorScreen}
			onError={(error) => {
				console.error('Ошибка в компоненте:', error)
			}}
		>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<Header />
					<div className='flex-1'>
						<Outlet />
					</div>
				</SidebarInset>
			</SidebarProvider>
			<Toaster
				position='top-right'
				richColors
				closeButton
				toastOptions={{ className: 'rounded-lg p-4 shadow-md' }}
			/>
		</ErrorBoundary>
	)
}
