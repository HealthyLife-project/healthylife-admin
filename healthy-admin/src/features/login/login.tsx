// features/auth/LoginForm.tsx
import React, { useState } from "react";
import {
  LoginContainer,
  LoginFormWrapper,
  LoginLabel,
  LoginInput,
  LoginError,
  LoginButton,
  LoginInputWrap,
  SignUpButton,
} from "./styled";
import loginUser from "@/util/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authtoken";
import { sign } from "crypto";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    const res: any = await loginUser(username, password);
    if (res.result) {
      dispatch(loginSuccess(res.token));
      window.location.reload();
    } else {
      alert("서버 에러");
    }
  };
  const signUpPage = () => {
    router.push("/signup");
  };
  return (
    <LoginContainer>
      <LoginFormWrapper onSubmit={handleLogin}>
        <LoginInputWrap>
          <LoginLabel>ID</LoginLabel>
          <LoginInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </LoginInputWrap>
        <LoginInputWrap>
          <LoginLabel>Password</LoginLabel>
          <LoginInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </LoginInputWrap>
        {error && <LoginError>{error}</LoginError>}
        <LoginButton type="submit">Login</LoginButton>
        <SignUpButton onClick={signUpPage}>회원가입</SignUpButton>
      </LoginFormWrapper>
    </LoginContainer>
  );
};

export default LoginForm;
