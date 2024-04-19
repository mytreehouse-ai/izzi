import { ApiBaseResponse } from "@/interfaces/apiBaseResponse";
import { PropertyListing } from "@/interfaces/propertyListing";
import { GetToken } from "@clerk/types";
import Constants from "expo-constants";

export async function fetchPropertyListings(
  getToken: GetToken,
  queryParams?: string
): Promise<ApiBaseResponse<PropertyListing[]>> {
  try {
    const token = await getToken();

    const API_URL = Constants.expoConfig?.extra?.apiUrl ?? "";

    if (!API_URL) {
      throw new Error("REST API URL not found");
    }

    const url = `${API_URL}/api/property-listings?${queryParams}`;

    const response = await fetch(url, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
}
