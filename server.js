const express = require("express");
const usersRouter = require("./routes/users");
const showsRouter = require("./routes/shows");
const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/shows", showsRouter);
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
