// /pages/index.tsx
import { useState } from "react";

export function AITEST() {
  const [prompt, setPrompt] = useState("");
  const [res, setRes] = useState("");

  const geneChange = async () => {
    try {
      const res = await fetch("http://localhost:5001/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      // 응답이 JSON인지 먼저 확인
      const text = await res.text();
      // 응답을 텍스트로 받아서 확인
      setRes(text);
    } catch (error) {
      console.error("에러 발생:", error);
      setRes("API 호출 실패");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Google Gemini 테스트</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="프롬프트 입력..."
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button
        onClick={geneChange}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        생성 요청
      </button>
      <h2>응답:</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{res}</pre>
    </div>
  );
}
