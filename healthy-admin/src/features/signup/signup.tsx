import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Form,
  Label,
  Input,
  ErrorMessage,
  Button,
  InputWrap,
} from "./styled";
import api from "@/util/source";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.endsWith("@healthy.co.kr")) {
      setError("이메일은 @healthy.co.kr로 끝나야 합니다.");
      return;
    }
    const obj = {
      name: name,
      userid: username,
      password: password,
      email: email,
    };
    api
      .post("admin/signup", obj)
      .then((res) => {
        res.data.result ? router.push("/") : console.log(res, "회원가입 error");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputWrap>
          <Label>이름</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputWrap>

        <InputWrap>
          <Label>아이디</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputWrap>

        <InputWrap>
          <Label>비밀번호</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputWrap>

        <InputWrap>
          <Label>이메일</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@healthy.co.kr"
            required
          />
        </InputWrap>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit">가입하기</Button>
      </Form>
    </Container>
  );
};

export default SignUp;
