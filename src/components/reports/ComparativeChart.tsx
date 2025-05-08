
import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRange } from 'react-day-picker';
import { isWithinInterval, parseISO } from 'date-fns';
import { ChartContainer } from '@/components/ui/chart';

// Sample data for comparative analysis with enhanced metrics and dates
const fullComparativeData = {
  production: [
    { name: '2022', atual: 1600, anterior: 1500, meta: 1550, date: '2022-12-31' },
    { name: '2023', atual: 1850, anterior: 1600, meta: 1700, date: '2023-12-31' },
    { name: '2024', atual: 2450, anterior: 1850, meta: 2000, date: '2024-05-15' },
  ],
  productivity: [
    { name: '2022', atual: 15.8, anterior: 15.0, meta: 15.5, date: '2022-12-31' },
    { name: '2023', atual: 17.5, anterior: 15.8, meta: 17.0, date: '2023-12-31' },
    { name: '2024', atual: 19.8, anterior: 17.5, meta: 19.0, date: '2024-05-15' },
  ],
  quality: [
    { name: '2022', atual: 68, anterior: 65, meta: 67, date: '2022-12-31' },
    { name: '2023', atual: 72, anterior: 68, meta: 70, date: '2023-12-31' },
    { name: '2024', atual: 78, anterior: 72, meta: 75, date: '2024-05-15' },
  ],
  efficiency: [
    { name: '2022', atual: 81, anterior: 78, meta: 80, date: '2022-12-31' },
    { name: '2023', atual: 84, anterior: 81, meta: 83, date: '2023-12-31' },
    { name: '2024', atual: 89, anterior: 84, meta: 86, date: '2024-05-15' },
  ]
};

const metricLabels = {
  production: 'Produção Total (kg)',
  productivity: 'Produtividade (kg/ha)',
  quality: 'Qualidade (%)',
  efficiency: 'Eficiência (%)'
};

const metricUnits = {
  production: 'kg',
  productivity: 'kg/ha',
  quality: '%',
  efficiency: '%'
};

type MetricType = 'production' | 'productivity' | 'quality' | 'efficiency';
type ViewMode = 'bar' | 'progress';

const chartConfig = {
  atual: {
    theme: {
      light: "#3c9a4e",
      dark: "#4ade80",
    },
    label: "Atual",
  },
  anterior: {
    theme: {
      light: "#9ca3af",
      dark: "#6b7280",
    },
    label: "Anterior",
  },
  meta: {
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24", 
    },
    label: "Meta",
  }
};

interface ComparativeChartProps {
  dateRange?: DateRange;
}

export default function ComparativeChart({ dateRange }: ComparativeChartProps) {
  const [metric, setMetric] = useState<MetricType>('production');
  const [viewMode, setViewMode] = useState<ViewMode>('bar');

  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return fullComparativeData[metric];
    }

    return fullComparativeData[metric].filter(item => {
      const itemDate = parseISO(item.date);
      return isWithinInterval(itemDate, { 
        start: dateRange.from!, 
        end: dateRange.to || dateRange.from! 
      });
    });
  }, [metric, dateRange]);

  // Calculate growth percentages for the current year if data exists
  const currentYearData = filteredData.length ? filteredData[filteredData.length - 1] : null;
  const vsLastYear = currentYearData ? ((currentYearData.atual - currentYearData.anterior) / currentYearData.anterior * 100).toFixed(1) : '0.0';
  const vsMeta = currentYearData ? ((currentYearData.atual - currentYearData.meta) / currentYearData.meta * 100).toFixed(1) : '0.0';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <div className="space-y-1.5 mt-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="text-muted-foreground text-xs">{entry.name}: </span>
                <span className="font-semibold">
                  {`${entry.value} ${metricUnits[metric as MetricType]}`}
                </span>
              </div>
            ))}
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
          <CardTitle className="text-xl">Análise Comparativa</CardTitle>
          <CardDescription>Evolução e comparação de desempenho</CardDescription>
        </div>
        <div className="flex gap-2 items-center">
          <Tabs defaultValue="bar" value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
            <TabsList className="grid w-[140px] grid-cols-2 h-8">
              <TabsTrigger value="bar" className="text-xs">Barras</TabsTrigger>
              <TabsTrigger value="progress" className="text-xs">Progresso</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select
            value={metric}
            onValueChange={(value) => setMetric(value as MetricType)}
          >
            <SelectTrigger className="w-[160px] border-primary/20 bg-background h-8">
              <SelectValue placeholder="Selecione uma métrica" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="production">Produção</SelectItem>
              <SelectItem value="productivity">Produtividade</SelectItem>
              <SelectItem value="quality">Qualidade</SelectItem>
              <SelectItem value="efficiency">Eficiência</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3 hover:shadow-sm transition-shadow bg-background/80">
            <div className="text-sm text-muted-foreground mb-1">Vs. Ano Anterior</div>
            <div className={`text-2xl font-bold ${Number(vsLastYear) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {vsLastYear}%
            </div>
          </div>
          <div className="rounded-lg border p-3 hover:shadow-sm transition-shadow bg-background/80">
            <div className="text-sm text-muted-foreground mb-1">Vs. Meta</div>
            <div className={`text-2xl font-bold ${Number(vsMeta) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {vsMeta}%
            </div>
          </div>
        </div>
        
        <div className="h-[320px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                barGap={4}
                barCategoryGap={30}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
                <XAxis 
                  dataKey="name"
                  tick={{ fill: 'var(--foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--muted)' }}
                  tickLine={{ stroke: 'var(--muted)' }}
                />
                <YAxis 
                  label={{ 
                    value: metricLabels[metric], 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { 
                      textAnchor: 'middle',
                      fill: 'var(--muted-foreground)',
                      fontSize: 12
                    }
                  }}
                  tick={{ fill: 'var(--foreground)', fontSize: 11 }}
                  axisLine={{ stroke: 'var(--muted)' }}
                  tickLine={{ stroke: 'var(--muted)' }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'var(--secondary)', opacity: 0.2 }}
                />
                <Legend 
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ paddingTop: 10 }}
                />
                {currentYearData && (
                  <ReferenceLine 
                    y={currentYearData.meta} 
                    stroke="var(--color-meta)" 
                    strokeDasharray="3 3" 
                    label={{
                      position: 'right',
                      value: 'Meta',
                      fill: 'var(--color-meta)',
                      fontSize: 10
                    }}
                  />
                )}
                <Bar 
                  name="Ano Atual" 
                  dataKey="atual" 
                  fill="var(--color-atual)"
                  radius={[4, 4, 0, 0]} 
                  animationDuration={800}
                  maxBarSize={60}
                />
                <Bar 
                  name="Ano Anterior" 
                  dataKey="anterior" 
                  fill="var(--color-anterior)" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={800}
                  animationBegin={200}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
