const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const photoRouter = require("./routers/photos");
const authRouter = require("./routers/auth");
const categoriesRouter = require("./routers/categories");
const messagesRouter = require("./routers/messages");

require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

app.use(express.static("public"));

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.use("/photos", photoRouter);

app.use("/categories", categoriesRouter);

app.use("/messages", messagesRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${HOST}:${port}`);
});
