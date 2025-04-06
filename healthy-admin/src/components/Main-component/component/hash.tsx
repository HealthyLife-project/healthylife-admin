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
} from "../style/styled";
import HashtagManager from "./hashtag/hashtagManager";

interface CateOption {
  id: number;
  category: string;
}

export const HashCate = () => {
  const [category, setCategory] = useState(""); // 카테고리 입력값
  const [options, setOptions] = useState<CateOption[]>([]); // 카테고리 리스트
  const [selectedCate, setSelectedCate] = useState<CateOption | null>(null); // 선택된 카테고리

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5001/hashtag/AllCate");
      setOptions(res.data);
    } catch (error) {
      console.error("카테고리 불러오기 실패:", error);
    }
  };

  const onAddCategory = async () => {
    if (!category) {
      alert("카테고리를 입력하세요");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/hashtag/onCate", {
        category,
      });
      setOptions((prev) => [...prev, res.data]);
      setCategory("");
    } catch (error) {
      console.error("카테고리 추가 실패:", error);
    }
  };

  const onDeleteCategory = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5001/hashtag/delCate/${id}`);
      setOptions((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("카테고리 삭제 실패:", error);
    }
  };

  if (selectedCate) {
    return (
      <Container>
        <HashtagManager
          category={selectedCate}
          onBack={() => setSelectedCate(null)}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Title>카테고리 및 해시태그 관리</Title>

      <FormContainer>
        <h4>카테고리 추가</h4>
        <Row>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="카테고리 입력"
          />
          <Button onClick={onAddCategory}>추가</Button>
        </Row>
      </FormContainer>

      <Table>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>카테고리명</TableHeader>
            <TableHeader>작업</TableHeader>
          </tr>
        </thead>
        <tbody>
          {options.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <Button onClick={() => setSelectedCate(item)}>관리</Button>{" "}
                <DelButton onClick={() => onDeleteCategory(item.id)}>
                  삭제
                </DelButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
