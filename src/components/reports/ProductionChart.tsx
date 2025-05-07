
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer } from '@/components/ui/chart';

// Sample data for production visualization
const productionData = {
  monthly: [
    { month: 'Jan', quantidade: 180, meta: 170 },
    { month: 'Fev', quantidade: 200, meta: 175 },
    { month: 'Mar', quantidade: 310, meta: 190 },
    { month: 'Abr', quantidade: 270, meta: 200 },
    { month: 'Mai', quantidade: 240, meta: 210 },
    { month: 'Jun', quantidade: 220, meta: 215 },
    { month: 'Jul', quantidade: 290, meta: 220 },
    { month: 'Ago', quantidade: 305, meta: 225 },
    { month: 'Set', quantidade: 250, meta: 230 },
    { month: 'Out', quantidade: 230, meta: 240 },
    { month: 'Nov', quantidade: 260, meta: 245 },
    { month: 'Dez', quantidade: 280, meta: 250 },
  ],
  quarterly: [
    { month: 'Q1', quantidade: 690, meta: 535 },
    { month: 'Q2', quantidade: 730, meta: 625 },
    { month: 'Q3', quantidade: 845, meta: 675 },
    { month: 'Q4', quantidade: 770, meta: 735 },
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

export default function ProductionChart() {
  const [period, setPeriod] = useState<Period>('monthly');

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
            <BarChart data={productionData[period]} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
