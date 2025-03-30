import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";

interface CateOption {
  id: number;
  category: string;
}

const onCategory = async (
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!category) {
    alert("카테고리를 입력하세요");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/hashtag/onCate", {
      category,
    });

    console.log("카테고리 추가 성공:", response.data);

    setCategory("");
  } catch (error) {
    console.error("카테고리 추가 실패:", error);
  }
};

const onHashtag = async (
  categoryId: number,
  hashtag: string,
  setCategory: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!hashtag) {
    alert("해쉬태그를 입력하세요");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/hashtag/onHash", {
      hashtag,
      categoryId,
    });

    console.log("해쉬태그 추가 성공:", response.data);

    setCategory("");
  } catch (error) {
    console.error("해쉬태그 추가 실패:", error);
  }
};

export const HashCate = () => {
  const [category, setCategory] = useState(""); //category input창
  const [hashtag, setHashtag] = useState(""); //hashtag input창
  const [options, setOptions] = useState<CateOption[]>([]); //options select 밸류
  const [cateid, setSelect] = useState<number>(1);

  useEffect(() => {
    const cate = async () => {
      try {
        const res = await axios.get("http://localhost:5000/hashtag/AllCate");
        setOptions(res.data);
        console.log(options);
      } catch (error) {
        console.error("카테고리 불러오기 실패:", error);
      }
    };

    cate(); // 함수 호출
    console.log(options);
  }, []);

  function onSelect(v: number) {
    setSelect(v);
    console.log(v);
  }
  return (
    <div>
      <h3>기본 환경 설정</h3>
      <hr />
      <div>
        <h4>카테고리 추가 제거</h4>
        <hr />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          onClick={() => {
            onCategory(category, setCategory);
          }}
        >
          추가
        </button>
      </div>
      <div>
        <h4>해시태그 추가 제거</h4>
        <hr />
        <select
          value={cateid} // 선택된 값을 상태로 설정
          onChange={(e) => onSelect(Number(e.target.value))}
        >
          {options.map((op) => (
            <option key={op.id} value={op.id}>
              {op.category}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
        />
        <button
          onClick={() => {
            onHashtag(Number(cateid), hashtag, setHashtag);
          }}
        >
          추가
        </button>
      </div>
    </div>
  );
};
