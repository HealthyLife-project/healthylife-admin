import {
  TableWrapper,
  Table,
  Th,
  Td,
  SortButton,
  PaginationWrapper,
  PageButton,
} from "../style/mainstyled";
import { useState, useEffect } from "react";
import axios from "axios";

export const IpLog = () => {
  const [log, setLog] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [group, setGroup] = useState(0);
  const limit = 10;
  const maxButtons = 5;

  useEffect(() => {
    const getlog = async () => {
      try {
        const res = await axios.get("http://localhost:5001/log", {
          params: {
            page,
            limit,
          },
        });

        setLog(res.data.data);
        setTotal(res.data.total);
      } catch (error) {
        console.error(error);
      }
    };

    getlog();
  }, [page]);

  const totalPages = Math.ceil(total / limit);
  const PageGroup = () => {
    const start = group * maxButtons + 1;
    const end = Math.min(start + maxButtons - 1, totalPages);
    const pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

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
            {log.map((item, index) => (
              <tr key={index}>
                <Td>
                  {item.ipAddress === "::1" ||
                  item.ipAddress.includes("127.0.0.1")
                    ? "127.0.0.1"
                    : item.ipAddress}
                </Td>
                <Td>{item.url}</Td>
                <Td>{item.timestamp}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationWrapper>
          <PageButton
            onClick={() => {
              if (group > 0) {
                setGroup(group - 1);
                setPage((group - 1) * maxButtons + 1); // 첫 페이지로 이동
              }
            }}
            disabled={group === 0}
          >
            ◀
          </PageButton>

          {PageGroup().map((num) => (
            <PageButton
              key={num}
              onClick={() => setPage(num)}
              active={page === num}
            >
              {num}
            </PageButton>
          ))}

          <PageButton
            onClick={() => {
              const maxGroup = Math.floor((totalPages - 1) / maxButtons);
              if (group < maxGroup) {
                setGroup(group + 1);
                setPage((group + 1) * maxButtons + 1);
              }
            }}
            disabled={(group + 1) * maxButtons >= totalPages}
          >
            ▶
          </PageButton>
        </PaginationWrapper>
      </TableWrapper>
    </>
  );
};
