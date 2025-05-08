
import { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatArea, formatPercentage } from '@/lib/formatters';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { isWithinInterval, parseISO } from 'date-fns';

// Sample data for productivity by area with enhanced metrics and dates
const fullProductivityData = [
  { 
    area: 'Área 1', 
    tamanho: 7.5, 
    arvores: 500, 
    producao: 150, 
    produtividade: 20.0, 
    produtividadeArvore: 0.3,
    eficiencia: 92, 
    variacao: 12,
    date: '2024-03-10' 
  },
  { 
    area: 'Área 2', 
    tamanho: 10, 
    arvores: 800, 
    producao: 200, 
    produtividade: 20.0, 
    produtividadeArvore: 0.25,
    eficiencia: 84, 
    variacao: 2,
    date: '2024-04-05' 
  },
  { 
    area: 'Área 3', 
    tamanho: 5.5, 
    arvores: 400, 
    producao: 90, 
    produtividade: 16.4, 
    produtividadeArvore: 0.225,
    eficiencia: 75, 
    variacao: -5,
    date: '2024-04-15' 
  },
  { 
    area: 'Área 4', 
    tamanho: 12.5, 
    arvores: 1000, 
    producao: 270, 
    produtividade: 21.6, 
    produtividadeArvore: 0.27,
    eficiencia: 96, 
    variacao: 14,
    date: '2024-04-25' 
  },
  { 
    area: 'Área 5', 
    tamanho: 8.0, 
    arvores: 650, 
    producao: 160, 
    produtividade: 20.0, 
    produtividadeArvore: 0.246,
    eficiencia: 88, 
    variacao: 3,
    date: '2024-05-10' 
  },
];

interface ProductivityTableProps {
  dateRange?: DateRange;
}

export default function ProductivityTable({ dateRange }: ProductivityTableProps) {
  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return fullProductivityData;
    }

    return fullProductivityData.filter(item => {
      const itemDate = parseISO(item.date);
      return isWithinInterval(itemDate, { 
        start: dateRange.from!, 
        end: dateRange.to || dateRange.from! 
      });
    });
  }, [dateRange]);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="bg-secondary/40 rounded-t-lg">
        <CardTitle className="text-xl">Produtividade por Área</CardTitle>
        <CardDescription>Análise detalhada de rendimento e eficiência</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <Table className="border-collapse">
            <TableHeader className="bg-muted/30">
              <TableRow className="border-b border-border/50 hover:bg-transparent">
                <TableHead className="font-medium text-foreground">Área</TableHead>
                <TableHead className="font-medium text-foreground">Tamanho</TableHead>
                <TableHead className="text-right font-medium text-foreground">Produção (kg)</TableHead>
                <TableHead className="text-right font-medium text-foreground">kg/ha</TableHead>
                <TableHead className="text-right font-medium text-foreground">kg/árvore</TableHead>
                <TableHead className="text-right font-medium text-foreground">Eficiência</TableHead>
                <TableHead className="text-right font-medium text-foreground">Variação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-medium border-b border-border/30">{row.area}</TableCell>
                  <TableCell className="border-b border-border/30">{formatArea(row.tamanho)}</TableCell>
                  <TableCell className="text-right border-b border-border/30">{row.producao}</TableCell>
                  <TableCell className="text-right font-medium border-b border-border/30 text-primary">
                    {row.produtividade.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right border-b border-border/30">
                    {row.produtividadeArvore.toFixed(3)}
                  </TableCell>
                  <TableCell className="text-right border-b border-border/30">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24 bg-muted/50 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${row.eficiencia}%` }}
                        />
                      </div>
                      <span className="font-medium min-w-12">{row.eficiencia}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right border-b border-border/30">
                    <div className="flex items-center justify-end gap-1">
                      {row.variacao > 0 ? (
                        <ArrowUpIcon className="h-4 w-4 text-green-600" />
                      ) : row.variacao < 0 ? (
                        <ArrowDownIcon className="h-4 w-4 text-red-600" />
                      ) : (
                        <MinusIcon className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={`font-medium ${
                        row.variacao > 0 
                          ? "text-green-600" 
                          : row.variacao < 0 
                            ? "text-red-600" 
                            : "text-gray-500"
                      }`}>
                        {formatPercentage(Math.abs(row.variacao))}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
