import { apiRequest } from "./http.js";

export const vehiclesApi = {
  locations: () => apiRequest("/admin/vehicles/locations"),
};