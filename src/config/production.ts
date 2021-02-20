const prodConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: `${process.env.DATABASE_URL}`,
  JWT_SECRET: `${process.env.JWT_SECRET}`,
};
export default prodConfig;
