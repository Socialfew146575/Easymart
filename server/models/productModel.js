const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [8, "Price cannot exceed 8 figures"],
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    max: 9999,
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  specifications: {
    type: Map,
    of: String, // Define the type of values in the map
    default: {}, // Optional: you can specify a default value if needed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", function (next) {
  if (!this.isModified("reviews")) {
    return next();
  }

  this.numberOfReviews = this.reviews.length;

  const totalRatings = this.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  this.ratings = (totalRatings / this.numberOfReviews).toFixed(2); // Ensure ratings are rounded to 2 decimal places

  next();
});

module.exports = model("Product", productSchema);
