class CategoryApi {
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

  // GET /api/categories (all)
  getAllCategories(token) {
    return cy.request({
      method: "GET",
      url: "/api/categories",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      failOnStatusCode: false,
    });
  }

  // GET /api/categories/main
  getMainCategories(token) {
    return cy.request({
      method: "GET",
      url: "/api/categories/main",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      failOnStatusCode: false,
    });
  }

  // GET /api/categories/page
  getCategoriesPage(page = 0, size = 10, sortField = "id", sortDir = "asc", token) {
    return cy.request({
      method: "GET",
      url: `/api/categories/page?page=${page}&size=${size}&sortField=${sortField}&sortDir=${sortDir}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      failOnStatusCode: false,
    });
  }

  // GET /api/categories/summary
  getCategorySummary(token) {
    return cy.request({
      method: "GET",
      url: "/api/categories/summary",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      failOnStatusCode: false,
    });
  }

  // GET /api/categories/sub-categories
  getSubCategories(token) {
    return cy.request({
      method: "GET",
      url: "/api/categories/sub-categories",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      failOnStatusCode: false,
    });
  }

  // GET /api/categories/{id}
  getCategoryById(id, token) {
    return cy.request({
      method: "GET",
      url: `/api/categories/${id}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      failOnStatusCode: false,
    });
  }

  // POST /api/categories - create category
  createCategory(body, token) {
    return cy.request({
      method: "POST",
      url: "/api/categories",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body,
      failOnStatusCode: false,
    });
  }

  // PUT /api/categories/{id} - update category
  updateCategory(id, body, token) {
    return cy.request({
      method: "PUT",
      url: `/api/categories/${id}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body,
      failOnStatusCode: false,
    });
  }
}

export default new CategoryApi();