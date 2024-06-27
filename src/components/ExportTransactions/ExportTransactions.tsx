import { Button } from "@chakra-ui/react";
import { CSVLink } from "react-csv";

interface Transaction {
  id: number;
  status: string;
  type: string;
  clientName: string;
  amount: number;
}

const ExportTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const headers = [
    { label: "Id", key: "id" },
    { label: "Status", key: "status" },
    { label: "Type", key: "type" },
    { label: "Client name", key: "clientName" },
    { label: "Amount", key: "amount" },
  ];

  return (
    <CSVLink data={transactions} headers={headers} filename="transactions.csv">
      <Button>Export</Button>
    </CSVLink>
  );
};

export default ExportTransactions;
