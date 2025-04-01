import { Header } from "./headerstyled";

export const HEAD = ({ dark }: { dark: string }) => {
  return (
    <Header dark={dark}>
      <div>Health Life Admin</div>
    </Header>
  );
};
