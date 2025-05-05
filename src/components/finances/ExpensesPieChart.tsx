
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { animate } from '@/lib/animations';

// Sample data for expense categories
const expensesData = [
  { name: 'Mão de obra', value: 18500 },
  { name: 'Manutenção', value: 12400 },
  { name: 'Insumos', value: 9800 },
  { name: 'Equipamentos', value: 6200 },
  { name: 'Administrativo', value: 5530 },
];

const COLORS = ['#3c9a4e', '#4ade80', '#86efac', '#bbf7d0', '#dcfce7'];

export default function ExpensesPieChart() {
  const isMobile = useIsMobile();
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p>{`R$ ${payload[0].value.toLocaleString('pt-BR')}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={animate({ variant: "scale-in", delay: "delay-200", className: "hover-shadow" })}>
      <CardHeader>
        <CardTitle>Distribuição de Despesas</CardTitle>
        <CardDescription>Por categoria</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expensesData}
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 50 : 80}
              outerRadius={isMobile ? 80 : 120}
              paddingAngle={2}
              dataKey="value"
              label={isMobile ? undefined : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={!isMobile}
            >
              {expensesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend layout={isMobile ? "horizontal" : "vertical"} verticalAlign={isMobile ? "bottom" : "middle"} align={isMobile ? "center" : "right"} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
