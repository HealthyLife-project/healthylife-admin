import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Admin } from "@/components/Main-component/main";

const MainAdmin = () => {
  const { loggedIn } = useSelector((state: RootState) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);

  if (!loggedIn) {
    return null;
  }

  return <Admin />;
};

export default MainAdmin;
