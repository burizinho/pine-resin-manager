
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
import { Extraction } from "@/types";

interface DeleteExtractionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  extraction: Extraction | null;
  onConfirm: () => void;
}

export function DeleteExtractionDialog({
  open,
  onOpenChange,
  extraction,
  onConfirm,
}: DeleteExtractionDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir este registro de extração?
            {extraction && (
              <div className="mt-2 text-foreground">
                <span className="font-medium">Área:</span> {extraction.areaId}
                <br />
                <span className="font-medium">Data:</span>{" "}
                {new Date(extraction.date).toLocaleDateString("pt-BR")}
                <br />
                <span className="font-medium">Quantidade:</span> {extraction.quantity} kg
              </div>
            )}
            <div className="mt-2">
              Esta ação não pode ser desfeita.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
