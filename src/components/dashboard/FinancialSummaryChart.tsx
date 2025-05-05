
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { animate } from '@/lib/animations';

// Sample data for financial chart
const financialData = {
  monthly: [
    { name: 'Jan', despesas: 4000, vendas: 6400, lucro: 2400 },
    { name: 'Fev', despesas: 3500, vendas: 5800, lucro: 2300 },
    { name: 'Mar', despesas: 5000, vendas: 8000, lucro: 3000 },
    { name: 'Abr', despesas: 4200, vendas: 7000, lucro: 2800 },
    { name: 'Mai', despesas: 3800, vendas: 6500, lucro: 2700 },
    { name: 'Jun', despesas: 4500, vendas: 7800, lucro: 3300 },
  ],
  quarterly: [
    { name: 'Q1', despesas: 12500, vendas: 20200, lucro: 7700 },
    { name: 'Q2', despesas: 12500, vendas: 21300, lucro: 8800 },
  ],
  annual: [
    { name: '2021', despesas: 45000, vendas: 65000, lucro: 20000 },
    { name: '2022', despesas: 48000, vendas: 72000, lucro: 24000 },
    { name: '2023', despesas: 25000, vendas: 41000, lucro: 16000 },
  ],
};

type PeriodType = 'monthly' | 'quarterly' | 'annual';
type ChartType = 'bar' | 'line';

export default function FinancialSummaryChart() {
  const [period, setPeriod] = useState<PeriodType>('monthly');
  const [chartType, setChartType] = useState<ChartType>('bar');

  const data = financialData[period];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-forest-600">{`Vendas: R$ ${payload[0].value.toLocaleString('pt-BR')}`}</p>
          <p className="text-destructive">{`Despesas: R$ ${payload[1].value.toLocaleString('pt-BR')}`}</p>
          <p className="text-amber-600">{`Lucro: R$ ${payload[2].value.toLocaleString('pt-BR')}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={animate({ variant: "scale-in", delay: "delay-300", className: "w-full hover-shadow" })}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Resumo Financeiro</CardTitle>
          <CardDescription>Evolução de despesas, vendas e lucro</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={chartType}
            onValueChange={(value) => setChartType(value as ChartType)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Barras</SelectItem>
              <SelectItem value="line">Linhas</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={period}
            onValueChange={(value) => setPeriod(value as PeriodType)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="quarterly">Trimestral</SelectItem>
              <SelectItem value="annual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-80 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="fill-muted-foreground text-xs" />
              <YAxis className="fill-muted-foreground text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="vendas" name="Vendas" fill="#3c9a4e" />
              <Bar dataKey="despesas" name="Despesas" fill="#ef4444" />
              <Bar dataKey="lucro" name="Lucro" fill="#ffa722" />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="fill-muted-foreground text-xs" />
              <YAxis className="fill-muted-foreground text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="vendas" name="Vendas" stroke="#3c9a4e" strokeWidth={2} />
              <Line type="monotone" dataKey="despesas" name="Despesas" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="lucro" name="Lucro" stroke="#ffa722" strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
