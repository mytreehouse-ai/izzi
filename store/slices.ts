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
    nextStep: () => (state) => ({
      ...state,
      currentStepIndex:
        state.currentStepIndex < state.steps.length - 1
          ? state.currentStepIndex + 1
          : state.currentStepIndex,
    }),
    prevStep: () => (state) => ({
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
  withSlices(bedroomFilterSlice, bathroomFilterSlice, propertyValuationSlice)
);
