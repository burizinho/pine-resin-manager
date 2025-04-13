
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip } from 'recharts';

// Sample data
const productivityData = [
  { name: 'Alta (>20kg/ha)', value: 35, color: '#3c9a4e' },
  { name: 'Média (10-20kg/ha)', value: 45, color: '#ffa722' },
  { name: 'Baixa (<10kg/ha)', value: 20, color: '#ef4444' },
];

export default function ProductivityCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Produtividade</CardTitle>
        <CardDescription>Distribuição por faixas de produtividade (kg/ha)</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={productivityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {productivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value) => [`${value}%`, 'Porcentagem']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
