import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  font-size: 1rem;
  color: #2d2d2d;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
export const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  margin-left: 20px;
  padding: 15px;
  font-size: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 1rem;
  width: 250px;
  text-align: center;
  &:focus {
    outline: none;
    border-color: #d2e4f8;
  }
`;

export const ErrorMessage = styled.div`
  color: #c3a4a4;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

export const Button = styled.button`
  padding: 1rem;
  background-color: #d2e4f8;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #b0d4e6;
  }
`;
