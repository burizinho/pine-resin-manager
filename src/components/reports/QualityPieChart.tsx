
import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import { isWithinInterval, parseISO } from 'date-fns';

// Sample data for quality distribution with dates
const fullQualityData = [
  { name: 'Premium', value: 45, color: '#3c9a4e', date: '2024-03-15' },
  { name: 'Padrão', value: 35, color: '#ffa722', date: '2024-04-10' },
  { name: 'Básica', value: 20, color: '#ef4444', date: '2024-05-05' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface QualityPieChartProps {
  dateRange?: DateRange;
}

export default function QualityPieChart({ dateRange }: QualityPieChartProps) {
  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return fullQualityData;
    }

    return fullQualityData.filter(item => {
      const itemDate = parseISO(item.date);
      return isWithinInterval(itemDate, { 
        start: dateRange.from!, 
        end: dateRange.to || dateRange.from! 
      });
    });
  }, [dateRange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Qualidade por Lote</CardTitle>
        <CardDescription>Classificação dos lotes produzidos</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
