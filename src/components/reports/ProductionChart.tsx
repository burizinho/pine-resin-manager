
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

// Sample data for production visualization
const productionData = [
  { month: 'Jan', quantidade: 180 },
  { month: 'Fev', quantidade: 200 },
  { month: 'Mar', quantidade: 310 },
  { month: 'Abr', quantidade: 270 },
  { month: 'Mai', quantidade: 240 },
  { month: 'Jun', quantidade: 220 },
  { month: 'Jul', quantidade: 290 },
  { month: 'Ago', quantidade: 305 },
  { month: 'Set', quantidade: 250 },
  { month: 'Out', quantidade: 230 },
  { month: 'Nov', quantidade: 260 },
  { month: 'Dez', quantidade: 280 },
];

const chartConfig = {
  quantidade: {
    theme: {
      light: "#3c9a4e",
      dark: "#4ade80",
    },
    label: "Quantidade (kg)",
  }
};

export default function ProductionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produção por Período</CardTitle>
        <CardDescription>Valores em kg nos últimos 12 meses</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                formatter={(value) => [`${value} kg`, 'Quantidade']}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                }}
              />
              <Bar dataKey="quantidade" fill="var(--color-quantidade)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
