import React, { useState } from "react";
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
  HStack,
  Text,
} from "@chakra-ui/react";
import ImportTransactions from "../ImportTransactions/ImportTransactions";
import ExportTransactions from "../ExportTransactions/ExportTransactions";
import EditTransactionModal from "../Modal/EditTransactionModal/EditTransactionModal";
import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal/DeleteConfirmationModal";
import {
  useTransactions,
  useAddTransaction,
  useDeleteTransaction,
  useEditTransaction,
} from "../../hooks/useTransactions";
import { Transaction } from "../../types/types";

const TransactionsTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 10;

  const {
    data: transactionsData,
    isLoading,
    error,
  } = useTransactions(currentPage, statusFilter, typeFilter);

  const { transactions = [], total = 0 } = transactionsData || {};

  const addTransaction = useAddTransaction();
  const deleteTransaction = useDeleteTransaction();
  const editTransaction = useEditTransaction();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleDelete = (id: number) => {
    deleteTransaction.mutate(id);
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedTransaction: Transaction) => {
    editTransaction.mutate(updatedTransaction);
    setIsEditModalOpen(false);
  };

  const totalPages = Math.ceil(total / transactionsPerPage);

  return (
    <Box>
      <ImportTransactions
        onImport={(data) =>
          data.forEach((transaction) => addTransaction.mutate(transaction))
        }
      />
      <ExportTransactions transactions={transactions} />
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
          {transactions.map((transaction: Transaction) => (
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
      <HStack mt={4} justifyContent="space-between">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
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
