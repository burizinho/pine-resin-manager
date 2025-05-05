
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { animate } from '@/lib/animations';

// Sample data for financial visualization
const financialData = {
  monthly: [
    { month: 'Jan', receitas: 22500, despesas: 8400 },
    { month: 'Fev', receitas: 19800, despesas: 7300 },
    { month: 'Mar', receitas: 25300, despesas: 9500 },
    { month: 'Abr', receitas: 23100, despesas: 8700 },
    { month: 'Mai', receitas: 21400, despesas: 8200 },
    { month: 'Jun', receitas: 24800, despesas: 9100 },
  ],
  quarterly: [
    { month: 'Q1', receitas: 67600, despesas: 25200 },
    { month: 'Q2', receitas: 69300, despesas: 26000 },
  ],
  yearly: [
    { month: '2023', receitas: 210000, despesas: 79000 },
    { month: '2024', receitas: 136900, despesas: 51200 },
  ],
};

type PeriodType = 'monthly' | 'quarterly' | 'yearly';

export default function RevenueExpenseChart() {
  const [period, setPeriod] = useState<PeriodType>('monthly');
  const isMobile = useIsMobile();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-green-600">{`Receitas: R$ ${payload[0].value.toLocaleString('pt-BR')}`}</p>
          <p className="text-red-600">{`Despesas: R$ ${payload[1].value.toLocaleString('pt-BR')}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={animate({ variant: "scale-in", delay: "delay-100", className: "hover-shadow" })}>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle>Receitas vs Despesas</CardTitle>
          <CardDescription>Comparativo por período</CardDescription>
        </div>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as PeriodType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Mensal (6 meses)</SelectItem>
            <SelectItem value="quarterly">Trimestral (2 trimestres)</SelectItem>
            <SelectItem value="yearly">Anual (2 anos)</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={financialData[period]} 
            margin={{ 
              top: 10, 
              right: isMobile ? 10 : 30, 
              left: isMobile ? -15 : 0, 
              bottom: 5 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" width={isMobile ? 30 : 50} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="receitas" name="Receitas" fill="#3c9a4e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="despesas" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
