import { useState } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
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
import TransactionsList from "../TransactionsList/TransactionsList";
import TransactionsPagination from "../TransactionsPagination/TransactionsPagination";
import TransactionsFilter from "../TransactionsFilter/TransactionsFilter";

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
      <HStack spacing="4" mb="4" alignItems="center">
        <Box minW="200px" borderWidth="1px" borderRadius="md" p="2">
          <Text fontWeight="bold" mb="2">
            Transactions
          </Text>
        </Box>
        <TransactionsFilter
          setStatusFilter={setStatusFilter}
          setTypeFilter={setTypeFilter}
        />
        <ImportTransactions
          onImport={(data) =>
            data.forEach((transaction) => addTransaction.mutate(transaction))
          }
        />
        <ExportTransactions transactions={transactions} />
      </HStack>
      <TransactionsList
        transactions={transactions}
        handleEdit={handleEdit}
        setSelectedTransaction={setSelectedTransaction}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <TransactionsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
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
