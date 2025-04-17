import HEAD from "@/features/header/header";
import NotPc from "@/features/notPc/notPc";
// import Template from "@/layouts/Template";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Provider } from "react-redux"; // Provider import
import store from "@/redux/store"; // Redux store import

export default function App({ Component, pageProps }: AppProps) {
  const [notPc, setNotPc] = useState(false);

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
          <Component {...pageProps} />
        </>
      )}
    </Provider>
  );
}
