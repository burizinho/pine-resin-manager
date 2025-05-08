
import { useState } from "react";
import { DateRange } from "react-day-picker";
import MainLayout from "@/components/layout/MainLayout";
import ProductionChart from "@/components/reports/ProductionChart";
import ProductivityTable from "@/components/reports/ProductivityTable";
import ComparativeChart from "@/components/reports/ComparativeChart";
import QualityPieChart from "@/components/reports/QualityPieChart";
import EfficiencyAnalysis from "@/components/reports/EfficiencyAnalysis";
import { DateRangeFilter } from "@/components/reports/DateRangeFilter";
import ReportsKpis from "@/components/reports/ReportsKpis";
import ProductivityTrends from "@/components/reports/ProductivityTrends";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1), // Jan 1st of current year
    to: new Date(),
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-7">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Relatórios</h1>
          <p className="text-muted-foreground">
            Acompanhe os indicadores de desempenho da produção de resina
          </p>
        </div>

        <div className="bg-secondary/40 p-4 rounded-lg shadow-sm">
          <DateRangeFilter onDateChange={handleDateChange} />
        </div>
        
        <ReportsKpis dateRange={dateRange} />

        <div className="bg-gradient-to-b from-secondary/20 to-transparent rounded-lg p-5 shadow-sm">
          <ProductivityTrends dateRange={dateRange} />
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          <div className="bg-gradient-to-br from-secondary/30 to-transparent p-5 rounded-lg shadow-sm">
            <ProductionChart dateRange={dateRange} />
          </div>
          <div className="bg-gradient-to-bl from-secondary/30 to-transparent p-5 rounded-lg shadow-sm">
            <ComparativeChart dateRange={dateRange} />
          </div>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          <div className="bg-gradient-to-tr from-secondary/30 to-transparent p-5 rounded-lg shadow-sm">
            <ProductivityTable dateRange={dateRange} />
          </div>
          <div className="bg-gradient-to-tl from-secondary/30 to-transparent p-5 rounded-lg shadow-sm">
            <QualityPieChart dateRange={dateRange} />
          </div>
        </div>

        <div className="w-full bg-gradient-to-t from-secondary/20 to-transparent p-5 rounded-lg shadow-sm">
          <EfficiencyAnalysis dateRange={dateRange} />
        </div>
      </div>
    </MainLayout>
  );
}
