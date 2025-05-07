
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatArea, formatPercentage } from '@/lib/formatters';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-react';

// Sample data for productivity by area with enhanced metrics
const productivityData = [
  { 
    area: 'Área 1', 
    tamanho: 7.5, 
    arvores: 500, 
    producao: 150, 
    produtividade: 20.0, 
    produtividadeArvore: 0.3,
    eficiencia: 92, 
    variacao: 12 
  },
  { 
    area: 'Área 2', 
    tamanho: 10, 
    arvores: 800, 
    producao: 200, 
    produtividade: 20.0, 
    produtividadeArvore: 0.25,
    eficiencia: 84, 
    variacao: 2 
  },
  { 
    area: 'Área 3', 
    tamanho: 5.5, 
    arvores: 400, 
    producao: 90, 
    produtividade: 16.4, 
    produtividadeArvore: 0.225,
    eficiencia: 75, 
    variacao: -5 
  },
  { 
    area: 'Área 4', 
    tamanho: 12.5, 
    arvores: 1000, 
    producao: 270, 
    produtividade: 21.6, 
    produtividadeArvore: 0.27,
    eficiencia: 96, 
    variacao: 14 
  },
  { 
    area: 'Área 5', 
    tamanho: 8.0, 
    arvores: 650, 
    producao: 160, 
    produtividade: 20.0, 
    produtividadeArvore: 0.246,
    eficiencia: 88, 
    variacao: 3 
  },
];

export default function ProductivityTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtividade por Área</CardTitle>
        <CardDescription>Análise detalhada de rendimento e eficiência</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Área</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead className="text-right">Produção (kg)</TableHead>
                <TableHead className="text-right">kg/ha</TableHead>
                <TableHead className="text-right">kg/árvore</TableHead>
                <TableHead className="text-right">Eficiência</TableHead>
                <TableHead className="text-right">Variação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productivityData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{row.area}</TableCell>
                  <TableCell>{formatArea(row.tamanho)}</TableCell>
                  <TableCell className="text-right">{row.producao}</TableCell>
                  <TableCell className="text-right font-medium">{row.produtividade.toFixed(1)}</TableCell>
                  <TableCell className="text-right">{row.produtividadeArvore.toFixed(3)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${row.eficiencia}%`, maxWidth: '100px' }}
                      />
                      <span>{row.eficiencia}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
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
