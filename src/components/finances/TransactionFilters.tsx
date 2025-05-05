
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { animate } from "@/lib/animations";
import { DateRange } from "react-day-picker";

type FiltersType = {
  search: string;
  type: 'receita' | 'despesa' | 'all';
  category: string;
  dateRange: DateRange | undefined;
  minAmount?: number;
  maxAmount?: number;
};

interface TransactionFiltersProps {
  onFilterChange: (filters: FiltersType) => void;
}

const expenseCategories = [
  "Mão de obra",
  "Manutenção",
  "Insumos",
  "Equipamentos",
  "Administrativo",
  "Operacional",
  "Pessoal",
  "Materiais",
  "Serviços",
  "Transporte",
  "Outros",
];

const revenueCategories = [
  "Vendas",
  "Serviços",
  "Investimentos",
  "Outros",
];

export function TransactionFilters({ onFilterChange }: TransactionFiltersProps) {
  const [filters, setFilters] = useState<FiltersType>({
    search: '',
    type: 'all',
    category: 'all',
    dateRange: undefined,
    minAmount: undefined,
    maxAmount: undefined,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTypeChange = (value: 'receita' | 'despesa' | 'all') => {
    // Reset category when type changes
    const newFilters = { ...filters, type: value, category: 'all' };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (value: string) => {
    const newFilters = { ...filters, category: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    const newFilters = { ...filters, dateRange: range };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmountChange = (field: 'minAmount' | 'maxAmount', value: string) => {
    const amount = value ? Number(value) : undefined;
    const newFilters = { ...filters, [field]: amount };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const newFilters: FiltersType = {
      search: '',
      type: 'all',
      category: 'all',
      dateRange: undefined,
      minAmount: undefined,
      maxAmount: undefined,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Get categories based on selected type
  const categories = filters.type === 'receita' 
    ? revenueCategories 
    : filters.type === 'despesa' 
      ? expenseCategories
      : [...revenueCategories, ...expenseCategories];

  return (
    <Card className={animate({ variant: "slide-in", delay: "delay-100" })}>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar transações..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          
          <Select
            value={filters.type}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tipo de transação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="receita">Receitas</SelectItem>
              <SelectItem value="despesa">Despesas</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.category}
            onValueChange={handleCategoryChange}
            disabled={categories.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                {filters.dateRange?.from ? (
                  filters.dateRange.to ? (
                    <>
                      {format(filters.dateRange.from, "dd/MM/yyyy")} -{" "}
                      {format(filters.dateRange.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(filters.dateRange.from, "dd/MM/yyyy")
                  )
                ) : (
                  "Selecionar período"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={filters.dateRange}
                onSelect={handleDateRangeChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline" onClick={handleClearFilters}>
            Limpar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
