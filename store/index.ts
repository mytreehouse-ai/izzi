import { PropertyListingFilters } from "@/interfaces/propertyListingFilters";
import { LocationObject } from "expo-location";
import { create } from "zustand";

type PartialPropertyListingFilters = Partial<PropertyListingFilters>;

const propertyListingFilterInitialState: PartialPropertyListingFilters = {
  property_type: "house",
};

type StoreData = {
  propertyListingFilters: PartialPropertyListingFilters;
  userLocation: LocationObject | null;
  locationErrorMessage: string | null;
};

type StoreActions = {
  updateFilters: (filters: PartialPropertyListingFilters) => void;
  setUserLocation: (userLocation: LocationObject) => void;
  setLocationErrorMessage: (locationErrorMessage: string) => void;
};

const zustandStore = create<StoreData & StoreActions>((set) => ({
  propertyListingFilters: propertyListingFilterInitialState,
  userLocation: null,
  locationErrorMessage: null,
  updateFilters: (filters: PartialPropertyListingFilters) =>
    set((state) => ({
      propertyListingFilters: { ...state.propertyListingFilters, ...filters },
    })),
  setUserLocation: (userLocation: LocationObject) => set({ userLocation }),
  setLocationErrorMessage: (locationErrorMessage: string) =>
    set({ locationErrorMessage }),
}));

export default zustandStore;
