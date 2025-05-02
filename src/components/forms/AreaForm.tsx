
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Area } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  size: z.coerce.number().positive(),
  plantingDate: z.date(),
  treeCount: z.coerce.number().int().positive(),
  pineType: z.string().min(2),
  notes: z.string().optional(),
  status: z.enum(["plantio", "crescimento", "extracao", "colheita"]),
});

type FormValues = z.infer<typeof formSchema>;

interface AreaFormProps {
  area?: Area;
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

export function AreaForm({ area, onSubmit, onCancel }: AreaFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: area
      ? {
          ...area,
          plantingDate: new Date(area.plantingDate),
        }
      : {
          name: "",
          latitude: 0,
          longitude: 0,
          size: 0,
          plantingDate: new Date(),
          treeCount: 0,
          pineType: "",
          notes: "",
          status: "plantio" as const,
        },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      onSubmit(values);
      toast({
        title: area ? "Área atualizada" : "Área criada",
        description: `A área ${values.name} foi ${
          area ? "atualizada" : "criada"
        } com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao salvar área:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar os dados da área.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Área</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome da área" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="plantio">Plantio</SelectItem>
                    <SelectItem value="crescimento">Crescimento</SelectItem>
                    <SelectItem value="extracao">Extração</SelectItem>
                    <SelectItem value="colheita">Colheita</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.000001"
                    placeholder="Digite a latitude"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.000001"
                    placeholder="Digite a longitude"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tamanho (hectares)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Digite o tamanho"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plantingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Plantio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="treeCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Árvores</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o número de árvores"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pineType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Pinheiro</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de pinheiro" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pinus Elliottii">Pinus Elliottii</SelectItem>
                    <SelectItem value="Pinus Taeda">Pinus Taeda</SelectItem>
                    <SelectItem value="Pinus Caribaea">Pinus Caribaea</SelectItem>
                    <SelectItem value="Pinus Oocarpa">Pinus Oocarpa</SelectItem>
                    <SelectItem value="Pinus Patula">Pinus Patula</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite observações sobre a área"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Informações adicionais sobre esta área de plantio.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">{area ? "Atualizar" : "Criar"} Área</Button>
        </div>
      </form>
    </Form>
  );
}
