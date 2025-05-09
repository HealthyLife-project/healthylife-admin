// pages/reports/index.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/Main-component/style/styled";

interface Report {
  id: number;
  report: string;
  reportCnt: number;
  timestamp: string;
  user: { username: string };
  reporter: { username: string };
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5001/reports");
        setReports(response.data);
      } catch (error) {
        console.error("신고 내역 불러오기 실패", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h1>신고 내역</h1>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>신고 내용</TableHeader>
            <TableHeader>신고 횟수</TableHeader>
            <TableHeader>신고 시각</TableHeader>
            <TableHeader>신고당한 사람</TableHeader>
            <TableHeader>신고한 사람</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.report}</TableCell>
              <TableCell>{report.reportCnt}</TableCell>
              <TableCell>
                {new Date(report.timestamp).toLocaleString()}
              </TableCell>
              <TableCell>{report.user.username}</TableCell>
              <TableCell>{report.reporter.username}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Reports;
