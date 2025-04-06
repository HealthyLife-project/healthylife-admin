import styled from "styled-components";

export const BannerWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
`;

export const UploadLabel = styled.label`
  padding: 10px 20px;
  background: #0070f3;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  text-align: center;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const PreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
`;
