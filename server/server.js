const express = require("express");
const apiRouter = require("./routes");
var cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.listen(process.env.PORT || "8080", () => {
  console.log(`server is running on port: ${process.env.PORT || "8080"}`);
});
