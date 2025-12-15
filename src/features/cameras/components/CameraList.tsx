import { useCameras } from '../hooks/useCameras';
import { CameraCard } from './CameraCard';
// import { getErrorMessage } from '@/utils/error';
import type { Camera, CameraFilters } from '../types';

interface CameraListProps {
  filters?: CameraFilters;
  page?: number;
  pageSize?: number;
  onCameraClick?: (camera: Camera) => void;
}

export function CameraList({
  filters,
  page = 1,
  pageSize = 12,
  onCameraClick,
}: CameraListProps) {
  const { data, isLoading, isError, error } = useCameras(filters, page, pageSize);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading cameras...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error loading cameras</p>
          <p className="text-sm mt-2">{getErrorMessage(error)}</p>
        </div>
      </div>
    );
  }

  // Bulletproof: Extract cameras array from whatever structure we get
  let cameras: Camera[] = [];
  let paginationInfo: any = null;

  if (data) {
    // Handle: { data: { data: [...], page: 1, ... }, status: 200, ... } (double wrapped)
    if ('data' in data && typeof data.data === 'object' && 'data' in data.data) {
      cameras = Array.isArray(data.data.data) ? data.data.data : [];
      paginationInfo = data.data;
    }
    // Handle: { data: [...], page: 1, page_size: 12, total: 2 } (single wrapped)
    else if ('data' in data && Array.isArray(data.data)) {
      cameras = data.data;
      paginationInfo = data;
    }
    // Handle: [...] (direct array)
    else if (Array.isArray(data)) {
      cameras = data;
    }
    // Log unexpected structure
    else {
      console.error('Unexpected data structure:', data);
      console.error('Data keys:', Object.keys(data));
    }
  }

  if (cameras.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center text-gray-600">
          <p className="text-lg">No cameras found</p>
          <p className="text-sm mt-2">
            {data ? 'Try adjusting your filters' : 'Unable to load cameras'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cameras.map((camera) => (
          <CameraCard
            key={camera.id}
            camera={camera}
            onClick={onCameraClick}
          />
        ))}
      </div>

      {/* Pagination Info */}
      {paginationInfo && (
        <div className="mt-8 text-center text-sm text-gray-600">
          Showing {cameras.length} of {paginationInfo.total || cameras.length} cameras
          {paginationInfo.page && paginationInfo.total_pages && (
            <span> (Page {paginationInfo.page} of {paginationInfo.total_pages})</span>
          )}
        </div>
      )}
    </div>
  );
}