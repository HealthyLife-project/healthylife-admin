import { useState, useEffect } from "react";
import axios from "axios";
import { HashCateManager } from "./component/catehash";
import { AdminMenu } from "./component/menu";
import { MainWrap } from "./style/mainstyled";
import { Main } from "next/document";
import { IpLog } from "./component/iplog";
import { Chat } from "./component/test";
import { GoogleLogin } from "./login";
import { Report } from "./component/report";
import { AITEST } from "./component/ai";
import { Payment } from "./component/payment";
import { AiTest2 } from "./component/ai2";
import AdBanner from "./component/add";
export const Admin = () => {
  const [selectMenu, setSelectMenu] = useState<string>("category");

  const clickMenu = (menu: string) => {
    setSelectMenu(menu);
  };
  return (
    <MainWrap>
      <AdminMenu MenuClick={clickMenu} />
      {selectMenu === "category" && <HashCateManager />}
      {selectMenu === "iplog" && <IpLog />}
      {selectMenu === "chat" && <Chat />}
      {selectMenu === "add" && <AdBanner />}
      {selectMenu === "login" && <GoogleLogin />}
      {selectMenu === "report" && <Report />}
      {selectMenu === "ai" && <AITEST />}
      {selectMenu === "payment" && <Payment />}
      {selectMenu === "ai2" && <AiTest2 />}
    </MainWrap>
  );
};
