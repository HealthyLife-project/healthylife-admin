import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";

interface CateOption {
  id: number;
  category: string;
}

interface CateHash {
  id: number;
  hash: string;
  category: {};
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
    const res = await axios.post("http://localhost:5001/hashtag/onCate", {
      category,
    });

    console.log("카테고리 추가 성공:", res.data);

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
    const res = await axios.post("http://localhost:5001/hashtag/onHash", {
      hashtag,
      categoryId,
    });

    console.log("해쉬태그 추가 성공:", res.data);

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
  const [cHash, setChash] = useState<CateHash[]>([]);
  useEffect(() => {
    const cate = async () => {
      try {
        const res = await axios.get("http://localhost:5001/hashtag/AllCate");
        setOptions(res.data);
      } catch (error) {
        console.error("카테고리 불러오기 실패:", error);
      }
    };

    cate(); // 함수 호출
  }, []);

  function onSelect(v: number) {
    setSelect(v);
  }

  //category에 따른 hashtag 출력하기 위한 버튼
  async function cateBtn(id: Number) {
    try {
      const res = await axios.get(`http://localhost:5001/hashtag/hash/${id}`);

      setChash(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function delHash(id: Number) {
    try {
      const res = await axios.delete(
        `http://localhost:5001/hashtag/delHash/${id}`
      );
      if (res) {
        alert("삭제 성공");
        setChash(cHash.filter((item) => item.id !== id));
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error(error);
    }
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
      <div>
        {options.map((item) => {
          return (
            <button
              onClick={() => {
                cateBtn(item.id);
              }}
            >
              {item.category}
            </button>
          );
        })}
      </div>
      <ul>
        {cHash.map((item) => {
          return (
            <li>
              {item.hash}{" "}
              <button
                onClick={() => {
                  delHash(item.id);
                }}
              >
                제거
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
