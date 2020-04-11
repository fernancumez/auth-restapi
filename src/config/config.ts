export default {
  jwtSecret: process.env.JWT_SECRET || "somesecrettoken",

  DB: {
    URI:
      process.env.MONGODB_URI || "mongodb://localhost/restapi-jwt-typescript",
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
  },
};
