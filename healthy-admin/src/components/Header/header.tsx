import { Header } from "./headerstyled";

export const HEAD = ({ dark }: { dark: boolean }) => {
  return (
    <Header dark={dark}>
      <div>Health coach service Admin</div>
    </Header>
  );
};
