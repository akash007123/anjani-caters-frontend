import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  itemName?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "this item"
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setIsDeleting(true);
      await onConfirm();
    } catch (error) {
      console.error("Failed to delete", error);
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Delete Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <span className="font-semibold text-slate-900">{itemName}</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmModal;