class PlantApi {
  // GET /api/plants/{id}
  getPlant(id, token) {
    return cy.request({
      method: "GET",
      url: `/api/plants/${id}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      failOnStatusCode: false,
    });
  }

  // PUT /api/plants/{id} - update plant
  updatePlant(id, body, token) {
    return cy.request({
      method: "PUT",
      url: `/api/plants/${id}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body,
      failOnStatusCode: false,
    });
  }

  // GET /api/plants - get all plants
  getAllPlants(token) {
    return cy.request({
      method: "GET",
      url: "/api/plants",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      failOnStatusCode: false,
    });
  }
}

export default new PlantApi();
