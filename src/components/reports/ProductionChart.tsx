
import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer } from '@/components/ui/chart';
import { DateRange } from 'react-day-picker';
import { isWithinInterval, parseISO } from 'date-fns';

// Sample data for production visualization with dates
const fullProductionData = {
  monthly: [
    { month: 'Jan', quantidade: 180, meta: 170, date: '2024-01-15' },
    { month: 'Fev', quantidade: 200, meta: 175, date: '2024-02-15' },
    { month: 'Mar', quantidade: 310, meta: 190, date: '2024-03-15' },
    { month: 'Abr', quantidade: 270, meta: 200, date: '2024-04-15' },
    { month: 'Mai', quantidade: 240, meta: 210, date: '2024-05-15' },
    { month: 'Jun', quantidade: 220, meta: 215, date: '2024-06-15' },
    { month: 'Jul', quantidade: 290, meta: 220, date: '2024-07-15' },
    { month: 'Ago', quantidade: 305, meta: 225, date: '2024-08-15' },
    { month: 'Set', quantidade: 250, meta: 230, date: '2024-09-15' },
    { month: 'Out', quantidade: 230, meta: 240, date: '2024-10-15' },
    { month: 'Nov', quantidade: 260, meta: 245, date: '2024-11-15' },
    { month: 'Dez', quantidade: 280, meta: 250, date: '2024-12-15' },
  ],
  quarterly: [
    { month: 'Q1', quantidade: 690, meta: 535, date: '2024-03-31' },
    { month: 'Q2', quantidade: 730, meta: 625, date: '2024-06-30' },
    { month: 'Q3', quantidade: 845, meta: 675, date: '2024-09-30' },
    { month: 'Q4', quantidade: 770, meta: 735, date: '2024-12-31' },
  ]
};

type Period = 'monthly' | 'quarterly';

const chartConfig = {
  quantidade: {
    theme: {
      light: "#3c9a4e",
      dark: "#4ade80",
    },
    label: "Quantidade (kg)",
  },
  meta: {
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24",
    },
    label: "Meta (kg)",
  }
};

interface ProductionChartProps {
  dateRange?: DateRange;
}

export default function ProductionChart({ dateRange }: ProductionChartProps) {
  const [period, setPeriod] = useState<Period>('monthly');

  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return fullProductionData[period];
    }

    return fullProductionData[period].filter(item => {
      const itemDate = parseISO(item.date);
      return isWithinInterval(itemDate, { 
        start: dateRange.from!, 
        end: dateRange.to || dateRange.from! 
      });
    });
  }, [period, dateRange]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Produção por Período</CardTitle>
          <CardDescription>Valores em kg com comparativo de metas</CardDescription>
        </div>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as Period)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Mensal</SelectItem>
            <SelectItem value="quarterly">Trimestral</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                formatter={(value, name) => {
                  return [
                    `${value} kg`, 
                    name === 'quantidade' ? 'Quantidade' : 'Meta'
                  ];
                }}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                }}
              />
              <Legend formatter={(value) => value === 'quantidade' ? 'Produção real' : 'Meta de produção'} />
              <Bar dataKey="quantidade" fill="var(--color-quantidade)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="meta" fill="var(--color-meta)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
