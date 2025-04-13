
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/formatters';

// Sample data for recent extractions
const recentExtractions = [
  {
    id: '1',
    area: 'Talhão 1',
    date: '2023-06-15',
    quantity: 120,
    team: 'Equipe A',
    status: 'completed',
  },
  {
    id: '2',
    area: 'Talhão 3',
    date: '2023-06-12',
    quantity: 85,
    team: 'Equipe B',
    status: 'completed',
  },
  {
    id: '3',
    area: 'Talhão 2',
    date: '2023-06-10',
    quantity: 95,
    team: 'Equipe A',
    status: 'completed',
  },
  {
    id: '4',
    area: 'Talhão 4',
    date: '2023-06-08',
    quantity: 110,
    team: 'Equipe C',
    status: 'completed',
  },
  {
    id: '5',
    area: 'Talhão 1',
    date: '2023-06-05',
    quantity: 125,
    team: 'Equipe A',
    status: 'completed',
  },
];

export default function RecentExtractionsTable() {
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      completed: 'bg-green-500',
      pending: 'bg-amber-500',
      cancelled: 'bg-red-500',
    };
    return statusMap[status] || 'bg-gray-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Extrações Recentes</CardTitle>
        <CardDescription>
          Últimas 5 extrações de resina registradas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Área</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Quantidade (kg)</TableHead>
              <TableHead>Equipe</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentExtractions.map((extraction) => (
              <TableRow key={extraction.id}>
                <TableCell className="font-medium">{extraction.area}</TableCell>
                <TableCell>{formatDate(new Date(extraction.date))}</TableCell>
                <TableCell>{extraction.quantity}</TableCell>
                <TableCell>{extraction.team}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className="capitalize"
                  >
                    <div 
                      className={`mr-1 h-2 w-2 rounded-full ${getStatusColor(extraction.status)}`}
                    />
                    {extraction.status === 'completed' ? 'Concluída' : extraction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
