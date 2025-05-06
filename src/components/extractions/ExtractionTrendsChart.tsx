
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo } from 'react';
import { Extraction } from '@/types';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { animate } from '@/lib/animations';

interface ExtractionTrendsChartProps {
  extractions: Extraction[];
}

type TimeFrame = '3months' | '6months' | '12months' | 'all';

export default function ExtractionTrendsChart({ extractions }: ExtractionTrendsChartProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('6months');

  // Process data based on selected time frame
  const chartData = useMemo(() => {
    const now = new Date();
    let startDate: Date;
    
    switch(timeFrame) {
      case '3months':
        startDate = subMonths(now, 3);
        break;
      case '6months':
        startDate = subMonths(now, 6);
        break;
      case '12months':
        startDate = subMonths(now, 12);
        break;
      case 'all':
      default:
        // Find the earliest extraction date
        const dates = extractions.map(ext => new Date(ext.date));
        startDate = dates.length ? new Date(Math.min(...dates.map(d => d.getTime()))) : subMonths(now, 12);
    }
    
    // Generate month buckets from start date to current
    const months: Record<string, { month: string, quantity: number }> = {};
    let currentMonth = startOfMonth(startDate);
    const endMonth = endOfMonth(now);
    
    while (currentMonth <= endMonth) {
      const monthKey = format(currentMonth, 'yyyy-MM');
      months[monthKey] = {
        month: format(currentMonth, 'MMM yyyy'),
        quantity: 0
      };
      currentMonth = startOfMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    }
    
    // Aggregate extraction quantities by month
    extractions.forEach(extraction => {
      const extractionDate = typeof extraction.date === 'string' ? parseISO(extraction.date) : extraction.date;
      const monthKey = format(extractionDate, 'yyyy-MM');
      
      if (months[monthKey]) {
        months[monthKey].quantity += extraction.quantity;
      }
    });
    
    return Object.values(months);
  }, [extractions, timeFrame]);

  const chartConfig = {
    "quantity": {
      theme: {
        light: "#3c9a4e",
        dark: "#4ade80",
      },
      label: "Quantidade (kg)",
    }
  };

  return (
    <Card className={animate({ variant: "scale-in", delay: "delay-300", className: "w-full hover-shadow" })}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Evolução das Extrações</CardTitle>
          <CardDescription>Quantidade extraída ao longo do tempo</CardDescription>
        </div>
        <Select
          value={timeFrame}
          onValueChange={(value) => setTimeFrame(value as TimeFrame)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Últimos 3 meses</SelectItem>
            <SelectItem value="6months">Últimos 6 meses</SelectItem>
            <SelectItem value="12months">Último ano</SelectItem>
            <SelectItem value="all">Todo histórico</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                className="text-xs"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis className="text-xs" />
              <ChartTooltip
                content={
                  <ChartTooltipContent 
                    formatter={(value) => [`${value} kg`, 'Quantidade']}
                  />
                }
              />
              <Line 
                type="monotone" 
                dataKey="quantity" 
                stroke="var(--color-quantity)" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
