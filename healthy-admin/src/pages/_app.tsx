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

export default function App({ Component, pageProps }: AppProps) {
  const [notPc, setNotPc] = useState(false);
  const router = useRouter();
  const [opener, setOpener] = useState(false);
  useEffect(() => {
    const token = getCookie("admin_token"); // 쿠키에서 "token" 값 가져오기
    if (token) {
      setOpener(true);
    } else {
      setOpener(false);
    }
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
          ) : (
            <LoginForm />
          )}
        </>
      )}
    </Provider>
  );
}
