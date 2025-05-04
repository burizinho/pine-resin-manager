
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransactionForm } from "@/components/finances/TransactionForm";
import { Transaction } from "@/types";

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction | null;
  onSave: (data: Partial<Transaction>) => void;
}

export function TransactionDialog({ 
  open, 
  onOpenChange, 
  transaction, 
  onSave 
}: TransactionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {transaction ? "Editar" : "Adicionar"} Transação
          </DialogTitle>
          <DialogDescription>
            Informe os detalhes da transação abaixo.
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          transaction={transaction || undefined}
          onSubmit={(data) => {
            onSave(data);
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
