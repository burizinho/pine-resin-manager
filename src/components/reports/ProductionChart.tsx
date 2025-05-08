
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-md">
          <p className="font-medium text-sm">{label}</p>
          <div className="mt-1 space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={`item-${index}`} className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="text-muted-foreground text-xs">
                  {entry.name === 'quantidade' ? 'Produção' : 'Meta'}:
                </span>
                <span className="font-medium">{`${entry.value} kg`}</span>
              </p>
            ))}
            <p className="text-xs text-muted-foreground mt-1 pt-1 border-t">
              {payload[0].value > payload[1].value ? 
                `${Math.round((payload[0].value/payload[1].value - 1) * 100)}% acima da meta` : 
                `${Math.round((1 - payload[0].value/payload[1].value) * 100)}% abaixo da meta`
              }
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between bg-secondary/40 rounded-t-lg">
        <div>
          <CardTitle className="text-xl">Produção por Período</CardTitle>
          <CardDescription>Valores em kg com comparativo de metas</CardDescription>
        </div>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as Period)}
        >
          <SelectTrigger className="w-[180px] border-primary/20 bg-background">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Mensal</SelectItem>
            <SelectItem value="quarterly">Trimestral</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[350px] pt-6">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={filteredData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barGap={4}
              barCategoryGap={16}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
              <XAxis 
                dataKey="month" 
                className="text-xs"
                axisLine={{ stroke: 'var(--muted)' }}
                tickLine={{ stroke: 'var(--muted)' }}
                tick={{ fill: 'var(--foreground)', fontSize: 12 }}
              />
              <YAxis 
                className="text-xs" 
                axisLine={{ stroke: 'var(--muted)' }}
                tickLine={{ stroke: 'var(--muted)' }}
                tick={{ fill: 'var(--foreground)', fontSize: 11 }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'var(--secondary)', opacity: 0.2 }}
              />
              <Legend 
                formatter={(value) => value === 'quantidade' ? 'Produção real' : 'Meta de produção'}
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: 15 }}
              />
              <Bar 
                dataKey="quantidade" 
                fill="var(--color-quantidade)" 
                radius={[4, 4, 0, 0]} 
                animationDuration={800}
                name="quantidade"
                maxBarSize={50}
              />
              <Bar 
                dataKey="meta" 
                fill="var(--color-meta)" 
                radius={[4, 4, 0, 0]} 
                animationDuration={800}
                animationBegin={200}
                name="meta"
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
