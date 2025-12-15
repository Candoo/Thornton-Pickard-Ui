export interface Camera {
  id: number;
  name: string;
  manufacturer: string;
  year_introduced?: number;
  year_discontinued?: number;
  format?: string;
  plate_sizes?: string;
  lens?: string;
  shutter?: string;
  features?: string;
  description?: string;
  rarity?: string;
  estimated_value_min?: number;
  estimated_value_max?: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CameraFilters {
  search?: string;
  manufacturer?: string;
  year_from?: number;
  year_to?: number;
  format?: string;
  sort?: 'name' | 'year_introduced' | 'manufacturer';
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    page_size: number;
    total_pages: number;
    total_items: number;
  };
}
