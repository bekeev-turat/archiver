import { toast } from 'sonner'

let currentToastId: string | number | null = null

export const toastService = {
	loading(message: string) {
		if (!currentToastId) {
			currentToastId = toast.loading(message)
		}
	},

	success(message: string) {
		if (currentToastId) {
			toast.success(message, { id: currentToastId })
			currentToastId = null
		} else {
			toast.success(message)
		}
	},

	error(message: string) {
		if (currentToastId) {
			toast.error(message, { id: currentToastId })
			currentToastId = null
		} else {
			toast.error(message)
		}
	},

	reset() {
		currentToastId = null
	},
}
