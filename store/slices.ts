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

export const useStore = create(
  withSlices(bedroomFilterSlice, bathroomFilterSlice)
);
