import api from "@/util/source";
import { useState, useEffect } from "react";
import {
  TableWrapper,
  DelButton,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from "./styled";

interface UserInfo {
  id: number;
  userid: string;
  nickname: string;
  name: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  provider: string;
  reportCnt: number;
  premium: number;
  admin: number;
}

export default function ManageUsers() {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<UserInfo>>({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/user/findall");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleEdit = (user: UserInfo) => {
    setEditingUserId(user.id);
    setEditedUser(user);
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserInfo
  ) => {
    setEditedUser({ ...editedUser, [field]: e.target.value });
  };

  const handleSave = async (id: number) => {
    try {
      console.log("edited user", editedUser);
      await api.post(`/user/mypage/modify/${id}`, editedUser);
      setUserInfo((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...editedUser } : user))
      );
      setEditingUserId(null);
      setEditedUser({});
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/user/out/${id}`);
      setUserInfo((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columnGroups = [
    ["id", "userid", "nickname", "name"],
    ["age", "gender", "email", "phone"],
    ["address", "provider", "reportCnt", "premium", "admin"],
  ];

  const [currentColumnPage, setCurrentColumnPage] = useState(0);

  const headersMap: { [key: string]: string } = {
    id: "ID",
    userid: "UserID",
    nickname: "Nickname",
    name: "Name",
    age: "Age",
    gender: "Gender",
    email: "Email",
    phone: "Phone Number",
    address: "Address",
    provider: "Provider",
    reportCnt: "Number of Reports",
    premium: "Premium Subscription",
    admin: "Admin",
  };

  return (
    <div>
      <h1>유저 정보 관리표</h1>
      <TableWrapper>
        <Table>
          <thead>
            <TableRow>
              {columnGroups[currentColumnPage].map((key) => (
                <TableHeader key={key}>{headersMap[key]}</TableHeader>
              ))}
              <TableHeader className="actions">관리</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {userInfo.map((user) => (
              <TableRow key={user.id}>
                {columnGroups[currentColumnPage].map((key) => (
                  <TableCell key={key}>
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        value={(editedUser as any)[key] || ""}
                        onChange={(e) => handleChange(e, key as keyof UserInfo)}
                      />
                    ) : (
                      (user as any)[key]
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <div
                    className="actionsButtons"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {editingUserId === user.id ? (
                      <>
                        <Button onClick={() => handleSave(user.id)}>
                          저장
                        </Button>
                        <Button onClick={handleCancel}>취소</Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(user)}>수정</Button>
                        <DelButton onClick={() => handleDelete(user.id)}>
                          제거
                        </DelButton>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <div
        style={{
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        <Button
          onClick={() => setCurrentColumnPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentColumnPage === 0}
          style={{ marginRight: "1rem" }}
        >
          ◀ 이전
        </Button>
        <span>
          페이지 {currentColumnPage + 1} / {columnGroups.length}
        </span>
        <Button
          onClick={() =>
            setCurrentColumnPage((prev) =>
              Math.min(prev + 1, columnGroups.length - 1)
            )
          }
          disabled={currentColumnPage === columnGroups.length - 1}
          style={{ marginLeft: "1rem" }}
        >
          다음 ▶
        </Button>
      </div>
    </div>
  );
}
