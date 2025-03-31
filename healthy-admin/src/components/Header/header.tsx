import { Header } from "./headerstyled";

export const HEAD = ({ dark }: { dark: string }) => {
  return (
    <Header dark={dark}>
      <div>Health coach service Admin</div>
    </Header>
  );
};
