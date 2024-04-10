import { PropertyListingFilters } from "@/interfaces/propertyListingFilters";

export function filterParams(
  filters?: Partial<PropertyListingFilters>
): string {
  const effectiveFilters = { ...filters };
  return Object.entries(effectiveFilters)
    .filter(
      ([_, value]) =>
        value !== "" && value !== 0 && value != null && value !== "null"
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}
