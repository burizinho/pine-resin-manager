
import { useMemo } from "react";
import { DateRange } from "react-day-picker";
import { 
  GaugeCircle, 
  BarChartBig, 
  CirclePercent,
  TrendingUp 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatWeight, formatPercentage } from "@/lib/formatters";

interface KpiCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
}

function KpiCard({ title, value, change, icon }: KpiCardProps) {
  const isPositive = change !== undefined ? change >= 0 : undefined;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
        <div className="text-2xl font-bold mt-2">{value}</div>
        {change !== undefined && (
          <div className={`flex items-center mt-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
            )}
            <span>{isPositive ? '+' : ''}{change}% em relação ao período anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ReportsKpisProps {
  dateRange?: DateRange;
}

// Dados simulados para os KPIs
const mockData = {
  currentPeriod: {
    totalProduction: 5840,
    averageQuality: 87,
    efficiency: 76,
    costPerKg: 42.5
  },
  previousPeriod: {
    totalProduction: 5230,
    averageQuality: 85,
    efficiency: 72,
    costPerKg: 44.2
  }
};

export default function ReportsKpis({ dateRange }: ReportsKpisProps) {
  // Calcular os dados dos KPIs com base no período selecionado
  const kpiData = useMemo(() => {
    // Aqui seria implementada a lógica real para filtrar dados por período
    // Por enquanto, usamos dados simulados
    const current = mockData.currentPeriod;
    const previous = mockData.previousPeriod;
    
    return {
      totalProduction: {
        value: formatWeight(current.totalProduction),
        change: ((current.totalProduction - previous.totalProduction) / previous.totalProduction) * 100
      },
      averageQuality: {
        value: formatPercentage(current.averageQuality),
        change: current.averageQuality - previous.averageQuality
      },
      efficiency: {
        value: formatPercentage(current.efficiency),
        change: current.efficiency - previous.efficiency
      },
      costPerKg: {
        value: `R$ ${current.costPerKg.toFixed(2)}/kg`,
        change: ((previous.costPerKg - current.costPerKg) / previous.costPerKg) * 100
      }
    };
  }, [dateRange]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <KpiCard 
        title="Produção Total" 
        value={kpiData.totalProduction.value} 
        change={Number(kpiData.totalProduction.change.toFixed(1))} 
        icon={<BarChartBig className="h-4 w-4" />} 
      />
      <KpiCard 
        title="Qualidade Média" 
        value={kpiData.averageQuality.value} 
        change={Number(kpiData.averageQuality.change.toFixed(1))} 
        icon={<CirclePercent className="h-4 w-4" />} 
      />
      <KpiCard 
        title="Eficiência" 
        value={kpiData.efficiency.value} 
        change={Number(kpiData.efficiency.change.toFixed(1))} 
        icon={<GaugeCircle className="h-4 w-4" />} 
      />
      <KpiCard 
        title="Custo por kg" 
        value={kpiData.costPerKg.value} 
        change={Number(kpiData.costPerKg.change.toFixed(1))} 
        icon={<TrendingUp className="h-4 w-4" />} 
      />
    </div>
  );
}
