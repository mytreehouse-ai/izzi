import { fetchPropertyValuation } from "@/api/propertyValuation";
import { filterParams } from "@/utils/filterParams";
import { GetToken } from "@clerk/types";
import { useQuery } from "@tanstack/react-query";

interface PropertyValuationFilter {
  property_type: string;
  sqm: number;
  city: string;
  address: string;
  user_id: string;
  google_places_data_id?: string;
  google_places_details_id?: string;
}

export function usePropertyValuationQuery(options: {
  getToken: GetToken;
  filter: PropertyValuationFilter;
  enabled?: boolean;
}) {
  const { getToken, filter, enabled } = options;

  const filteredParams = filterParams(filter);

  const query = useQuery({
    queryKey: ["property-valuation", filteredParams],
    queryFn: () => fetchPropertyValuation(getToken, filteredParams),
    enabled,
  });

  return query;
}
