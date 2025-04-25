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
import LoadingSpinner from "@/components/loading/loading";

export default function App({ Component, pageProps }: AppProps) {
  const [notPc, setNotPc] = useState(false);
  const [opener, setOpener] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 추가
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 3초 기다림
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    api.get("/admin/check").then((res) => {
      setOpener(res.data.login);
    });
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      setNotPc(window.innerWidth <= 1200);
    };

    handleResize(); // 최초 1회 호출
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>Healthy-Admin</title>
      </Head>

      {loading ? (
        <LoadingSpinner />
      ) : notPc ? (
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
