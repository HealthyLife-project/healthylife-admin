import axios from "axios";
import { useState } from "react";

export function AiTest2() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const genratehandle = async () => {
    try {
      const res = await axios.post("http://localhost:5001/ai/imageText", {
        text: prompt,
      });

      if (res.data) {
        setImage(res.data); // base64 문자열
      }
    } catch (err) {
      console.error("생성 실패:", err);
    }
  };
  const testHash = async () => {
    const res: any = await axios.get("http://localhost:5001/hashtag/allhash");
    console.log(res);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="프롬프트를 입력하세요"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={genratehandle}>이미지 생성</button>
      {image && <img src={image} style={{ width: 400 }} />}
      <button onClick={testHash}>해쉬태그</button>
    </div>
  );
}
