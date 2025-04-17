import api from "./source";
import { AxiosError } from "axios"; // AxiosError 타입을 import

async function loginUser(username: string, password: string) {
  try {
    console.log("로그인 시도", { username, password });

    const res = await api.post("/admin/login", { username, password });
    if (res.data.result) {
      return { token: res.data.jwt, result: res.data.result };
    } else {
      return { result: res.data.result };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("로그인 실패", error.response.data.message);
          alert(error.response.data.message);
        }
      } else {
        console.error("서버와의 연결 문제:", error.message);
        alert("서버와의 연결에 문제가 발생했습니다.");
      }
    } else {
      // 예외 처리
      console.error("알 수 없는 에러:", error);
      alert("알 수 없는 에러가 발생했습니다.");
    }
  }
}

export default loginUser;
