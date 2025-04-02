import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:5001", {
  transports: ["websocket"],
});

export const Chat = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    // 메시지 수신 이벤트
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // 사용자 목록 업데이트 이벤트
    socket.on("userList", (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userList");
    };
  }, []);

  // 메시지 전송
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { username, message });
      setMessage("");
    }
  };

  // 사용자 등록
  const registerUser = () => {
    if (username.trim()) {
      socket.emit("registerUser", username);
    }
  };

  return (
    <div>
      {!username ? (
        <div>
          <input
            type="text"
            placeholder="닉네임 입력"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={registerUser}>입장</button>
        </div>
      ) : (
        <div>
          <div>
            <h3>접속 중인 사용자</h3>
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>채팅</h3>
            <div>
              {messages.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.username}: </strong> {msg.message}
                </p>
              ))}
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>전송</button>
          </div>
        </div>
      )}
    </div>
  );
};
