import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
} from "@chakra-ui/react";
import ImportTransactions from "../ImportTransactions/ImportTransactions";
import ExportTransactions from "../ExportTransactions/ExportTransactions";
import EditTransactionModal from "../Modal/EditTransactionModal/EditTransactionModal";
import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal/DeleteConfirmationModal";
import { CsvTransaction, Transaction } from "../../types/types";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    setFilteredTransactions(
      transactions.filter(
        (transaction) =>
          (statusFilter ? transaction.status === statusFilter : true) &&
          (typeFilter ? transaction.type === typeFilter : true)
      )
    );
  }, [transactions, statusFilter, typeFilter]);

  const handleImport = (data: CsvTransaction[]) => {
    const formattedData = data.map((item) => ({
      id: Number(item.TransactionId),
      status: item.Status,
      type: item.Type,
      clientName: item.ClientName,
      amount: parseFloat(item.Amount.replace("$", "")),
    }));
    setTransactions(formattedData);
  };

  const handleDelete = (id: number) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
    setIsEditModalOpen(false);
  };

  return (
    <Box>
      <ImportTransactions onImport={handleImport} />
      <ExportTransactions transactions={filteredTransactions} />
      <Select
        placeholder="Filter by status"
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </Select>
      <Select
        placeholder="Filter by type"
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="Refill">Refill</option>
        <option value="Withdrawal">Withdrawal</option>
      </Select>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Status</Th>
            <Th>Type</Th>
            <Th>Client Name</Th>
            <Th>Amount</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredTransactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.id}</Td>
              <Td>{transaction.status}</Td>
              <Td>{transaction.type}</Td>
              <Td>{transaction.clientName}</Td>
              <Td>{transaction.amount}</Td>
              <Td>
                <Button onClick={() => handleEdit(transaction)}>Edit</Button>
                <Button
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        transaction={selectedTransaction}
        onSave={handleSave}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => handleDelete(selectedTransaction?.id ?? 0)}
      />
    </Box>
  );
};

export default TransactionsTable;
