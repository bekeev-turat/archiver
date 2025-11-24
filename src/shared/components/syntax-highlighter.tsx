import React from 'react'
import { getFileExtension } from '../hooks/file-types'

interface SyntaxHighlighterProps {
	content: string
	fileName: string
}

// Простая функция для определения языка по расширению файла
const getLanguage = (fileName: string): string => {
	const ext = getFileExtension(fileName).toLowerCase()
	const languageMap: Record<string, string> = {
		'.js': 'javascript',
		'.jsx': 'javascript',
		'.ts': 'typescript',
		'.tsx': 'typescript',
		'.json': 'json',
		'.html': 'html',
		'.css': 'css',
		'.scss': 'scss',
		'.md': 'markdown',
		'.py': 'python',
		'.java': 'java',
		'.c': 'c',
		'.cpp': 'cpp',
		'.xml': 'xml',
		'.txt': 'text',
	}
	return languageMap[ext] || 'text'
}

// Простая функция подсветки синтаксиса (базовая реализация)
const highlightCode = (code: string, language: string): string => {
	// Экранируем HTML
	const escaped = code
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')

	// Простая подсветка для JavaScript/TypeScript
	if (language === 'javascript' || language === 'typescript') {
		return escaped
			.replace(
				/(\b(const|let|var|function|if|else|for|while|return|import|export|from|default|class|extends|interface|type|enum|async|await|try|catch|finally|throw|new|this|super)\b)/g,
				'<span class="keyword">$1</span>',
			)
			.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
			.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
			.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '<span class="string">$&</span>')
			.replace(/(\b\d+\.?\d*\b)/g, '<span class="number">$1</span>')
	}

	// Подсветка для JSON
	if (language === 'json') {
		return escaped
			.replace(/(["'][^"']*["'])\s*:/g, '<span class="key">$1</span>:')
			.replace(/:(\s*)(["'][^"']*["'])/g, ':$1<span class="string">$2</span>')
			.replace(/:(\s*)(\d+\.?\d*)/g, ':$1<span class="number">$2</span>')
			.replace(/(true|false|null)/g, '<span class="keyword">$1</span>')
	}

	// Подсветка для HTML
	if (language === 'html') {
		return escaped
			.replace(/(&lt;\/?[\w\s="'-]+&gt;)/g, '<span class="tag">$1</span>')
			.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="comment">$1</span>')
	}

	// Подсветка для CSS
	if (language === 'css' || language === 'scss') {
		return escaped
			.replace(/([^{}]+)\s*\{/g, '<span class="selector">$1</span>{')
			.replace(/([^:]+):/g, '<span class="property">$1</span>:')
			.replace(/:([^;]+);/g, ':<span class="value">$1</span>;')
			.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
	}

	return escaped
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
	content,
	fileName,
}) => {
	const language = getLanguage(fileName)
	const highlighted = highlightCode(content, language)

	return (
		<div className='syntax-highlighter w-full overflow-auto rounded-lg border border-border bg-muted'>
			<pre className='m-0 overflow-x-auto p-4 font-mono text-sm leading-relaxed bg-muted text-foreground'>
				<code
					className={`block w-full whitespace-pre break-normal overflow-wrap-normal language-${language}`}
					dangerouslySetInnerHTML={{ __html: highlighted }}
				/>
			</pre>
		</div>
	)
}
