const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const route = require("./server/routes/route");
const app = express();
dotenv.config();
app.use(cors({ origin: "*" }));
const port = process.env.port || 8800;

app.use(express.json({ limit: "10mb" }));
app.use("./public", express.static(path.resolve(__dirname, "./public/")));
app.use("/", route);
app.listen(port, () => {
  console.log(`app run on http://localhost:${port}`);
});
