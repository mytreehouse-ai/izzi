import { GetToken } from "@clerk/types";
import Constants from "expo-constants";

export async function createListingImage(
  getToken: GetToken,
  base64: string
): Promise<{ blobUrl: string }> {
  try {
    const token = await getToken();

    const API_URL = Constants.expoConfig?.extra?.apiUrl ?? "";

    if (!API_URL) {
      throw new Error("REST API URL not found");
    }

    const url = `${API_URL}/api/upload-base64-image`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ base64 }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(await response.json());
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
}
