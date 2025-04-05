import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
const SocialLogin = () => {
  const router = useRouter();
  const { signup, token, provider } = router.query;

  useEffect(() => {
    //쿼리로 받기 때문에 Boolean이 아닌 string으로 전달됨
    if (signup === "true" && token) {
      console.log("회원 유저, 토큰", token);

      const res = axios.get("http://localhost:5001/auth/cookie"); // 로그인이 완료되면 쿠키 조회
    } else if (signup === "false" && provider) {
      console.log("비회원 유저, provider", provider);
    }
  }, [signup, token, provider]);

  return (
    <div>
      <h1>로그인 처리중..</h1>
    </div>
  );
};

export default SocialLogin;
