export interface Transaction {
  id: number;
  status: string;
  type: string;
  clientName: string;
  amount: number;
}

export interface CsvTransaction {
  TransactionId: string;
  Status: string;
  Type: string;
  ClientName: string;
  Amount: string;
}
