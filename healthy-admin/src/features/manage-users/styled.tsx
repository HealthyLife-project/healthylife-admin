// styled.ts (기존의 테이블 스타일 재사용)
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px; /* Ensures the table takes enough width for scrolling */

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

export const TableHeader = styled.th`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f4f4f4;
  }
`;

export const TableCell = styled.td`
  font-size: 14px;
  color: #555;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
`;
