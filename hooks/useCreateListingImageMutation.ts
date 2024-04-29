import { createListingImage } from "@/api/listingImage";
import { GetToken } from "@clerk/types";
import { useMutation } from "@tanstack/react-query";

export function useCreateListingImageMutation() {
  const mutation = useMutation({
    mutationKey: ["create-listing-image"],
    mutationFn: ({
      getToken,
      base64,
    }: {
      getToken: GetToken;
      base64: string;
    }) => createListingImage(getToken, base64),
  });

  return mutation;
}
