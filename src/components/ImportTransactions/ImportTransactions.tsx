import React, { useState } from "react";
import Papa from "papaparse";
import { Input, Box, Text, Button } from "@chakra-ui/react";
import { CsvTransaction, Transaction } from "../../types/types";

const ImportTransactions = ({
  onImport,
}: {
  onImport: (data: Transaction[]) => void;
}) => {
  const [error, setError] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<CsvTransaction>(file, {
        header: true,
        complete: (results) => {
          const formattedData: Transaction[] = results.data.map((item) => ({
            id: Number(item.TransactionId),
            status: item.Status,
            type: item.Type,
            clientName: item.ClientName,
            amount: parseFloat(item.Amount.replace("$", "")),
          }));
          onImport(formattedData);
        },
        error: () => {
          setError("Error parsing CSV file.");
        },
      });
    }
  };

  return (
    <Box>
      <Button as="label" htmlFor="import-input">
        Import
      </Button>
      <Input
        id="import-input"
        type="file"
        accept=".csv"
        display="none"
        onChange={handleFileUpload}
      />
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};

export default ImportTransactions;
