const fs = require("fs"); //파일 입출력 처리를 위해

const bodyParser = require("body-parser"); //클라이언트 POST request data의 body로부터 파라미터를 편리하게 추출합니다.

const jsonServer = require("json-server"); // json-server사용 해당 부분을 향후 express로 바꾸는 과정 학습 필요

const jwt = require("jsonwebtoken"); // jwt 토큰을 사용하기 위해

const server = jsonServer.create(); //
//const router = jsonServer.router("./userDB.json"); //get 요청을 위해

var userdb = JSON.parse(fs.readFileSync("./userDB.json", "UTF-8"));

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결
server.use(bodyParser.urlencoded({ extended: true })); //body를 활용하기 위해
server.use(bodyParser.json()); //body를 활용하기 위해

const middleware = jsonServer.defaults(); //미들웨어

server.use(middleware); //미들웨어 사용

const SECRET_KEY = "123456789"; //jwt의 시크릿키

const expiresIn = "1h"; //jwt의 유효시간

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
function adminkeyinitinlogin({ employNumber, password }) {
  userdb = JSON.parse(fs.readFileSync("./userDB.json", "UTF-8"));
  const finduser = userdb.users.find(
    (user) => user.employNumber === employNumber && user.password === password
  );
  return finduser.adminkey;
}

//원하는 사용자 정보 찾는 함수
function findhittingdata({ employNumber }) {
  userdb = JSON.parse(fs.readFileSync("./userDB.json", "UTF-8"));
  const finduser = userdb.users.find(
    (user) => user.employNumber === employNumber
  );
  return finduser;
}

//수정 기능 API에서 원하는 사용자 정보 찾는 함수
function findhittingdata_for_modify({
  employNumber,
  username,
  phoneNumber,
  email,
  birthday,
}) {
  userdb = JSON.parse(fs.readFileSync("./userDB.json", "UTF-8"));
  const finduser = userdb.users.find(
    (user) =>
      user.employNumber === employNumber &&
      user.username === username &&
      user.phoneNumber === phoneNumber &&
      user.email === email &&
      user.birthday === birthday
  );
  return finduser;
}

//DB 검색 API에서 원하는 사용자 정보 찾는 함수
function findhittingdata_for_find({
  employNumber,
  username,
  phoneNumber,
  email,
  birthday,
}) {
  userdb = JSON.parse(fs.readFileSync("./userDB.json", "UTF-8"));
  const finduser = userdb.users.find(
    (user) =>
      user.employNumber === employNumber &&
      user.username === username &&
      user.phoneNumber === phoneNumber &&
      user.email === email &&
      user.birthday === birthday
  );
  return finduser;
}

function findhittingdata_login({ employNumber, password }) {
  userdb = JSON.parse(fs.readFileSync("./userDB.json", "UTF-8"));
  const finduser = userdb.users.find(
    (user) => user.employNumber === employNumber && user.password === password
  );
  return finduser.username;
}

// Check if the user exists in database
function isAuthenticated_for_register_and_detail({ employNumber }) {
  userdb = JSON.parse(fs.readFileSync("./userDB.json", "UTF-8"));
  return (
    userdb.users.findIndex((user) => user.employNumber === employNumber) !== -1
  );
}

// Check if the user exists in database
function isAuthenticated_for_login_modify({ employNumber, password }) {
  userdb = JSON.parse(fs.readFileSync("./userDB.json", "UTF-8"));
  return (
    userdb.users.findIndex(
      (user) => user.employNumber === employNumber && user.password === password
    ) !== -1
  );
}

// Register New User
server.post("/auth/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  var {
    employNumber,
    password,
    username,
    phoneNumber,
    email,
    birthday,
    adminkey,
  } = req.body;

  if (
    //사용자가 정보를 누락해서 입력하였을 경우 (관리자 인증키의 경우 제외)
    employNumber === "" ||
    password === "" ||
    username === "" ||
    phoneNumber === "" ||
    email == "" ||
    birthday === ""
  ) {
    const status = 401;
    const message = "Incorrect data";
    res.status(status).json({ status, message });
    return;
  }

  if (adminkey === "9999") {
    //관리자권한 부여
    adminkey = 1;
  } else {
    adminkey = 0;
  }

  if (isAuthenticated_for_register_and_detail({ employNumber }) === true) {
    //DB에서 중복검사
    const status = 401;
    const message = "employNumber already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./userDB.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user

    if (data.users.length === 0 && data.users.constructor === Array) {
      //user 배열에 객체가 할당되진 않은 경우
      var last_item_id = 0;
    } else {
      var last_item_id = data.users[data.users.length - 1].id;
    }

    //Add new user
    data.users.push({
      id: last_item_id + 1,
      employNumber: employNumber,
      password: password,
      username: username,
      phoneNumber: phoneNumber,
      email: email,
      birthday: birthday,
      adminkey: adminkey,
    });

    //add some data
    var writeData = fs.writeFileSync(
      "./userDB.json",
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
    userdb = JSON.parse(fs.readFileSync("./userDB.json", "UTF-8")); //동기화
  });

  // Create token for new user

  const message = "Success register";
  res.status(200).json({ message });
});

