import { create } from "zustand";
import { createSlice, withSlices } from "zustand-slices";

const bedroomFilterSlice = createSlice({
  name: "bedroomFilter",
  value: {
    bedrooms: [
      { id: 1, text: "1", checked: false },
      { id: 2, text: "2", checked: false },
      { id: 3, text: "3", checked: false },
      { id: 4, text: "4 or more bedrooms", checked: false },
    ],
  },
  actions: {
    toggleBedroomCheck: (id: number) => (state) => ({
      ...state,
      bedrooms: state.bedrooms
        .map((bedroom) =>
          bedroom.id === id
            ? { ...bedroom, checked: !bedroom.checked }
            : bedroom
        )
        .map((bedroom) =>
          bedroom.id !== id ? { ...bedroom, checked: false } : bedroom
        ),
    }),
    resetBedroomFilter: () => (state) => ({
      ...state,
      bedrooms: [
        { id: 1, text: "1", checked: false },
        { id: 2, text: "2", checked: false },
        { id: 3, text: "3", checked: false },
        { id: 4, text: "4 or more bedrooms", checked: false },
      ],
    }),
  },
});

const bathroomFilterSlice = createSlice({
  name: "bathroomFilter",
  value: {
    bathrooms: [
      { id: 1, text: "1", checked: false },
      { id: 2, text: "2", checked: false },
      { id: 3, text: "3 or more bathrooms", checked: false },
    ],
  },
  actions: {
    toggleBathroomCheck: (id: number) => (state) => ({
      ...state,
      bathrooms: state.bathrooms
        .map((bathroom) =>
          bathroom.id === id
            ? { ...bathroom, checked: !bathroom.checked }
            : bathroom
        )
        .map((bathroom) =>
          bathroom.id !== id ? { ...bathroom, checked: false } : bathroom
        ),
    }),
    resetBathroomFilter: () => (state) => ({
      ...state,
      bathrooms: [
        { id: 1, text: "1", checked: false },
        { id: 2, text: "2", checked: false },
        { id: 3, text: "3 or more bathrooms", checked: false },
      ],
    }),
  },
});

interface CreateaPropertyListing {
  bedrooms: number;
  bathrooms: number;
  areaSize: number;
  description: string;
}

const propertyListingCreateSlice = createSlice({
  name: "propertyListingCreate",
  value: {
    listingType: [
      { id: 1, text: "Sale", value: "for-sale", checked: false },
      { id: 2, text: "Rent", value: "for-rent", checked: false },
    ],
    steps: [
      { id: 1, title: "Property Information", progress: 0.2 },
      { id: 2, title: "Contact Information", progress: 0.4 },
      { id: 3, title: "Property Features", progress: 0.6 },
      { id: 4, title: "Property Photos", progress: 0.8 },
      { id: 5, title: "Listing Preview", progress: 1.0 },
    ],
    currentStepIndex: 0,
    propertyDetails: {
      bedrooms: 0,
      bathrooms: 1,
      areaSize: 20,
      description: "",
    },
  },
  actions: {
    toggleListingTypeCheck: (id: number) => (state) => ({
      ...state,
      listingType: state.listingType
        .map((listingType) =>
          listingType.id === id
            ? { ...listingType, checked: !listingType.checked }
            : listingType
        )
        .map((listingType) =>
          listingType.id !== id
            ? { ...listingType, checked: false }
            : listingType
        ),
    }),
    propertyListingCreateNextStep: () => (state) => ({
      ...state,
      currentStepIndex:
        state.currentStepIndex < state.steps.length - 1
          ? state.currentStepIndex + 1
          : state.currentStepIndex,
    }),
    propertyListingCreatePrevStep: () => (state) => ({
      ...state,
      currentStepIndex:
        state.currentStepIndex > 0
          ? state.currentStepIndex - 1
          : state.currentStepIndex,
    }),
    newPropertyListingUpdatePropertyDetails:
      (details: Partial<CreateaPropertyListing>) => (state) => ({
        ...state,
        propertyDetails: {
          ...state.propertyDetails,
          ...(details as typeof state.propertyDetails),
        },
      }),
  },
});

interface ValuationPropertyDetails {
  propertyType: string;
  propertySize: number | null;
  userId: string;
  address: string;
  city: string;
}

const propertyValuationSlice = createSlice({
  name: "propertyValuation",
  value: {
    steps: [
      { id: 1, title: "Property Information", progress: 0.34 },
      { id: 2, title: "Property Features", progress: 0.67 },
      { id: 3, title: "Valuation Result", progress: 1.0 },
    ],
    currentStepIndex: 0,
    propertyDetails: {
      propertyType: "House",
      propertySize: 0,
      userId: "",
      address: "",
      city: "",
    },
  },
  actions: {
    propertyValuationNextStep: () => (state) => ({
      ...state,
      currentStepIndex:
        state.currentStepIndex < state.steps.length - 1
          ? state.currentStepIndex + 1
          : state.currentStepIndex,
    }),
    propertyValuationPrevStep: () => (state) => ({
      ...state,
      currentStepIndex:
        state.currentStepIndex > 0
          ? state.currentStepIndex - 1
          : state.currentStepIndex,
    }),
    updatePropertyDetails:
      (details: Partial<ValuationPropertyDetails>) => (state) => ({
        ...state,
        propertyDetails: {
          ...state.propertyDetails,
          ...(details as typeof state.propertyDetails),
        },
      }),
  },
});

export const useStore = create(
  withSlices(
    bedroomFilterSlice,
    bathroomFilterSlice,
    propertyListingCreateSlice,
    propertyValuationSlice
  )
);
