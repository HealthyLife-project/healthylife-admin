import { Layout } from "antd";
import { AdminSidebar } from "./AdminSidebar";
import ContentWrapper from "@/styles/contentWrapper";
const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}
const AdminLayout = ({ children }: Props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <Layout style={{ padding: "24px" }}>
        <ContentWrapper>{children}</ContentWrapper>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
