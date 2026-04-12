import { apiRequest } from "./http.js";

export const shipmentsApi = {
  list: () => apiRequest("/admin/shipments"),               // later backend
  listRecent: () => apiRequest("/admin/shipments?limit=6"), // optional
};