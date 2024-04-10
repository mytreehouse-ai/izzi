import { fetchPropertyListings } from "@/api/propertyListings";
import { PropertyListingFilters } from "@/interfaces/propertyListingFilters";
import { filterParams } from "@/utils/filterParams";
import { GetToken } from "@clerk/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePropertyListingsQuery(
  getToken: GetToken,
  filter?: Partial<PropertyListingFilters>
) {
  const query = useInfiniteQuery({
    queryKey: ["property-listings", filterParams(filter)],
    queryFn: ({ pageParam }) =>
      fetchPropertyListings(
        getToken,
        filterParams({ ...filter, after: pageParam })
      ),
    getPreviousPageParam: (prevPage) => prevPage?.before,
    getNextPageParam: (lastPage) => lastPage?.after,
    initialPageParam: "2147483647",
  });

  return query;
}
