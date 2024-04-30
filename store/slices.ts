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
  listingTitle: string;
  propertyType: string;
  listingType: string;
  floorNo: string;
  unitNo: string;
  price: number;
  city: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  floorArea: number;
  lotArea: number;
  buildingArea: number;
  ceilingHeight: number;
  features: string[];
  images: string[];
  longitude: number;
  latitude: number;
  description: string;
}

const commonResidentialPropertyFeatures = [
  {
    id: 1,
    text: "Fitted wardrobes",
    value: "fitted-wardrobes",
    checked: false,
  },
  {
    id: 2,
    text: "Air conditioning",
    value: "air-conditioning",
    checked: false,
  },
  {
    id: 3,
    text: "Parking space",
    value: "parking-space",
    checked: false,
  },
  {
    id: 4,
    text: "Storage space",
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
      house: [...commonResidentialPropertyFeatures],
      land: [],
      dormitory: [
        {
          id: 1,
          text: "Kitchen",
          value: "kitchen",
          checked: false,
        },
        {
          id: 2,
          text: "Parking space",
          value: "parking-space",
          checked: false,
        },
      ],
      building: [],
      warehouse: [
        {
          id: 1,
          text: "Peza compliant",
          value: "peza-compliant",
          checked: false,
        },
        {
          id: 2,
          text: "Loading & unloading area",
          value: "loading-unloading-area",
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
      listingTitle: "",
      propertyType: "",
      listingType: "for-sale",
      floorNo: "",
      unitNo: "",
      price: 0,
      city: "",
      address: "",
      bedrooms: 0,
      bathrooms: 1,
      floorArea: 0,
      lotArea: 0,
      buildingArea: 0,
      ceilingHeight: 0,
      features: [],
      images: [],
      longitude: 0,
      latitude: 0,
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
