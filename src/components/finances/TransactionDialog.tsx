
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransactionForm } from "./TransactionForm";
import { Transaction } from "@/types";

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  onSave: (transaction: Partial<Transaction>) => void;
}

export function TransactionDialog({
  open,
  onOpenChange,
  transaction,
  onSave,
}: TransactionDialogProps) {
  const handleSave = (data: Partial<Transaction>) => {
    onSave(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {transaction ? "Editar Transação" : "Nova Transação"}
          </DialogTitle>
          <DialogDescription>
            {transaction
              ? "Atualize os detalhes da transação abaixo."
              : "Preencha os dados para adicionar uma nova transação."}
          </DialogDescription>
        </DialogHeader>

        <TransactionForm
          transaction={transaction || undefined}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
