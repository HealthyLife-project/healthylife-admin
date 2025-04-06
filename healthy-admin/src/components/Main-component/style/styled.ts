import styled from "styled-components";

// 전체 페이지 컨테이너
export const Container = styled.div`
  padding: 30px;
  font-family: "Arial", sans-serif;
  background-color: #fafafa;
  min-height: 100vh;
`;

// 페이지 제목
export const Title = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: #222;
`;

// 입력/버튼 묶음
export const FormContainer = styled.div`
  margin-bottom: 20px;
`;

// 한 줄 배치 (입력 + 버튼)
export const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

// 테이블
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHeader = styled.th`
  padding: 12px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  text-align: left;
  font-weight: bold;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

// 기본 버튼
export const Button = styled.button`
  padding: 8px 14px;
  background-color: #e2e2e2;
  color: #000;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #d0d0d0;
  }
`;

// 삭제 버튼
export const DelButton = styled(Button)`
  background-color: #d2e4f8;
  color: #fff;

  &:hover {
    background-color: #d2e4f8;
    filter: brightness(0.9);
  }
`;

// 뒤로 가기 버튼
export const BackButton = styled(Button)`
  margin-bottom: 20px;
  background-color: #666;
  color: #fff;

  &:hover {
    background-color: #444;
  }
`;
