
import MainLayout from "@/components/layout/MainLayout";
import ProductionChart from "@/components/reports/ProductionChart";
import ProductivityTable from "@/components/reports/ProductivityTable";
import ComparativeChart from "@/components/reports/ComparativeChart";
import QualityPieChart from "@/components/reports/QualityPieChart";
import EfficiencyAnalysis from "@/components/reports/EfficiencyAnalysis";

export default function ReportsPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Acompanhe os indicadores de desempenho da produção de resina
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProductionChart />
          <ComparativeChart />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProductivityTable />
          <QualityPieChart />
        </div>

        <div className="w-full">
          <EfficiencyAnalysis />
        </div>
      </div>
    </MainLayout>
  );
}
