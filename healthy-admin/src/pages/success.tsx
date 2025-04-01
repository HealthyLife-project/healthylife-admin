import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthSuccess = () => {
  const router = useRouter();

  // URL에서 쿼리 파라미터 값 가져오기
  const { userid, token, signup } = router.query;

  useEffect(() => {
    if (signup === "false") {
      // 회원가입이 아니라면 userid만 처리
      console.log("회원가입이 아니므로 userid:", userid);
      router.push("/");
    } else if (signup === "true" && token) {
      console.log("회원가입이고, 토큰:", token);
      router.push("/");
    }
  }, [signup, userid, token]);

  return (
    <div>
      <h1>AuthSuccess</h1>
      <p>사용자 ID: {userid}</p>
      <p>토큰: {token}</p>
      <p>회원가입 여부: {signup}</p>
    </div>
  );
};

export default AuthSuccess;
