import React from "react";
import { Select } from "@chakra-ui/react";

interface TransactionsFilterProps {
  setStatusFilter: (value: string) => void;
  setTypeFilter: (value: string) => void;
}

const TransactionsFilter: React.FC<TransactionsFilterProps> = ({
  setStatusFilter,
  setTypeFilter,
}) => {
  return (
    <>
      <Select
        placeholder="Status"
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </Select>
      <Select
        placeholder="Type"
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="Refill">Refill</option>
        <option value="Withdrawal">Withdrawal</option>
      </Select>
    </>
  );
};

export default TransactionsFilter;
