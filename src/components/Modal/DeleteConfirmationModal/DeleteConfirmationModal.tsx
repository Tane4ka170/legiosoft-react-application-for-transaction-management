import React from "react";
import ModalWrapper from "../ModalWrapper";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
      onSubmit={onDelete}
      submitButtonText="Delete"
    >
      <p>Are you sure you want to delete this transaction?</p>
    </ModalWrapper>
  );
};

export default DeleteConfirmationModal;
