import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import { sidebarMenus } from "@/util/sideMenu";
import styled from "styled-components";

const { Sider } = Layout;

const CustomSider = styled(Sider)`
  background-color: #b0cfee !important;
  color: #fff;

  .ant-menu {
    background-color: transparent !important;
    color: #fff;
  }

  .ant-menu-item-selected {
    background-color: #d2e4f8 !important;
  }

  .ant-menu-item:hover {
    background-color: #d2e4f8 !important;
  }
`;
export const AdminSidebar = () => {
  const router = useRouter();

  return (
    <CustomSider width={200}>
      <Menu
        mode="inline"
        selectedKeys={[router.pathname]}
        defaultOpenKeys={["/users"]}
        style={{ height: "100%", borderRight: 0 }}
        items={sidebarMenus}
      />
    </CustomSider>
  );
};
