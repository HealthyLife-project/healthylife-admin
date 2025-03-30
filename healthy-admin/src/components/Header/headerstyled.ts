import styled from "styled-components";

export const Header = styled.header<{ dark: boolean }>`
  background-color: ${({ dark }) => (dark ? "#2A2A2A" : "#F7F6F4")};
  color: ${({ dark }) => (dark ? "#fff" : "#000")};
  padding: 20px;
  text-align: left;
`;
