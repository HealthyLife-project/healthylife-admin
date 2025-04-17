// styled/loginStyles.ts
import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f0f4f8;
  height: 100vh;
`;

export const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

export const LoginLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.3rem;
`;

export const LoginInput = styled.input`
  padding: 0.75rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-align: center;
  &:focus {
    border-color: #d2e4f8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(210, 228, 248, 0.4);
  }
`;
export const LoginInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LoginError = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: -0.5rem;
`;

export const LoginButton = styled.button`
  padding: 0.9rem;
  background-color: #b0cfee;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d2e4f8;
  }
`;
export const SignUpButton = styled.div`
  padding: 0.9rem;
  background-color: #b0cfee;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d2e4f8;
  }
`;
