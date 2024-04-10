interface PropertyListingBaseFilter {
  before: string;
  after: string;
}

export interface PropertyListingFilters extends PropertyListingBaseFilter {
  search: string;
  property_type: string | null;
  listing_type: string | null;
  min_price: number;
  max_price: number;
  min_bedrooms: number;
  max_bedrooms: number;
  min_bathrooms: number;
  max_bathrooms: number;
  min_car_spaces: number;
  max_car_spaces: number;
  min_floor_size: number;
  max_floor_size: number;
  min_lot_size: number;
  max_lot_size: number;
  min_building_size: number;
  max_building_size: number;
}
