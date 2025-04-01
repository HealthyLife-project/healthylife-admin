import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

// 제목 스타일
export const Title = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

// 입력 필드 및 버튼을 포함한 폼 스타일
export const FormContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Input과 Button을 한 줄에 배치
export const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// 테이블 스타일
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: left;
`;

export const TableHeader = styled.th`
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
`;

export const TableRow = styled.tr`
  border: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
  padding: 8px 15px;
  background-color: #e6e6e6;
  color: black;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgb(207, 201, 201);
  }
`;

export const DelButton = styled(Button)`
  background-color: #292929;
  color: white;
  &:hover {
    background-color: #292929;
  }
`;
