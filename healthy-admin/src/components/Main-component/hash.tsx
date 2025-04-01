import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Title,
  FormContainer,
  Row,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  DelButton,
} from "./styled";

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
  setHashtag: React.Dispatch<React.SetStateAction<string>>
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
    setHashtag("");
  } catch (error) {
    console.error("해쉬태그 추가 실패:", error);
  }
};

export const HashCate = () => {
  const [category, setCategory] = useState(""); // category input
  const [hashtag, setHashtag] = useState(""); // hashtag input
  const [options, setOptions] = useState<CateOption[]>([]); // options select value
  const [cateid, setSelect] = useState<number>(1);
  const [cHash, setChash] = useState<CateHash[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5001/hashtag/AllCate");
        setOptions(res.data);
      } catch (error) {
        console.error("카테고리 불러오기 실패:", error);
      }
    };
    loadCategories();
  }, []);

  const onSelect = (v: number) => {
    setSelect(v);
  };

  const cateBtn = async (id: Number) => {
    try {
      const res = await axios.get(`http://localhost:5001/hashtag/hash/${id}`);
      setChash(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const delHash = async (id: Number) => {
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
  };

  return (
    <Container>
      <Title>기본 환경 설정</Title>
      <hr />

      {/* 카테고리 추가 */}
      <FormContainer>
        <h4>카테고리 추가</h4>
        <Row>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="카테고리 입력"
          />
          <Button onClick={() => onCategory(category, setCategory)}>
            추가
          </Button>
        </Row>
      </FormContainer>

      {/* 해시태그 추가 */}
      <FormContainer>
        <h4>해시태그 추가</h4>
        <Row>
          <select
            value={cateid}
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
            placeholder="해시태그 입력"
          />
          <Button
            onClick={() => onHashtag(Number(cateid), hashtag, setHashtag)}
          >
            추가
          </Button>
        </Row>
      </FormContainer>

      {/* 카테고리 선택 버튼 */}
      <div>
        {options.map((item) => (
          <Button key={item.id} onClick={() => cateBtn(item.id)}>
            {item.category}
          </Button>
        ))}
      </div>

      {/* 해시태그 테이블 */}
      <Table>
        <thead>
          <tr>
            <TableHeader>해시태그</TableHeader>
            <TableHeader>작업</TableHeader>
          </tr>
        </thead>
        <tbody>
          {cHash.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.hash}</TableCell>
              <TableCell>
                <DelButton onClick={() => delHash(item.id)}>제거</DelButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
