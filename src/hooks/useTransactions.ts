import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
} from "../services/database";
import { Transaction } from "../types/types";

const useTransactions = (
  page: number,
  statusFilter: string,
  typeFilter: string
) => {
  return useQuery<Transaction[], Error>(
    ["transactions", page, statusFilter, typeFilter],
    () => fetchTransactions(page, statusFilter, typeFilter)
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
