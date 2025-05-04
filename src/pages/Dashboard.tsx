
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import AreaMap from '@/components/dashboard/AreaMap';
import RecentExtractionsTable from '@/components/dashboard/RecentExtractionsTable';
import FinancialSummaryChart from '@/components/dashboard/FinancialSummaryChart';
import ProductivityCard from '@/components/dashboard/ProductivityCard';
import { MapPin, TreePine, Droplet, DollarSign } from 'lucide-react';
import { DashboardStats } from '@/types';
import { formatCurrency, formatWeight, formatArea } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { useDemoNotifications } from '@/utils/demoNotifications';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAreas: 0,
    totalTrees: 0,
    totalExtraction: 0,
    monthlyRevenue: 0,
    monthlyExpenses: 0
  });
  
  const { addDemoNotifications } = useDemoNotifications();

  useEffect(() => {
    // In a real app, fetch stats from an API
    // For now, use mock data
    setStats({
      totalAreas: 12,
      totalTrees: 15000,
      totalExtraction: 2500,
      monthlyRevenue: 85000,
      monthlyExpenses: 35000
    });
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button onClick={addDemoNotifications}>
            Demonstrar Notificações
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Áreas de Plantio"
            value={stats.totalAreas}
            description={`Total de ${formatArea(350)}`}
            icon={<MapPin className="h-5 w-5" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Árvores Plantadas"
            value={stats.totalTrees.toLocaleString('pt-BR')}
            description="Densidade média: 43 árvores/ha"
            icon={<TreePine className="h-5 w-5" />}
          />
          <StatsCard
            title="Extração Mensal"
            value={formatWeight(stats.totalExtraction)}
            description="Média de 7.1 kg por árvore"
            icon={<Droplet className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Lucro Mensal"
            value={formatCurrency(stats.monthlyRevenue - stats.monthlyExpenses)}
            description={`Margem: ${Math.round(((stats.monthlyRevenue - stats.monthlyExpenses) / stats.monthlyRevenue) * 100)}%`}
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Map and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AreaMap />
          </div>
          <div className="space-y-6">
            <ProductivityCard />
            <RecentExtractionsTable />
          </div>
        </div>

        {/* Financial Chart */}
        <div className="w-full">
          <FinancialSummaryChart />
        </div>
      </div>
    </MainLayout>
  );
}
