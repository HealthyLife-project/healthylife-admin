import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/Main-component/style/styled";
import api from "@/util/source";
import { useState, useEffect } from "react";
import { TableWrapper } from "./styled";

interface UserInfo {
  id: number;
  userid: string;
  nickname: string;
  name: string;
  password: string;
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
      await api.put(`/user/update/${id}`, editedUser);
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

  return (
    <div>
      <h1>고객 정보 관리표</h1>
      <TableWrapper>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>UserID</TableHeader>
              <TableHeader>Nickname</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Password</TableHeader>
              <TableHeader>Age</TableHeader>
              <TableHeader>Gender</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone Number</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Provider</TableHeader>
              <TableHeader>Number of Reports</TableHeader>
              <TableHeader>Premium Subscription</TableHeader>
              <TableHeader>Admin</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {userInfo.map((user) => (
              <TableRow key={user.id}>
                {Object.entries(user).map(([key, value]) =>
                  key === "id" || key === "provider" ? (
                    <TableCell key={key}>{value}</TableCell>
                  ) : (
                    <TableCell key={key}>
                      {editingUserId === user.id ? (
                        <input
                          type="text"
                          value={(editedUser as any)[key] || ""}
                          onChange={(e) =>
                            handleChange(e, key as keyof UserInfo)
                          }
                        />
                      ) : (
                        (value as string)
                      )}
                    </TableCell>
                  )
                )}
                <TableCell>
                  {editingUserId === user.id ? (
                    <>
                      <button onClick={() => handleSave(user.id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </div>
  );
}
