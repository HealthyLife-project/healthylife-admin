// HashtagManager.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FormContainer,
  Row,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  DelButton,
  BackButton,
} from "./styled";

interface CateOption {
  id: number;
  category: string;
}

interface CateHash {
  id: number;
  hash: string;
}

interface HashtagManagerProps {
  category: CateOption;
  onBack: () => void;
}

const HashtagManager = ({ category, onBack }: HashtagManagerProps) => {
  const [hashtag, setHashtag] = useState("");
  const [hashtags, setHashtags] = useState<CateHash[]>([]);

  const fetchHashtags = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/hashtag/hash/${category.id}`
      );
      setHashtags(res.data);
    } catch (error) {
      console.error("해시태그 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchHashtags();
  }, [category]);

  const onAddHashtag = async () => {
    if (!hashtag) {
      alert("해시태그를 입력하세요");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/hashtag/onHash", {
        hashtag,
        categoryId: category.id,
      });
      setHashtags((prev) => [...prev, res.data]);
      setHashtag("");
    } catch (error) {
      console.error("해시태그 추가 실패:", error);
    }
  };

  const onDeleteHashtag = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5001/hashtag/delHash/${id}`);
      setHashtags((prev) => prev.filter((h) => h.id !== id));
    } catch (error) {
      console.error("해시태그 삭제 실패:", error);
    }
  };

  return (
    <div>
      <h4 style={{ marginBottom: "10px" }}>카테고리: {category.category}</h4>
      <BackButton onClick={onBack}>뒤로 가기</BackButton>

      <FormContainer>
        <Row>
          <input
            style={{ padding: "10px" }}
            type="text"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onAddHashtag();
              }
            }}
            placeholder="해시태그 입력"
          />
          <Button onClick={onAddHashtag}>추가</Button>
        </Row>
      </FormContainer>

      <Table>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>해시태그</TableHeader>
            <TableHeader>작업</TableHeader>
          </tr>
        </thead>
        <tbody>
          {hashtags.map((hash) => (
            <TableRow key={hash.id}>
              <TableCell>{hash.id}</TableCell>
              <TableCell>{hash.hash}</TableCell>
              <TableCell>
                <DelButton onClick={() => onDeleteHashtag(hash.id)}>
                  삭제
                </DelButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HashtagManager;
