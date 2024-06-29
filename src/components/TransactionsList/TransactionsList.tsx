import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { Transaction } from "../../types/types";

interface TransactionsListProps {
  transactions: Transaction[];
  handleEdit: (transaction: Transaction) => void;
  setSelectedTransaction: (transaction: Transaction | null) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  handleEdit,
  setSelectedTransaction,
  setIsDeleteModalOpen,
}) => {
  return (
    <Table variant="striped" colorScheme="gray">
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
            <Td>{transaction.amount.toFixed(2)}</Td>
            <Td>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleEdit(transaction)}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                ml="2"
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
  );
};

export default TransactionsList;
