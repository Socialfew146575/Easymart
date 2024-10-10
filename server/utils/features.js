class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

search() {
    const keyword = this.queryString.keyword
      ? {
          $or: [
            { name: { $regex: this.queryString.keyword, $options: "i" } },
            { category: { $regex: this.queryString.keyword, $options: "i" } }
          ]
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
}

  filter() {
    const queryCopy = { ...this.queryString };

    // Remove some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }

  async getFilteredProductsCount() {
    const result = await this.query.clone(); // Clone the query to execute it without applying pagination
    return result.length;
  }
}

module.exports = ApiFeatures;
