// pages/reports/index.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/Main-component/style/styled";
import api from "@/util/source";
interface Report {
  id: number;
  report: string;
  reportCnt: number;
  timestamp: string;
  user: { name: string };
  reporter: { name: string };
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/report/get");
        setReports(res.data);
        console.log(res.data);
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
              <TableCell>{report.user.name}</TableCell>
              <TableCell>{report.reporter.name}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Reports;
