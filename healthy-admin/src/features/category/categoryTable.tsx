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
} from "./styled";
import HashtagManager from "../hashtag/hashtagManager";
import api from "@/util/source";

interface CateOption {
  id: number;
  category: string;
}

const CategoryTable = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<CateOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CateOption | null>(
    null
  );

  const fetchCategories = async () => {
    try {
      const res = await api.get("/hashtag/AllCate");
      setCategories(res.data);
    } catch (error) {
      console.error("카테고리 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onCategoryAdd = async () => {
    if (!category) {
      alert("카테고리를 입력하세요");
      return;
    }

    try {
      const res = await api.post("/hashtag/onCate", {
        category,
      });
      setCategories((prev) => [...prev, res.data]);
      setCategory("");
    } catch (error) {
      console.error("카테고리 추가 실패", error);
    }
  };

  const onCategoryDelete = async (id: number) => {
    try {
      await api.delete(`/hashtag/delCate/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("카테고리 삭제 실패", error);
    }
  };

  const handleManageClick = (category: CateOption) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null); // 뒤로 가기 버튼 클릭 시 카테고리 목록으로 돌아가기
  };

  return (
    <div>
      {selectedCategory ? (
        <HashtagManager category={selectedCategory} onBack={handleBack} />
      ) : (
        <>
          <FormContainer>
            <h4 style={{ marginBottom: "12px" }}>카테고리 추가</h4>
            <Row>
              <input
                style={{ padding: "10px" }}
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onCategoryAdd();
                  }
                }}
                placeholder="카테고리 입력"
              />
              <Button onClick={onCategoryAdd}>추가</Button>
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
              {categories.map((cate) => (
                <TableRow key={cate.id}>
                  <TableCell>{cate.id}</TableCell>
                  <TableCell>{cate.category}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleManageClick(cate)}>
                      관리
                    </Button>
                    <DelButton onClick={() => onCategoryDelete(cate.id)}>
                      삭제
                    </DelButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default CategoryTable;
