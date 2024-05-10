const app = require("./app/index");
const connectDB = require("./db");
require("dotenv").config();

// connect to mongodb
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
