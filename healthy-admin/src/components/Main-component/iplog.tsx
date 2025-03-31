import { TableWrapper, Table, Th, Td } from "./mainstyled";
import { useState, useEffect } from "react";
import axios from "axios";

export const IpLog = () => {
  const [log, setLog] = useState<any[]>([]);

  useEffect(() => {
    // axios 요청
    const LOG = async () => {
      try {
        const res = await axios.get("http://localhost:5001/log");
        setLog(res.data); //
      } catch (error) {
        console.error(error);
      }
    };

    LOG(); // 추가될 때 호출
  }, []);
  return (
    <>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>IP주소</Th>
              <Th>요청 URL</Th>
              <Th>TIMESTAMP</Th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {log.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.ipAddress === "::1"
                    ? "127.0.0.1"
                    : item.ipAddress.includes("127.0.0.1")
                    ? "127.0.0.1"
                    : item.ipAddress}
                </td>
                <td>{item.url}</td>
                <td>{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </>
  );
};
