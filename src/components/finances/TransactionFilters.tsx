
import { useState } from "react";
import { CalendarIcon, Search, X } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TransactionFiltersProps {
  onFilterChange: (filters: {
    search: string;
    type: string;
    category: string;
    dateRange: { from: Date | undefined; to: Date | undefined };
    minAmount: number | undefined;
    maxAmount: number | undefined;
  }) => void;
}

export function TransactionFilters({ onFilterChange }: TransactionFiltersProps) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);
  
  const applyFilters = () => {
    onFilterChange({
      search,
      type,
      category,
      dateRange,
      minAmount,
      maxAmount,
    });
  };
  
  const resetFilters = () => {
    setSearch("");
    setType("");
    setCategory("");
    setDateRange({ from: undefined, to: undefined });
    setMinAmount(undefined);
    setMaxAmount(undefined);
    
    onFilterChange({
      search: "",
      type: "",
      category: "",
      dateRange: { from: undefined, to: undefined },
      minAmount: undefined,
      maxAmount: undefined,
    });
  };

  // Count active filters for badge
  const activeFilterCount = [
    search, 
    type, 
    category, 
    dateRange.from, 
    dateRange.to, 
    minAmount, 
    maxAmount
  ].filter(Boolean).length;
  
  // Generate a description of active filters for accessibility
  const getActiveFiltersDescription = () => {
    const filters = [];
    if (search) filters.push(`Busca: ${search}`);
    if (type) filters.push(`Tipo: ${type}`);
    if (category) filters.push(`Categoria: ${category}`);
    if (dateRange.from) filters.push(`Data inicial: ${format(dateRange.from, "dd/MM/yyyy")}`);
    if (dateRange.to) filters.push(`Data final: ${format(dateRange.to, "dd/MM/yyyy")}`);
    if (minAmount) filters.push(`Valor mínimo: R$ ${minAmount}`);
    if (maxAmount) filters.push(`Valor máximo: R$ ${maxAmount}`);
    
    return filters.join(", ");
  };

  return (
    <div className="bg-card rounded-md border p-4 mb-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar transações..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-1 h-10">
                <CalendarIcon className="h-4 w-4" />
                <span>Período</span>
                {(dateRange.from || dateRange.to) && (
                  <Badge variant="secondary" className="ml-1">{dateRange.from && dateRange.to ? `${format(dateRange.from, "dd/MM")} - ${format(dateRange.to, "dd/MM")}` : "Parcial"}</Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="receita">Receitas</SelectItem>
              <SelectItem value="despesa">Despesas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas</SelectItem>
              <SelectItem value="Vendas">Vendas</SelectItem>
              <SelectItem value="Mão de obra">Mão de obra</SelectItem>
              <SelectItem value="Manutenção">Manutenção</SelectItem>
              <SelectItem value="Insumos">Insumos</SelectItem>
              <SelectItem value="Operacional">Operacional</SelectItem>
              <SelectItem value="Administrativo">Administrativo</SelectItem>
              <SelectItem value="Outros">Outros</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-1 h-10">
                <span>Valor</span>
                {(minAmount !== undefined || maxAmount !== undefined) && (
                  <Badge variant="secondary" className="ml-1">Definido</Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Faixa de valores</h4>
                  <p className="text-sm text-muted-foreground">
                    Filtre por faixa de valores
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="minAmount">Valor mínimo</Label>
                      <Input 
                        id="minAmount"
                        type="number" 
                        placeholder="R$ 0,00"
                        value={minAmount || ''}
                        onChange={(e) => setMinAmount(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="maxAmount">Valor máximo</Label>
                      <Input 
                        id="maxAmount"
                        type="number" 
                        placeholder="R$ 0,00"
                        value={maxAmount || ''}
                        onChange={(e) => setMaxAmount(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="flex gap-2">
            <Button variant="default" onClick={applyFilters} className="h-10">
              Aplicar
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
            {activeFilterCount > 0 && (
              <Button variant="outline" size="icon" onClick={resetFilters} title="Limpar filtros" className="h-10 w-10">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {activeFilterCount > 0 && (
        <div className="text-sm text-muted-foreground">
          <p>Filtros ativos: {getActiveFiltersDescription()}</p>
        </div>
      )}
    </div>
  );
}
