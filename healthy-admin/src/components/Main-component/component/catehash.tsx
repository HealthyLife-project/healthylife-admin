import { useState } from "react";
import CategoryTable from "./category/categoryTable";
import HashtagManager from "./hashtag/hashtagManager";
import { Container, Title } from "../style/styled";

interface CateOption {
  id: number;
  category: string;
}

export const HashCateManager = () => {
  const [selectedCategory, setSelectedCategory] = useState<CateOption | null>(
    null
  );

  return (
    <Container>
      <Title>기본 환경 설정</Title>
      <hr />

      {!selectedCategory ? (
        <CategoryTable onManage={(cate) => setSelectedCategory(cate)} />
      ) : (
        <HashtagManager
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
        />
      )}
    </Container>
  );
};
