import styled from "styled-components";

// 공통적인 버튼 스타일
export const Button = styled.button`
  background-color: #d2e4f8;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(174, 201, 232);
  }
`;

// 입력 폼을 감싸는 컨테이너
export const FormContainer = styled.div`
  margin: 20px 0;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 폼 내부 Row 스타일
export const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

// 테이블 스타일
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f1f1f1;
  }
`;

// 테이블 헤더 스타일
export const TableHeader = styled.th`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

// 테이블 데이터 행 스타일
export const TableRow = styled.tr`
  &:hover {
    background-color: #f4f4f4;
  }
`;

// 테이블 셀 스타일
export const TableCell = styled.td`
  font-size: 14px;
  color: #555;
`;

// 삭제 버튼 스타일
export const DelButton = styled(Button)`
  background-color: rgb(219, 210, 210);
  margin-left: 10px;
  &:hover {
    background-color: rgb(156, 153, 153);
  }
`;

// 뒤로 가기 버튼 스타일
export const BackButton = styled(Button)`
  background-color: #b0cfee;
  margin-top: 10px;
  &:hover {
    background-color: rgb(141, 174, 207);
  }
`;
