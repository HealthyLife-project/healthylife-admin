import styled from "styled-components";

export const MainWrap = styled.div`
  display: flex;
  gap: 5px;
`;

export const MainMenu = styled.div`
  min-height: 100vh;
  background-color: #d2e4f8;
  color: black;
  font-size: 14px;

  white-space: nowrap;
`;

export const MenuList = styled.ul`
  padding: 0;
  list-style: none;
  margin-top: 20px;
`;

export const MenuItem = styled.li`
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #444;
    color: #fff;
  }
`;

export const TableWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column; // 추가
  align-items: center; // 추가
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

export const Th = styled.th`
  /* background-color: #f4f4f4; */
  padding: 12px;
  text-align: left;
  font-weight: bold;
  color: #333;
`;

export const Td = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: #555;
`;
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 20px;
`;

// 페이지네이션 버튼
export const PageButton = styled.button<{ active?: boolean }>`
  padding: 6px 10px;
  background-color: ${({ active }) => (active ? "#1976d2" : "#f0f0f0")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};

  &:hover {
    background-color: ${({ active }) => (active ? "#1565c0" : "#ddd")};
  }
`;

// 정렬 버튼 (테이블 헤더에 들어가는 sort 아이콘용)
export const SortButton = styled.button`
  background: none;
  border: none;
  color: #333;
  margin-left: 5px;
  cursor: pointer;
  font-size: 12px;
  vertical-align: middle;

  &:hover {
    color: #1976d2;
  }
`;
