import React from "react";
import { HStack, Button, Text } from "@chakra-ui/react";

interface TransactionsPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const TransactionsPagination: React.FC<TransactionsPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <HStack mt={4} justifyContent="center">
      <Button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>
      <Text mx="2">
        {currentPage} / {totalPages}
      </Text>
      <Button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </Button>
    </HStack>
  );
};

export default TransactionsPagination;
