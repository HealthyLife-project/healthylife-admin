import styled from "styled-components";

export const Header = styled.header<{ dark: String }>`
  background-color: ${({ dark }) => (dark === "true" ? "#D2E4F8" : "#F7F6F4")};
  color: ${({ dark }) => (dark === "true" ? "#000" : "#000")};
  padding: 20px;
  text-align: left;
  font-size: 30px;
  font-weight: bold;
`;
