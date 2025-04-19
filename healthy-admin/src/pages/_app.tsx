import HEAD from "@/features/header/header";
import NotPc from "@/features/notPc/notPc";
// import Template from "@/layouts/Template";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux"; // Provider import
import store from "@/redux/store"; // Redux store import
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AdminLayout from "@/features/layouts/AdminLayout";
import LoginForm from "@/features/login/login";
import { getCookie } from "cookies-next";
import SignUp from "@/features/signup/signup";
import api from "@/util/source";

export default function App({ Component, pageProps }: AppProps) {
  const [notPc, setNotPc] = useState(false);
  const router = useRouter();
  const [opener, setOpener] = useState(false);
  const [signUp, setSignUp] = useState(false);

  useEffect(() => {
    api.get("/admin/check").then((res) => {
      if (res.data.login) setOpener(true);
      else setOpener(false);
    });
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setNotPc(true);
      } else {
        setNotPc(false);
      }
    };

    // 초기 width 확인
    handleResize();

    // resize 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>healthyAdmin</title>
      </Head>
      {notPc ? (
        <NotPc />
      ) : (
        <>
          <HEAD />
          {opener ? (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          ) : signUp ? (
            <SignUp />
          ) : (
            <LoginForm onSignUp={setSignUp} />
          )}
        </>
      )}
    </Provider>
  );
}
