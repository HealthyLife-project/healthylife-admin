export const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/auth/google";
  };

  const handleNaverLogin = () => {
    window.location.href = "http://localhost:5001/auth/naver";
  };

  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:5001/auth/kakao";
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Google 로그인</button>
      <button onClick={handleNaverLogin}>Naver 로그인</button>
      <button onClick={handleKakaoLogin}>Kakao 로그인</button>
    </div>
  );
};
