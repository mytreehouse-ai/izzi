import { fetchPropertyListings } from "@/api/propertyListings";
import { filterParams } from "@/utils/filterParams";
import { GetToken } from "@clerk/types";
import { useQuery } from "@tanstack/react-query";

interface PropertyValuationFilter {
  property_type: string;
  sqm: number;
  city?: string;
  address: string;
  user_id: string;
}

export function usePropertyValuationQuery(
  getToken: GetToken,
  filter: PropertyValuationFilter
) {
  const filteredParams = filterParams(filter);

  const query = useQuery({
    queryKey: ["property-valuation", filteredParams],
    queryFn: () => fetchPropertyListings(getToken, filteredParams),
  });

  return query;
}
