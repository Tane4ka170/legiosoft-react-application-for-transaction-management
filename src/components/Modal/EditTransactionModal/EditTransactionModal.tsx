import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Transaction } from "../../../types/types";

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSave: (transaction: Transaction) => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>({
    defaultValues: transaction || undefined,
  });

  const onSubmit = (data: Transaction) => {
    if (transaction) {
      onSave({ ...transaction, status: data.status });
    }
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Transaction"
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText="Save"
    >
      <FormControl id="status" isInvalid={!!errors.status}>
        <FormLabel>Status</FormLabel>
        <Select {...register("status", { required: "Status is required" })}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Select>
        {errors.status && <p>{errors.status.message}</p>}
      </FormControl>
    </ModalWrapper>
  );
};

export default EditTransactionModal;
