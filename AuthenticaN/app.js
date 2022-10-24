let express = require("express");
let cors = require("cors");
let app = express();
let http = require("http").createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

const db = require("./models");

db.sequelize.sync().then(() => {
  console.log("db resync");
});

require("./routes/user.routes")(app);
require("./routes/rol.routes")(app);

const auth = require("./middleware/auth");
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});


http.listen(3000, "0.0.0.0", () => {
  console.log("listening on *:3000");
});
