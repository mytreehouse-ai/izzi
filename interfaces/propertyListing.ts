export interface PropertyImage {
  id: number;
  url: string;
}

export interface Feature {
  name: string;
  icon_label: string;
  icon_provider: string;
}

export interface PropertyListing {
  id: number;
  listing_title: string;
  listing_url: string;
  price: number;
  price_formatted: string;
  listing_type: string;
  property_status: string;
  property_type: string;
  sub_category: string;
  building_name: string | null;
  subdivision_name: string | null;
  floor_area: number | null;
  lot_area: number | null;
  building_size: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking_space: number | null;
  city: string;
  area: string;
  address: string;
  features: string[];
  features_with_icon: Feature[];
  equipments: string[];
  equipments_with_icon: Feature[];
  main_image_url: string;
  property_images: PropertyImage[] | null;
  coordinates: [number, number];
  latitude_in_text: string | null;
  longitude_in_text: string | null;
  is_peza_compliant: boolean;
  description: string;
  created_at: string;
}
