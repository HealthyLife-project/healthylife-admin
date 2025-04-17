import styled from "styled-components";

export const Header = styled.header`
  background-color: #d2e4f8;
  color: #000;
  padding: 20px;
  text-align: left;
  font-size: 30px;
  font-weight: bold;
`;

export const HeaderStyled = styled.div`
  &.headerOff {
    display: none;
  }
  color: black;
  background: #b0cfee;
  padding: 20px;
  height: 64px;
  /* border-bottom: 1px solid #333; */
  .navigation {
    font-size: 1.25rem;
    justify-content: space-between;
    align-items: center;
    display: flex;
    grid-gap: 0.75rem;
    .userDiv {
      grid-gap: 0.75rem;
      display: flex;
    }
  }
`;
