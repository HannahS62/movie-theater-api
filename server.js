const express = require("express");
const usersRouter = require("./routes/users");
const app = express();

app.use(express.json());
app.use("/users", usersRouter);
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
