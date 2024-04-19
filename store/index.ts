import { PropertyListingFilters } from "@/interfaces/propertyListingFilters";
import { LocationObject } from "expo-location";
import { create } from "zustand";

interface PartialPropertyListingFilters
  extends Partial<PropertyListingFilters> {}

const propertyListingFilterInitialState = {
  property_type: "house",
  listing_type: "for-sale",
  min_price: 10000,
  max_price: 5000000001,
  min_sqm: 10,
  max_sqm: 10001,
};

interface StoreState {
  propertyListingFilters: PartialPropertyListingFilters;
  userLocation: LocationObject | null;
  locationErrorMessage: string | null;
}

interface StoreActions {
  updateFilters: (filters: PartialPropertyListingFilters) => void;
  setUserLocation: (location: LocationObject | null) => void;
  setLocationErrorMessage: (message: string | null) => void;
  resetPropertyListingFilters: () => void;
}

export const usePropertyListingFilter = create<StoreState & StoreActions>(
  (set) => ({
    propertyListingFilters: propertyListingFilterInitialState,
    userLocation: null,
    locationErrorMessage: null,
    updateFilters: (filters) =>
      set((state) => ({
        propertyListingFilters: { ...state.propertyListingFilters, ...filters },
      })),
    setUserLocation: (location) => set({ userLocation: location }),
    setLocationErrorMessage: (message) =>
      set({ locationErrorMessage: message }),
    resetPropertyListingFilters: () =>
      set({ propertyListingFilters: propertyListingFilterInitialState }),
  })
);
