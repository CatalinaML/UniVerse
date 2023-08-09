const app = require("./App");
const mongoose = require("mongoose");
const {
  IP_SERVER,
  API_VERSION,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
} = require("./utils/constants");

const port = process.env.POST || 8080;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`
    );

    app.listen(port, () => {
      console.log("################");
      console.log("CONEXIÓN EXITOSA");
      console.log("################");
      console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
    });
  } catch (error) {
    console.error(error);
  }
};

connectDB();
