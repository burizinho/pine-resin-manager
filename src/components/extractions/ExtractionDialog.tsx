
import { Area, Extraction } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExtractionForm } from "@/components/forms/ExtractionForm";

interface ExtractionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  extraction?: Extraction;
  areas: Area[];
  onSave: (data: any) => void;
}

export function ExtractionDialog({
  open,
  onOpenChange,
  extraction,
  areas,
  onSave,
}: ExtractionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {extraction ? "Editar" : "Registrar"} Extração
          </DialogTitle>
          <DialogDescription>
            Preencha os detalhes da extração de resina abaixo.
          </DialogDescription>
        </DialogHeader>
        <ExtractionForm
          extraction={extraction}
          areas={areas}
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
