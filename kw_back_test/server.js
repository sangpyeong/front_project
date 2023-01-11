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
function adminkeyinitinlogin({ userID, password }) {
  userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  const finduser = userdb.users.find(
    (user) => user.userID === userID && user.password === password
  );
  return finduser.adminkey;
}

function findhittingdata({ userID }) {
  userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  const finduser = userdb.users.find((user) => user.userID === userID);
  return finduser;
}

function findhittingdata_for_modify({
  userID,
  user_idnumber,
  name,
  tell_number,
  email,
  birthday,
}) {
  userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  const finduser = userdb.users.find(
    (user) =>
      user.userID === userID &&
      user.user_idnumber === user_idnumber &&
      user.name === name &&
      user.tell_number === tell_number &&
      user.email === email &&
      user.birthday === birthday
  );
  return finduser;
}
// Check if the user exists in database
function isAuthenticated_for_register_and_detail({ userID }) {
  userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  return userdb.users.findIndex((user) => user.userID === userID) !== -1;
}

// Check if the user exists in database
function isAuthenticated_for_login_modify({ userID, password }) {
  userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  return (
    userdb.users.findIndex(
      (user) => user.userID === userID && user.password === password
    ) !== -1
  );
}

// Register New User
server.post("/auth/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  var {
    userID,
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

  if (isAuthenticated_for_register_and_detail({ userID }) === true) {
    const status = 401;
    const message = "userID already exist";
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
      userID: userID,
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
  const access_token = createToken({ userID, password, adminkey });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

// Login to one of the users from ./users.json
server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { userID, password } = req.body;

  if (isAuthenticated_for_login_modify({ userID, password }) === false) {
    const status = 401;
    const message = "Incorrect userID or password";
    res.status(status).json({ status, message });
    return;
  }
  const adminkey = adminkeyinitinlogin({ userID, password });
  console.log("adminkey", adminkey);

  const access_token = createToken({ userID, password, adminkey });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

//비밀번호 재확인
server.post("/auth/check", (req, res) => {
  console.log("check endpoint called; request body:");
  console.log(req.body);
  const { userID, password } = req.body;
  if (isAuthenticated_for_login_modify({ userID, password }) === false) {
    const status = 401;
    const message = "Incorrect userID or password";
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

// DB정보를 가지고오는 기능
server.post("/auth/detail", (req, res) => {
  console.log("check endpoint called; request body:");
  console.log(req.body);
  const { userID } = req.body;
  if (isAuthenticated_for_register_and_detail({ userID }) === false) {
    const status = 401;
    const message = "No exist userID";
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
  const hittingdata = findhittingdata({ userID });

  if (hittingdata === undefined) {
    const status = 401;
    const message = "No exist imformation in DB";
    res.status(status).json({ status, message });
    return;
  }

  console.log(hittingdata);
  const message = req.headers.authorization;
  res.status(200).json(hittingdata);
  console.log("Bearer access_token:", req.headers.authorization);
});

// DB정보를 수정하는 기능
server.post("/auth/modify", (req, res) => {
  console.log("check endpoint called; request body:");
  console.log(req.body);
  const {
    userID,
    password,
    user_idnumber,
    name,
    tell_number,
    email,
    birthday,
    new_password,
    new_tell_number,
    new_email,
    new_birthday,
  } = req.body;

  if (isAuthenticated_for_login_modify({ userID, password }) === false) {
    const status = 401;
    const message = "No exist userID";
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
  const hittingdata = findhittingdata_for_modify({
    userID,
    user_idnumber,
    name,
    tell_number,
    email,
    birthday,
  });

  if (hittingdata === undefined) {
    const status = 401;
    const message = "No exist imformation in DB";
    res.status(status).json({ status, message });
    return;
  }
  console.log("hittingdata:", hittingdata);

  /////////////////////////////////////////////////////////////////////////////////////////////////
  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());
    const find_user_index = data.users.findIndex(
      (data) => JSON.stringify(data) === JSON.stringify(hittingdata)
    );
    console.log("data.users[9]: ", data.users[9]);
    console.log("hittingdata: ", hittingdata);
    console.log("find_user_index: ", find_user_index);
    console.log("data.users[find_user_index]: ", data.users[find_user_index]);

    // 수정하고자 하는 유저 변경
    if (new_password !== "") {
      data.users[find_user_index].password = new_password;
    }
    if (new_tell_number !== "") {
      data.users[find_user_index].tell_number = new_tell_number;
    }
    if (new_email !== "") {
      data.users[find_user_index].email = new_email;
    }
    if (new_birthday !== "") {
      data.users[find_user_index].birthday = new_birthday;
    }
    console.log("변경후: ", data.users[10]);

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
    console.log(userdb.users[10]);
    res.status(200).json(userdb.users[10]);
    console.log("Bearer access_token:", req.headers.authorization);
  });
});

server.use(router);

server.listen(8000, () => {
  console.log("Run Auth API Server");
});