// Login to one of the users from ./userDB.json
server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { employNumber, password } = req.body;

  if (isAuthenticated_for_login_modify({ employNumber, password }) === false) {
    const status = 401;
    const message = "Incorrect employNumber or password";
    res.status(status).json({ status, message });
    return;
  }

  const adminkey = adminkeyinitinlogin({ employNumber, password }); //관리자키 확인
  const username = findhittingdata_login({ employNumber, password });
  // Create token for new user
  const access_token = createToken({ employNumber, password, adminkey }); //토큰 만들기
  const message = "Success login";
  res.status(200).json({ message, access_token, username }); //토큰 전송
});

//비밀번호 재확인 api MY페이지 접속을 위한 미들웨어
server.post("/auth/check", (req, res) => {
  console.log("check endpoint called; request body:");
  console.log(req.body);
  const { employNumber, password } = req.body;

  if (isAuthenticated_for_login_modify({ employNumber, password }) === false) {
    //사번과 비번을 DB에서 매치
    const status = 401;
    const message = "Incorrect password";
    res.status(status).json({ status, message });
    return;
  }

  if (
    //토큰 검사 오올바른 토큰이 파싱됐는지 확인
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }

  try {
    //토큰 유효성 검사
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
    return;
  }

  const message = "Success login";
  res.status(200).json({ message });
});

// DB정보를 찾아서 가지고오는 기능 MY페이지 출력을 위한 미들웨어
server.post("/auth/detail", (req, res) => {
  console.log("check endpoint called; request body:");
  console.log(req.body);
  const { employNumber } = req.body;

  if (isAuthenticated_for_register_and_detail({ employNumber }) === false) {
    //사번을 DB와 매칭
    const status = 401;
    const message = "No exist employNumber";
    res.status(status).json({ status, message });
    return;
  }

  if (
    //토큰 파싱 확인
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    //토큰 유효성 검사
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
    return;
  }

  const hittingdata = findhittingdata({ employNumber }); //사번을 DB와 매칭시켜 데이터 가져오기

  if (hittingdata === undefined) {
    //데이터를 가져올 수 없는 경우
    const status = 401;
    const message = "No exist imformation in DB";
    res.status(status).json({ status, message });
    return;
  }

  const message = "Success finding detail";
  const userinform = hittingdata;
  res.status(200).json({ message, userinform }); //성공
});

// DB정보를 수정하는 기능
server.post("/auth/modify", (req, res) => {
  console.log("check endpoint called; request body:");
  console.log(req.body);
  const {
    employNumber,
    password,
    username,
    phoneNumber,
    email,
    birthday,
    newPassword,
    newPhoneNumber,
    newEmail,
  } = req.body;

  if (isAuthenticated_for_login_modify({ employNumber, password }) === false) {
    //사번과 비밀번호를 DB에 매칭
    const status = 401;
    const message = "No exist employNumber";
    res.status(status).json({ status, message });
    return;
  }

  if (
    //토큰 파싱 확인
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    //토큰 유효성 검사
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
    //해당 정보를 DB에 매칭시켜 원하는 정보가져오기
    employNumber,
    username,
    phoneNumber,
    email,
    birthday,
  });

  if (hittingdata === undefined) {
    //DB에서 원하는 정보를 가져올 수 없는 경우
    const status = 401;
    const message = "No exist imformation in DB";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./userDB.json", (err, data) => {
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
    // 수정하고자 하는 사용자 정보 변경
    if (newPassword !== "") {
      data.users[find_user_index].password = newPassword;
    }
    if (newPhoneNumber !== "") {
      data.users[find_user_index].phoneNumber = newPhoneNumber;
    }
    if (newEmail !== "") {
      data.users[find_user_index].email = newEmail;
    }

    //add some data
    var writeData = fs.writeFileSync(
      "./userDB.json",
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

    userdb = JSON.parse(fs.readFileSync("./userDB.json", "UTF-8")); //동기화
    const message = "Success modifying user imformation";
    res.status(200).json(message);
  });
});

//DB에서 원하는 Password를 찾는 기능
server.post("/auth/find", (req, res) => {
  console.log("check endpoint called; request body:");
  console.log(req.body);
  const { employNumber, username, phoneNumber, email, birthday } = req.body;

  const hittingdata = findhittingdata_for_find({
    //DB에 해당 정보를 매칭시키고 원하는 정보를 가져옴
    employNumber,
    username,
    phoneNumber,
    email,
    birthday,
  });

  if (
    //사용자가 정보를 누락해서 입력하였을 경우 (관리자 인증키의 경우 제외)
    employNumber === "" ||
    username === "" ||
    phoneNumber === "" ||
    email == "" ||
    birthday === ""
  ) {
    const status = 401;
    const message = "Incorrect data";
    res.status(status).json({ status, message });
    return;
  }

  if (hittingdata === undefined) {
    //매칭 실패시
    const status = 401;
    const message = "No exist imformation in DB";
    res.status(status).json({ status, message });
    return;
  }
  const message = "Success finding password";
  const userPassword = hittingdata;
  res.status(200).json({ message, userPassword });
});

//server.use(router);

server.listen(8000, () => {
  console.log("Run Simple Login API Server");
});
