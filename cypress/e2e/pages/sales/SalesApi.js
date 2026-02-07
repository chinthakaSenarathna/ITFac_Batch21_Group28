class SalesApi {
  // Raw login request – returns the full Cypress response
  loginRequest(username, password) {
    return cy.request({
      method: "POST",
      url: "/api/auth/login", // baseUrl is http://localhost:8080
      body: {
        username,
        password,
      },
      failOnStatusCode: false, // let tests assert on status
    });
  }

  // Convenience method: resolves with token string if login is successful
  login(username, password) {
    return this.loginRequest(username, password).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      expect(response.body).to.have.property("tokenType", "Bearer");

      const token = response.body.token;
      // Optionally store in localStorage if you want UI flows to pick it up:
      // window.localStorage.setItem("token", token);

      return token;
    });
  }

  // GET /api/sales – requires a bearer token
  getAllSales(token) {
    return cy.request({
      method: "GET",
      url: "/api/sales",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
  }

  // GET /api/sales/{id} – requires a bearer token
  getSaleById(id, token) {
    return cy.request({
      method: "GET",
      url: `/api/sales/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
  }

  // POST /api/sales/plant/{plantId}?quantity={qty} – sell plant
  sellPlant(plantId, quantity, token) {
    return cy.request({
      method: "POST",
      url: `/api/sales/plant/${plantId}`,
      qs: {
        quantity: parseInt(quantity),
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: {},
      failOnStatusCode: false,
    });
  }

  // DELETE /api/sales/{id} – delete a sale (requires bearer token)
  deleteSale(id, token) {
    return cy.request({
      method: "DELETE",
      url: `/api/sales/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
  }
}

export default new SalesApi();

