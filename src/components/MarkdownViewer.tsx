import { FC, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MarkdownViewerProps {
  url: string;
  className?: string;
}

export const MarkdownViewer: FC<MarkdownViewerProps> = ({ url, className = '' }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to load: ${response.statusText}`);
        }
        
        const text = await response.text();
        setContent(parseMarkdown(text));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [url]);

  // Простой markdown парсер
  const parseMarkdown = (md: string): string => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-white mb-3 mt-6">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mb-4 mt-8">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mb-6 mt-4">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-white">$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');

    // Code blocks
    html = html.replace(/```(.*?)```/gs, '<pre class="bg-black/40 border border-white/5 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm text-cyan-400">$1</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-black/40 border border-white/5 px-2 py-1 rounded text-cyan-400 text-sm">$1</code>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-6 mb-2 text-gray-300 list-disc">$1</li>');
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 mb-2 text-gray-300 list-disc">$1</li>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="text-gray-300 mb-4">');
    html = `<p class="text-gray-300 mb-4">${html}</p>`;

    // Line breaks
    html = html.replace(/\n/g, '<br />');

    return html;
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-500/10 border border-red-500/20 rounded-lg p-6 ${className}`}>
        <p className="text-red-400">Ошибка загрузки: {error}</p>
      </div>
    );
  }

  return (
    <div
      className={`markdown-content prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
