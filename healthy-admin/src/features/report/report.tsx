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
        console.error("Failed to fetch reports", error);
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
            <TableHeader>Report Content</TableHeader>
            <TableHeader>Report Count</TableHeader>
            <TableHeader>Reported Time</TableHeader>
            <TableHeader>Reported User</TableHeader>
            <TableHeader>Reporting User</TableHeader>
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
