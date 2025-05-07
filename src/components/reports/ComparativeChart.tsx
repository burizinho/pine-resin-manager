
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for comparative analysis with enhanced metrics
const comparativeData = {
  production: [
    { name: '2022', atual: 1600, anterior: 1500, meta: 1550 },
    { name: '2023', atual: 1850, anterior: 1600, meta: 1700 },
    { name: '2024', atual: 2450, anterior: 1850, meta: 2000 },
  ],
  productivity: [
    { name: '2022', atual: 15.8, anterior: 15.0, meta: 15.5 },
    { name: '2023', atual: 17.5, anterior: 15.8, meta: 17.0 },
    { name: '2024', atual: 19.8, anterior: 17.5, meta: 19.0 },
  ],
  quality: [
    { name: '2022', atual: 68, anterior: 65, meta: 67 },
    { name: '2023', atual: 72, anterior: 68, meta: 70 },
    { name: '2024', atual: 78, anterior: 72, meta: 75 },
  ],
  efficiency: [
    { name: '2022', atual: 81, anterior: 78, meta: 80 },
    { name: '2023', atual: 84, anterior: 81, meta: 83 },
    { name: '2024', atual: 89, anterior: 84, meta: 86 },
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

export default function ComparativeChart() {
  const [metric, setMetric] = useState<MetricType>('production');
  const [viewMode, setViewMode] = useState<ViewMode>('bar');

  const data = comparativeData[metric];

  // Calculate growth percentages for the current year
  const currentYearData = data[data.length - 1];
  const vsLastYear = ((currentYearData.atual - currentYearData.anterior) / currentYearData.anterior * 100).toFixed(1);
  const vsMeta = ((currentYearData.atual - currentYearData.meta) / currentYearData.meta * 100).toFixed(1);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Análise Comparativa</CardTitle>
          <CardDescription>Evolução e comparação de desempenho</CardDescription>
        </div>
        <div className="flex gap-2">
          <Tabs defaultValue="bar" value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
            <TabsList className="grid w-[160px] grid-cols-2">
              <TabsTrigger value="bar">Barras</TabsTrigger>
              <TabsTrigger value="progress">Progresso</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select
            value={metric}
            onValueChange={(value) => setMetric(value as MetricType)}
          >
            <SelectTrigger className="w-[160px]">
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
      <CardContent>
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            <div className="text-sm text-muted-foreground">Vs. Ano Anterior</div>
            <div className={`text-2xl font-bold ${Number(vsLastYear) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {vsLastYear}%
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm text-muted-foreground">Vs. Meta</div>
            <div className={`text-2xl font-bold ${Number(vsMeta) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {vsMeta}%
            </div>
          </div>
        </div>
        
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" />
              <YAxis 
                label={{ 
                  value: metricLabels[metric], 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }} 
              />
              <Tooltip 
                formatter={(value) => [
                  `${value} ${metricUnits[metric]}`, 
                  ''
                ]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                }}
              />
              <Legend />
              <ReferenceLine y={data[data.length-1].meta} stroke="#f59e0b" strokeDasharray="3 3" label="Meta" />
              <Bar name="Ano Atual" dataKey="atual" fill="#3c9a4e" />
              <Bar name="Ano Anterior" dataKey="anterior" fill="#9ca3af" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
