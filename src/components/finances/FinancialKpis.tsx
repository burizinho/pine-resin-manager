
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

function KpiCard({ title, value, change, icon }: KpiCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <span className="p-1 rounded-md bg-primary/10">{icon}</span>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center mt-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          <span>{isPositive ? '+' : ''}{change}% em relação ao período anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FinancialKpis() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <KpiCard 
        title="Receita Total" 
        value="R$ 138.500,00" 
        change={12} 
        icon={<DollarSign className="h-4 w-4 text-primary" />} 
      />
      <KpiCard 
        title="Despesas" 
        value="R$ 52.430,00" 
        change={-5} 
        icon={<DollarSign className="h-4 w-4 text-destructive" />} 
      />
      <KpiCard 
        title="Resultado" 
        value="R$ 86.070,00" 
        change={15} 
        icon={<PiggyBank className="h-4 w-4 text-primary" />} 
      />
      <KpiCard 
        title="Preço Médio" 
        value="R$ 56,53/kg" 
        change={5} 
        icon={<DollarSign className="h-4 w-4 text-amber-600" />} 
      />
    </div>
  );
}
