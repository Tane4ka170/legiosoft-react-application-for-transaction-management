import alasql from "alasql";
import { Transaction } from "../types/types";

const initializeDatabase = () => {
  alasql(
    "CREATE TABLE transactions (id INT PRIMARY KEY AUTOINCREMENT, status STRING, type STRING, clientName STRING, amount NUMBER)"
  );
};

initializeDatabase();

const fetchTransactions = (
  page: number,
  statusFilter: string,
  typeFilter: string
): Promise<{ transactions: Transaction[]; total: number }> => {
  const offset = (page - 1) * 10;
  const whereClause = `WHERE ${
    statusFilter ? `status = '${statusFilter}'` : "1=1"
  } AND ${typeFilter ? `type = '${typeFilter}'` : "1=1"}`;

  const transactions = alasql(
    `SELECT * FROM transactions ${whereClause} LIMIT 10 OFFSET ${offset}`
  );

  const total = alasql(
    `SELECT VALUE COUNT(*) FROM transactions ${whereClause}`
  );

  return Promise.resolve({
    transactions: transactions as Transaction[],
    total,
  });
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
