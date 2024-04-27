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
  propertyType: string;
  listingType: string;
  city: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  areaSize: number;
  images: string[];
  description: string;
}

const commonResidentialPropertyFeatures = [
  {
    id: 1,
    text: "Fitted Wardrobes",
    value: "fitted-wardrobes",
    checked: false,
  },
  {
    id: 2,
    text: "Air Conditioning",
    value: "air-conditioning",
    checked: false,
  },
  {
    id: 3,
    text: "Parking Space",
    value: "parking-space",
    checked: false,
  },
  {
    id: 4,
    text: "Storage Space",
    value: "storage-space",
    checked: false,
  },
  {
    id: 5,
    text: "Terrace",
    value: "terrace",
    checked: false,
  },
  {
    id: 6,
    text: "Balcony",
    value: "balcony",
    checked: false,
  },
  {
    id: 7,
    text: "Garden",
    value: "garden",
    checked: false,
  },
  {
    id: 8,
    text: "Pool",
    value: "pool",
    checked: false,
  },
];

const propertyListingCreateSlice = createSlice({
  name: "propertyListingCreate",
  value: {
    propertyFeatures: {
      condominium: [...commonResidentialPropertyFeatures],
      warehouse: [
        {
          id: 1,
          text: "Banker",
          value: "banker",
          checked: false,
        },
      ],
      house: [...commonResidentialPropertyFeatures],
      land: [
        {
          id: 1,
          text: "Central business district",
          value: "central-business-district",
          checked: false,
        },
      ],
    },
    steps: [
      { id: 1, title: "Address Information", progress: 0.2 },
      { id: 2, title: "Property Information", progress: 0.4 },
      { id: 3, title: "Property Photos", progress: 0.6 },
      { id: 4, title: "Contact Information", progress: 0.8 },
      { id: 5, title: "Listing Preview", progress: 1.0 },
    ],
    currentStepIndex: 0,
    propertyDetails: {
      propertyType: "",
      listingType: "",
      city: "",
      address: "",
      bedrooms: 0,
      bathrooms: 1,
      areaSize: 20,
      images: [],
      description: "",
    },
  },
  actions: {
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
  property_type: string;
  sqm: number | null;
  user_id: string;
  address: string;
  city: string;
  google_places_data_id: string;
  google_places_details_id: string;
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
      property_type: "House",
      sqm: 0,
      user_id: "",
      address: "",
      city: "",
      google_places_data_id: "",
      google_places_details_id: "",
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
    resetPropertyValuation: () => (state) => ({
      ...state,
      currentStepIndex: 0,
      propertyDetails: {
        property_type: "House",
        sqm: 0,
        user_id: "",
        address: "",
        city: "",
        google_places_data_id: "",
        google_places_details_id: "",
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
