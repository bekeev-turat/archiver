import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export function About() {
	return (
		<section className='max-w-3xl mx-auto px-4 py-12 text-center'>
			<h1 className='text-4xl font-bold mb-6'>О проекте Archiver</h1>

			<p className='text-lg mb-8 text-muted-foreground'>
				Archiver — это веб-инструмент, который позволяет безопасно просматривать
				содержимое ZIP-архивов прямо в браузере. Всё, что нужно — просто выбрать
				файл архива на устройстве, и приложение мгновенно покажет, какие файлы
				внутри него находятся.
			</p>

			<Card className='mb-8 text-left'>
				<CardHeader>
					<CardTitle>Как это работает</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3 text-muted-foreground'>
					<p>
						После выбора файла ZIP, Archiver использует встроенные возможности
						браузера для его анализа. Файл <strong>не загружается</strong> на
						сервер и обрабатывается полностью на вашей стороне.
					</p>
					<p>
						Приложение извлекает структуру архива и отображает список файлов:
						имена, размеры, типы и другую метаинформацию. Это удобно для
						проверки содержимого архивов без необходимости распаковывать их.
					</p>
				</CardContent>
			</Card>

			<Card className='mb-8 text-left'>
				<CardHeader>
					<CardTitle>Безопасность</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3 text-muted-foreground'>
					<p>
						Archiver не передаёт ваши данные в сеть. Обработка ZIP-файлов
						выполняется локально, с использованием JavaScript API (например,
						JSZip), поэтому содержимое архивов остаётся конфиденциальным.
					</p>
					<p>
						Это делает Archiver безопасным инструментом для работы даже с
						чувствительными файлами.
					</p>
				</CardContent>
			</Card>

			<Card className='text-left'>
				<CardHeader>
					<CardTitle>Зачем это нужно</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3 text-muted-foreground'>
					<p>
						Иногда нужно быстро узнать, что внутри ZIP-архива, не распаковывая
						его. Archiver помогает сделать это за несколько секунд прямо в
						браузере — без установки программ.
					</p>
					<p>
						Просто загрузите файл, и вы увидите список всех его компонентов.
						Удобно, просто и безопасно.
					</p>
				</CardContent>
			</Card>
		</section>
	)
}
