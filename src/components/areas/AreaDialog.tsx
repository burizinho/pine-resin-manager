
import { Area } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AreaForm } from "@/components/forms/AreaForm";

interface AreaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area?: Area;
  onSave: (data: any) => void;
}

export function AreaDialog({ 
  open, 
  onOpenChange, 
  area, 
  onSave 
}: AreaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {area ? "Editar" : "Adicionar"} Área de Plantio
          </DialogTitle>
          <DialogDescription>
            Preencha os detalhes da área de plantio abaixo.
          </DialogDescription>
        </DialogHeader>
        <AreaForm
          area={area}
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
