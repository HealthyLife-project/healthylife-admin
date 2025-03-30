import MainAdmin from "@/features/Main/Main";
import { HEAD } from "@/components/Header/header";

export default function Home() {
  return (
    <>
      <HEAD dark={true} />
      <MainAdmin />
    </>
  );
}
