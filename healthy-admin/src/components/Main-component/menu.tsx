import React, { useState } from "react";
import { MainWrap, MainMenu, MenuList, MenuItem } from "./mainstyled";

interface AdminMenuProps {
  MenuClick: (menu: string) => void;
}
export const AdminMenu: React.FC<AdminMenuProps> = ({ MenuClick }) => {
  return (
    <MainWrap>
      <MainMenu>
        <MenuList>
          <MenuItem onClick={() => MenuClick("category")}>
            카테고리, 해쉬태그 관리
          </MenuItem>
          <MenuItem onClick={() => MenuClick("iplog")}>ip 로그</MenuItem>
          <MenuItem onClick={() => MenuClick("chat")}>chat</MenuItem>
          <MenuItem onClick={() => MenuClick("login")}>login</MenuItem>
        </MenuList>
      </MainMenu>
    </MainWrap>
  );
};
