
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatArea } from '@/lib/formatters';

// Sample data for productivity by area
const productivityData = [
  { area: 'Área 1', tamanho: 7.5, arvores: 500, producao: 150, produtividade: 20.0, meta: '+12%' },
  { area: 'Área 2', tamanho: 10, arvores: 800, producao: 200, produtividade: 20.0, meta: '+2%' },
  { area: 'Área 3', tamanho: 5.5, arvores: 400, producao: 90, produtividade: 16.4, meta: '-5%' },
  { area: 'Área 4', tamanho: 12.5, arvores: 1000, producao: 270, produtividade: 21.6, meta: '+14%' },
  { area: 'Área 5', tamanho: 8.0, arvores: 650, producao: 160, produtividade: 20.0, meta: '+3%' },
];

export default function ProductivityTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtividade por Área</CardTitle>
        <CardDescription>Comparativo em kg/hectare</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Área</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Árvores</TableHead>
                <TableHead className="text-right">Produção (kg)</TableHead>
                <TableHead className="text-right">Produtividade (kg/ha)</TableHead>
                <TableHead className="text-right">Vs Meta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productivityData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{row.area}</TableCell>
                  <TableCell>{formatArea(row.tamanho)}</TableCell>
                  <TableCell>{row.arvores}</TableCell>
                  <TableCell className="text-right">{row.producao}</TableCell>
                  <TableCell className="text-right font-medium">{row.produtividade.toFixed(1)}</TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.meta.startsWith('+')
                        ? parseInt(row.meta) > 10 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {row.meta}
                    </span>
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
