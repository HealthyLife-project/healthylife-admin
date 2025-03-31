import MainAdmin from "@/features/Main/Main";
import { HEAD } from "@/components/header/header";
import { useState, useEffect } from "react";
export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    // dark 모드 테스트
    setDarkMode(true); // 예시로 true로 설정
  }, []);

  if (darkMode === null) {
    return null; // SSR과 CSR의 차이를 피하기 위해 초기 렌더링에서 아무것도 표시하지 않음
  }

  return (
    <>
      <HEAD dark={darkMode ? "true" : "false"} />
      <MainAdmin />
    </>
  );
}
