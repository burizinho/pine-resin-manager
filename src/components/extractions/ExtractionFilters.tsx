
import { useState } from "react";
import { Search, Filter, CalendarRange } from "lucide-react";
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FiltersType = {
  search: string;
  areaId: string;
  team: string;
  dateRange: DateRange | undefined;
  minQuantity?: number;
  maxQuantity?: number;
};

interface ExtractionFiltersProps {
  onFilterChange: (filters: FiltersType) => void;
  areas: Record<string, string>;
  teams: string[];
}

export function ExtractionFilters({ onFilterChange, areas, teams }: ExtractionFiltersProps) {
  const [filters, setFilters] = useState<FiltersType>({
    search: '',
    areaId: 'all',
    team: 'all',
    dateRange: undefined,
    minQuantity: undefined,
    maxQuantity: undefined,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAreaChange = (value: string) => {
    const newFilters = { ...filters, areaId: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTeamChange = (value: string) => {
    const newFilters = { ...filters, team: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    const newFilters = { ...filters, dateRange: range };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleQuantityChange = (field: 'minQuantity' | 'maxQuantity', value: string) => {
    const quantity = value ? Number(value) : undefined;
    const newFilters = { ...filters, [field]: quantity };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const newFilters: FiltersType = {
      search: '',
      areaId: 'all',
      team: 'all',
      dateRange: undefined,
      minQuantity: undefined,
      maxQuantity: undefined,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Card className={animate({ variant: "slide-in", delay: "delay-100" })}>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar extrações..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          
          <Select
            value={filters.areaId}
            onValueChange={handleAreaChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as áreas</SelectItem>
              {Object.entries(areas).map(([id, name]) => (
                <SelectItem key={id} value={id}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.team}
            onValueChange={handleTeamChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Equipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as equipes</SelectItem>
              {teams.map((team) => (
                <SelectItem key={team} value={team}>{team}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarRange className="mr-2 h-4 w-4" />
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Mais filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Quantidade (kg)</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="p-2">
                <div className="space-y-2">
                  <div className="grid grid-cols-3 items-center gap-1">
                    <label htmlFor="min-quantity" className="text-sm">Mínimo</label>
                    <Input
                      id="min-quantity"
                      type="number"
                      min={0}
                      placeholder="Min"
                      value={filters.minQuantity || ''}
                      onChange={(e) => handleQuantityChange('minQuantity', e.target.value)}
                      className="col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-1">
                    <label htmlFor="max-quantity" className="text-sm">Máximo</label>
                    <Input
                      id="max-quantity"
                      type="number"
                      min={0}
                      placeholder="Max"
                      value={filters.maxQuantity || ''}
                      onChange={(e) => handleQuantityChange('maxQuantity', e.target.value)}
                      className="col-span-2"
                    />
                  </div>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button 
                  variant="ghost" 
                  onClick={handleClearFilters}
                  className="w-full justify-center"
                >
                  Limpar filtros
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
