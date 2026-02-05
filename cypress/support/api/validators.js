// cypress/support/api/validators.js
// Response validation helpers

export function expectStatus(res, code) {
  expect(res.status).to.eq(code);
}

export function expectStatusOneOf(res, codes) {
  if (!res) {
    throw new Error(`Response is undefined. API request might have failed.`);
  }
  const status = res.status;
  expect(codes, `Expected status ${status} to be one of [${codes.join(", ")}]`).to.include(status);
}

export function expectBodyHasKeys(res, keys = []) {
  keys.forEach((k) => expect(res.body, `Missing key: ${k}`).to.have.property(k));
}

export function expectArrayBody(res) {
  expect(res.body).to.be.an("array");
}

export function extractNumberField(obj, candidates) {
  for (const key of candidates) {
    const val = obj?.[key];
    if (typeof val === "number") return val;
  }
  return undefined;
}
