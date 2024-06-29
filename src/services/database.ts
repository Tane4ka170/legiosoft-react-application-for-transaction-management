import alasql from "alasql";
import { Transaction } from "../types/types";

const initializeDatabase = () => {
  alasql(
    "CREATE TABLE transactions (id INT PRIMARY KEY AUTOINCREMENT, status STRING, type STRING, clientName STRING, amount NUMBER)"
  );
  alasql(
    "INSERT INTO transactions (status, type, clientName, amount) VALUES (?, ?, ?, ?)",
    ["Pending", "Refill", "John Doe", 100]
  );
  alasql(
    "INSERT INTO transactions (status, type, clientName, amount) VALUES (?, ?, ?, ?)",
    ["Completed", "Withdrawal", "Jane Doe", 200]
  );
};

initializeDatabase();

const fetchTransactions = (
  page: number,
  statusFilter: string,
  typeFilter: string
): Promise<Transaction[]> => {
  const offset = (page - 1) * 10;
  const result = alasql(
    `SELECT * FROM transactions WHERE (${
      statusFilter ? `status = '${statusFilter}'` : "1=1"
    }) AND (${
      typeFilter ? `type = '${typeFilter}'` : "1=1"
    }) LIMIT 10 OFFSET ${offset}`
  );
  return Promise.resolve(result as Transaction[]);
};

const addTransaction = (transaction: Transaction): Promise<void> => {
  alasql(
    "INSERT INTO transactions (status, type, clientName, amount) VALUES (?, ?, ?, ?)",
    [
      transaction.status,
      transaction.type,
      transaction.clientName,
      transaction.amount,
    ]
  );
  return Promise.resolve();
};

const deleteTransaction = (id: number): Promise<void> => {
  alasql("DELETE FROM transactions WHERE id = ?", [id]);
  return Promise.resolve();
};

const editTransaction = (transaction: Transaction): Promise<void> => {
  alasql(
    "UPDATE transactions SET status = ?, type = ?, clientName = ?, amount = ? WHERE id = ?",
    [
      transaction.status,
      transaction.type,
      transaction.clientName,
      transaction.amount,
      transaction.id,
    ]
  );
  return Promise.resolve();
};

export {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
};
