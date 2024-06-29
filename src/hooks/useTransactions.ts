import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
} from "../services/database";
import { TransactionsData } from "../types/types";

const useTransactions = (page: number, status: string, type: string) => {
  return useQuery<TransactionsData, Error>(
    ["transactions", page, status, type],
    () => fetchTransactions(page, status, type)
  );
};
const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(addTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });
};

const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });
};

const useEditTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(editTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });
};

export {
  useTransactions,
  useAddTransaction,
  useDeleteTransaction,
  useEditTransaction,
};
