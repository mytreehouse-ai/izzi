import { fetchPropertyCities } from "@/api/propertyCities";
import { GetToken } from "@clerk/types";
import { useQuery } from "@tanstack/react-query";

export function usePropertyCitiesQuery(getToken: GetToken) {
  const query = useQuery({
    queryKey: ["listing-cities"],
    queryFn: () => fetchPropertyCities(getToken),
  });

  return query;
}
