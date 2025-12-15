import type { Camera } from '../types';

interface CameraCardProps {
  camera: Camera;
  onClick?: (camera: Camera) => void;
}

export function CameraCard({ camera, onClick }: CameraCardProps) {
  const handleClick = () => {
    onClick?.(camera);
  };

  return (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      {camera.image_url ? (
        <img
          src={camera.image_url}
          alt={camera.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No image</span>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {camera.name}
        </h3>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Manufacturer:</span> {camera.manufacturer}
        </p>

        {camera.year_introduced && (
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Year:</span> {camera.year_introduced}
            {camera.year_discontinued && ` - ${camera.year_discontinued}`}
          </p>
        )}

        {camera.format && (
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Format:</span> {camera.format}
          </p>
        )}

        {camera.description && (
          <p className="text-sm text-gray-700 mt-3 line-clamp-2">
            {camera.description}
          </p>
        )}
      </div>
    </article>
  );
}