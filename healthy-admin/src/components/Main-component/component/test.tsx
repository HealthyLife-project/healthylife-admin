import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:5001", {
  transports: ["websocket"],
});

export const Chat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [users, setUsers] = useState<string[]>([]);
  const [joined, setJoined] = useState(false); // 실제 입장 여부

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("받은메세지", data);
      setMessages((prev) => [...prev, data]);
    });

    socket.on("userList", (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userList");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { room, username, message });
      setMessage("");
    }
  };

  const joinRoom = () => {
    if (username.trim() && room.trim()) {
      socket.emit("joinRoom", { room });
      setJoined(true); // 채팅방 생성
    }
  };

  return (
    <div>
      {!joined ? (
        <div>
          <input
            type="text"
            placeholder="닉네임 입력"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="방 이름 입력"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>입장</button>
        </div>
      ) : (
        <div>
          <h2>채팅방: {room}</h2>

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
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                height: "200px",
                overflowY: "scroll",
              }}
            >
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
