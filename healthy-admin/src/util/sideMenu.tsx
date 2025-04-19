// menuItems.ts
import { ReactNode } from "react";
import Link from "next/link";

export interface MenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  children?: MenuItem[];
}

export const sidebarMenus: MenuItem[] = [
  {
    key: "/users",
    label: "유저 관리",
    children: [
      {
        key: "/users/log",
        label: <Link href="/users/manage">회원 정보</Link>,
      },
      {
        key: "/users/report",
        label: <Link href="/users/report">신고</Link>,
      },
    ],
  },

  {
    key: "/hashtag",
    label: <Link href="/hashtag">해쉬태그 관리</Link>,
  },
  {
    key: "/adbanner",
    label: <Link href="/adbanner">광고 이미지 관리</Link>,
  },
];
