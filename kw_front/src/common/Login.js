function Login({ token, setToken, setModalContent, setAuth, setLogInModal }) {
  return (
    <div>
      <div>
        LOGO
        <div></div>
      </div>
      <div>
        <div>
          <div>ID</div>
          <input type="text" placeholder="아이디" />
        </div>
        <div>
          <div>비밀번호</div>
          <input type="password" placeholder="비밀번호" />
        </div>
      </div>
      <div>
        <div></div>
        <div>LOG IN</div>
      </div>
    </div>
  );
}

export default Login;
