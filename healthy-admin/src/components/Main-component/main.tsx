import { useState, useEffect } from "react";
import axios from "axios";
import { HashCate } from "./hash";
import { AdminMenu } from "./menu";
import { MainWrap } from "./mainstyled";
import { Main } from "next/document";
import { IpLog } from "./iplog";
import { Chat } from "./test";
import { GoogleLogin } from "./login";
export const Admin = () => {
  const [selectMenu, setSelectMenu] = useState<string>("category");

  const clickMenu = (menu: string) => {
    setSelectMenu(menu);
  };
  return (
    <MainWrap>
      <AdminMenu MenuClick={clickMenu} />
      {selectMenu === "category" && <HashCate />}
      {selectMenu === "iplog" && <IpLog />}
      {selectMenu === "chat" && <Chat />}
      {selectMenu === "login" && <GoogleLogin />}
    </MainWrap>
  );
};
