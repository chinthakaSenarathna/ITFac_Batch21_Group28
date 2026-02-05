// cypress/support/api/auth.js
// Authentication helper to obtain and cache tokens

import { API, apiRequest } from "./apiClient";

const tokenCache = {};

export function loginAndGetToken(role = "admin") {
  const credentials =
    role === "admin"
      ? { username: "admin", password: "admin123" }
      : { username: "testuser", password: "test123" };

  const cacheKey = `${credentials.username}:${credentials.password}`;

  if (tokenCache[cacheKey]) {
    return cy.wrap(tokenCache[cacheKey]);
  }

  return apiRequest({
    method: "POST",
    url: API.LOGIN,
    body: credentials,
    failOnStatusCode: false,
  }).then((r) => {
    expect(r.status).to.eq(200);
    const token =
      r.body.token ||
      r.body.accessToken ||
      r.body.jwt ||
      r.body?.data?.token ||
      r.body?.data?.accessToken;
    
    expect(token, "Token not found in login response").to.exist;
    tokenCache[cacheKey] = token;
    return token;
  });
}

export function clearTokenCache() {
  Object.keys(tokenCache).forEach((key) => delete tokenCache[key]);
}
