import { useState } from 'react';
import { CameraList } from '@/features/cameras/components/CameraList';

export function CamerasPage() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Camera Collection</h1>
      <CameraList page={page} />
    </div>
  );
}
