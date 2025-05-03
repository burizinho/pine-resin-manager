
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample data for comparative analysis
const comparativeData = {
  production: [
    { name: '2023', atual: 1850, anterior: 1700 },
    { name: '2024', atual: 2450, anterior: 1850 },
  ],
  productivity: [
    { name: '2023', atual: 17.5, anterior: 16.2 },
    { name: '2024', atual: 19.8, anterior: 17.5 },
  ],
  quality: [
    { name: '2023', atual: 72, anterior: 68 },
    { name: '2024', atual: 78, anterior: 72 },
  ]
};

type MetricType = 'production' | 'productivity' | 'quality';

const metricLabels = {
  production: 'Produção Total (kg)',
  productivity: 'Produtividade (kg/ha)',
  quality: 'Qualidade (%)'
};

export default function ComparativeChart() {
  const [metric, setMetric] = useState<MetricType>('production');

  const data = comparativeData[metric];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Comparativo Anual</CardTitle>
          <CardDescription>Evolução nos últimos anos</CardDescription>
        </div>
        <Select
          value={metric}
          onValueChange={(value) => setMetric(value as MetricType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione uma métrica" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="production">Produção</SelectItem>
            <SelectItem value="productivity">Produtividade</SelectItem>
            <SelectItem value="quality">Qualidade</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: metricLabels[metric], angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value) => [
                `${value} ${metric === 'productivity' ? 'kg/ha' : metric === 'quality' ? '%' : 'kg'}`, 
                ''
              ]}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)',
              }}
            />
            <Legend />
            <Bar name="Ano Atual" dataKey="atual" fill="#3c9a4e" />
            <Bar name="Ano Anterior" dataKey="anterior" fill="#9ca3af" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
