// cypress/support/api/apiClient.js
// Central place to configure API endpoints and request helper.

export const API = {
  LOGIN: "/api/auth/login",
  DASH_SUMMARY: "/api/dashboard/summary",
  CATEGORIES: "/api/categories",
  PLANTS: "/api/plants",
  SALES: "/api/sales",
  INVENTORY: "/api/inventory",
};

export function apiRequest({ method, url, token, body, qs, failOnStatusCode = false }) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return cy.request({
    method,
    url,
    headers,
    body,
    qs,
    failOnStatusCode,
  });
}
