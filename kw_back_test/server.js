const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./database.json");
var userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

//로그인 함수에서 관리자 인증키를 변수에 인증키를 저장하기위한 함수
function adminkeyinitinlogin({ username, password }) {
  userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  const finduser = userdb.users.find(
    (user) => user.username === username && user.password === password
  );
  return finduser.adminkey;
}

function findhittingdata({ username }) {
  userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  const finduser = userdb.users.find((user) => user.username === username);
  return finduser;
}

// Check if the user exists in database
function isAuthenticatedforregister({ username }) {
  userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  return userdb.users.findIndex((user) => user.username === username) !== -1;
}

// Check if the user exists in database
function isAuthenticatedforlogin({ username, password }) {
  userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  return (
    userdb.users.findIndex(
      (user) => user.username === username && user.password === password
    ) !== -1
  );
}

// Register New User
server.post("/auth/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  var {
    username,
    password,
    user_idnumber,
    name,
    tell_number,
    email,
    birthday,
    adminkey,
  } = req.body;
  console.log("modify adminkey", adminkey);

  if (adminkey === "9999") {
    adminkey = 1;
  } else {
    adminkey = 0;
  }

  if (isAuthenticatedforregister({ username }) === true) {
    const status = 401;
    const message = "username already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({
      id: last_item_id + 1,
      username: username,
      password: password,
      user_idnumber: user_idnumber,
      name: name,
      tell_number: tell_number,
      email: email,
      birthday: birthday,
      adminkey: adminkey,
    });

    //add some data
    var writeData = fs.writeFileSync(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
    userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8")); //동기화
  });

  // Create token for new user
  console.log(adminkey);
  const access_token = createToken({ username, password, adminkey });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

// Login to one of the users from ./users.json
server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { username, password } = req.body;

  if (isAuthenticatedforlogin({ username, password }) === false) {
    const status = 401;
    const message = "Incorrect username or password";
    res.status(status).json({ status, message });
    return;
  }
  const adminkey = adminkeyinitinlogin({ username, password });
  console.log("adminkey", adminkey);

  const access_token = createToken({ username, password, adminkey });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

server.post("/auth/check", (req, res) => {
  console.log("check endpoint called; request body:");
  console.log(req.body);
  const { username, password } = req.body;
  if (isAuthenticatedforlogin({ username, password }) === false) {
    const status = 401;
    const message = "Incorrect username or password";
    res.status(status).json({ status, message });
    return;
  }

  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
  const message = req.headers.authorization;
  res.status(200).json({ message });
  console.log("Bearer access_token:", req.headers.authorization);
});

server.post("/auth/detail", (req, res) => {
  console.log("check endpoint called; request body:");
  console.log(req.body);
  const { username } = req.body;
  if (isAuthenticatedforregister({ username }) === false) {
    const status = 401;
    const message = "No exist username";
    res.status(status).json({ status, message });
    return;
  }

  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
  const hittingdata = findhittingdata({ username });
  console.log(hittingdata);
  const message = req.headers.authorization;
  res.status(200).json(hittingdata);
  console.log("Bearer access_token:", req.headers.authorization);
});

server.use(router);

server.listen(8000, () => {
  console.log("Run Auth API Server");
});
