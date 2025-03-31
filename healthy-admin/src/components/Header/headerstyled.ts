import styled from "styled-components";

export const Header = styled.header<{ dark: String }>`
  background-color: ${({ dark }) => (dark === "true" ? "#2A2A2A" : "#F7F6F4")};
  color: ${({ dark }) => (dark === "true" ? "#fff" : "#000")};
  padding: 20px;
  text-align: left;
`;
