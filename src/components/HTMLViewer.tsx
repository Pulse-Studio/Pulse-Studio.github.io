import { FC, useState } from 'react';

interface HTMLViewerProps {
  url: string;
  className?: string;
}

export const HTMLViewer: FC<HTMLViewerProps> = ({ url, className = '' }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-gray-400">Загрузка...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
          <p className="text-red-400">Не удалось загрузить контент</p>
        </div>
      )}

      <iframe
        src={url}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full border-0 transition-opacity duration-300 ${
          loading ? 'opacity-0 h-0' : 'opacity-100'
        }`}
        style={{
          minHeight: error ? '0' : '600px',
          height: error ? '0' : 'auto',
        }}
        title="Content Viewer"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};
