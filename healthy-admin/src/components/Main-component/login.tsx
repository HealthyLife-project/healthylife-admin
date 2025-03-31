import axios from "axios";

export const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/auth/google";
  };

  return <button onClick={handleGoogleLogin}>Google 로그인</button>;
};
