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
} from "@/components/Main-component/style/styled";

interface CateOption {
  id: number;
  category: string;
}

interface CategoryTableProps {
  onManage: (cate: CateOption) => void;
}

const CategoryTable = ({ onManage }: CategoryTableProps) => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<CateOption[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5001/hashtag/AllCate");
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
      const res = await axios.post("http://localhost:5001/hashtag/onCate", {
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
      await axios.delete(`http://localhost:5001/hashtag/delCate/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("카테고리 삭제 실패", error);
    }
  };

  return (
    <>
      <FormContainer>
        <h4>카테고리 추가</h4>
        <Row>
          <input
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
                <Button onClick={() => onManage(cate)}>관리</Button>
                <DelButton onClick={() => onCategoryDelete(cate.id)}>
                  삭제
                </DelButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CategoryTable;
