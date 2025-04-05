export const GoogleLogin = () => {
  const handleSocialLogin = (provider: string) => {
    window.location.href = `http://localhost:5001/auth/${provider}`;
  };

  // 사용 예시
  return (
    <>
      {" "}
      <button onClick={() => handleSocialLogin("google")}>Google 로그인</button>
      <button onClick={() => handleSocialLogin("naver")}>Naver 로그인</button>
      <button onClick={() => handleSocialLogin("kakao")}>Kakao 로그인</button>
    </>
  );
};
