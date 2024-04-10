import { fetchPropertyListing } from "@/api/propertyListing";
import { GetToken } from "@clerk/types";
import { useQuery } from "@tanstack/react-query";

export function usePropertyListingQuery(
  getToken: GetToken,
  propertyListingId: number
) {
  const query = useQuery({
    queryKey: ["property-listing", propertyListingId],
    queryFn: () => fetchPropertyListing(getToken, propertyListingId),
  });

  return query;
}
