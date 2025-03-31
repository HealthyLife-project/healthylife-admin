import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const token = router.query.token;

    if (token) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", token as string);

      // 백엔드에 토큰을 검증하는 요청
      axios
        .get("http://localhost:5001/auth/validate", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => console.log("인증 성공:", res.data))
        .catch((err) => console.error("인증 실패:", err));
    }
  }, [router.query.token]);

  return <div>로그인 성공! 토큰을 저장했습니다.</div>;
};

export default AuthSuccess;
