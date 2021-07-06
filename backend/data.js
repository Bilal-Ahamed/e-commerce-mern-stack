import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Basir",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: "Nike Slime Shirt",
      category: "Shirts",
      image: "/images/p1.jpeg",
      price: 120,
      brand: "Nike",
      rating: 5,
      numReviews: 10,
      description: "high quality products",
      countInStock: 1,
    },
    {
      name: "Adidas Fit Shirts",
      category: "Shirts",
      image: "/images/p2.jpeg",
      price: 120,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality products",
      countInStock: 2,
    },
    {
      name: "Lacoste Free Shirt",
      category: "Shirts",
      image: "/images/p3.jpeg",
      price: 50,
      brand: "Nike",
      rating: 4.1,
      numReviews: 17,
      description: "high quality products",
      countInStock: 5,
    },
    {
      name: "Nike Slim Pant",
      category: "Shirts",
      image: "/images/p4.jpeg",
      price: 150,
      brand: "Nike",
      rating: 3.5,
      numReviews: 55,
      description: "high quality products",
      countInStock: 20,
    },
    {
      name: "Puma Slim Pant",
      category: "Shirts",
      image: "/images/p5.jpeg",
      price: 10,
      brand: "Nike",
      rating: 2.5,
      numReviews: 14,
      description: "high quality products",
      countInStock: 2,
    },
    {
      name: "Panda Slime Shirt",
      category: "Shirts",
      image: "/images/p6.jpeg",
      price: 12,
      brand: "Nike",
      rating: 3.5,
      numReviews: 20,
      description: "high quality products",
      countInStock: 0,
    },
  ],
};

export default data;
