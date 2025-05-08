
import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import { isWithinInterval, parseISO } from 'date-fns';
import { ChartContainer } from '@/components/ui/chart';

// Sample data for quality distribution with dates
const fullQualityData = [
  { name: 'Premium', value: 45, color: '#3c9a4e', date: '2024-03-15' },
  { name: 'Padrão', value: 35, color: '#ffa722', date: '2024-04-10' },
  { name: 'Básica', value: 20, color: '#ef4444', date: '2024-05-05' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={13}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface QualityPieChartProps {
  dateRange?: DateRange;
}

const chartConfig = {
  premium: {
    theme: {
      light: "#3c9a4e",
      dark: "#4ade80",
    },
    label: "Premium",
  },
  padrao: {
    theme: {
      light: "#ffa722",
      dark: "#fbbf24",
    },
    label: "Padrão",
  },
  basica: {
    theme: {
      light: "#ef4444",
      dark: "#f87171",
    },
    label: "Básica",
  },
};

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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-sm">
          <p className="font-medium text-sm">{payload[0].name}</p>
          <p className="text-lg font-semibold">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="bg-secondary/40 rounded-t-lg">
        <CardTitle className="text-xl">Qualidade por Lote</CardTitle>
        <CardDescription>Classificação dos lotes produzidos</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] pt-6">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                innerRadius={60}
                paddingAngle={4}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
                animationBegin={200}
              >
                {filteredData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="var(--background)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: 15 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
