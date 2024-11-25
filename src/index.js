import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection failed : " + error);
  });
