import styled from "styled-components";

// Wrapper: 광고 페이지 전체 영역
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f4f7fc; /* 더 부드러운 배경색 */
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  /* max-width: 600px; */
  margin: 50px auto;
  font-family: "Arial", sans-serif;
`;

// UploadLabel: 파일 선택 버튼 스타일
export const UploadLabel = styled.label`
  background-color: #64b5f6; /* 하늘색 */
  color: white;
  padding: 14px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  width: 100%;
  max-width: 250px;
  transition: background-color 0.3s ease;
  margin-bottom: 30px;
  display: block;
  text-decoration: none;
  box-sizing: border-box;
  margin-top: 20px;

  &:hover {
    background-color: #42a5f5;
  }

  &:active {
    background-color: #1e88e5;
  }
`;

// HiddenInput: 실제 파일 입력 요소는 숨기고 스타일링된 버튼을 사용
export const HiddenInput = styled.input`
  display: none;
`;

// PreviewWrapper: 이미지 미리보기 영역 스타일
export const PreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  /* margin-top: 20px; */
  border: 3px solid rgb(219, 221, 223);
  border-radius: 8px;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
