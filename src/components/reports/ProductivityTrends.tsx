
import { useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { format, parseISO, isWithinInterval } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

// Dados simulados para a produtividade ao longo do tempo
const mockProductivityData = [
  { date: '2024-01-05', productivity: 18.5, efficiency: 72, quality: 81 },
  { date: '2024-01-15', productivity: 19.2, efficiency: 74, quality: 83 },
  { date: '2024-02-01', productivity: 17.8, efficiency: 71, quality: 80 },
  { date: '2024-02-15', productivity: 20.1, efficiency: 76, quality: 85 },
  { date: '2024-03-01', productivity: 21.2, efficiency: 78, quality: 86 },
  { date: '2024-03-15', productivity: 19.5, efficiency: 75, quality: 84 },
  { date: '2024-04-01', productivity: 22.0, efficiency: 79, quality: 88 },
  { date: '2024-04-15', productivity: 23.5, efficiency: 82, quality: 89 },
  { date: '2024-05-01', productivity: 24.1, efficiency: 84, quality: 91 },
];

type MetricType = 'productivity' | 'efficiency' | 'quality';

interface ProductivityTrendsProps {
  dateRange?: DateRange;
}

export default function ProductivityTrends({ dateRange }: ProductivityTrendsProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<MetricType[]>(['productivity']);

  // Filtrar dados com base no intervalo de datas
  const filteredData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return mockProductivityData;
    }

    return mockProductivityData.filter(item => {
      const itemDate = parseISO(item.date);
      return isWithinInterval(itemDate, { 
        start: dateRange.from!, 
        end: dateRange.to || dateRange.from! 
      });
    });
  }, [dateRange]);

  // Preparar dados para o gráfico
  const chartData = useMemo(() => {
    return filteredData.map(item => ({
      ...item,
      formattedDate: format(parseISO(item.date), 'dd/MM/yyyy')
    }));
  }, [filteredData]);

  const chartConfig = {
    productivity: {
      theme: {
        light: "#3c9a4e",
        dark: "#4ade80",
      },
      label: "Produtividade (kg/ha)",
    },
    efficiency: {
      theme: {
        light: "#2563eb",
        dark: "#3b82f6",
      },
      label: "Eficiência (%)",
    },
    quality: {
      theme: {
        light: "#f59e0b",
        dark: "#fbbf24",
      },
      label: "Qualidade (%)",
    }
  };

  const handleMetricChange = (value: string) => {
    const metrics = value.split(',') as MetricType[];
    setSelectedMetrics(metrics);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tendências de Produtividade</CardTitle>
          <CardDescription>Evolução dos indicadores ao longo do tempo</CardDescription>
        </div>
        <Select
          value={selectedMetrics.join(',')}
          onValueChange={handleMetricChange}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecionar métricas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="productivity">Produtividade</SelectItem>
            <SelectItem value="productivity,efficiency">Produtividade e Eficiência</SelectItem>
            <SelectItem value="productivity,quality">Produtividade e Qualidade</SelectItem>
            <SelectItem value="productivity,efficiency,quality">Todas as métricas</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="formattedDate" 
                className="text-xs"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis className="text-xs" />
              <ChartTooltip
                content={
                  <ChartTooltipContent />
                }
              />
              {selectedMetrics.includes('productivity') && (
                <Line 
                  type="monotone" 
                  name="Produtividade" 
                  dataKey="productivity" 
                  stroke="var(--color-productivity)" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
              {selectedMetrics.includes('efficiency') && (
                <Line 
                  type="monotone" 
                  name="Eficiência" 
                  dataKey="efficiency" 
                  stroke="var(--color-efficiency)" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
              {selectedMetrics.includes('quality') && (
                <Line 
                  type="monotone" 
                  name="Qualidade" 
                  dataKey="quality" 
                  stroke="var(--color-quality)" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
