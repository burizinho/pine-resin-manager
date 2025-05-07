
import { useState } from "react";
import { DateRange } from "react-day-picker";
import MainLayout from "@/components/layout/MainLayout";
import ProductionChart from "@/components/reports/ProductionChart";
import ProductivityTable from "@/components/reports/ProductivityTable";
import ComparativeChart from "@/components/reports/ComparativeChart";
import QualityPieChart from "@/components/reports/QualityPieChart";
import EfficiencyAnalysis from "@/components/reports/EfficiencyAnalysis";
import { DateRangeFilter } from "@/components/reports/DateRangeFilter";

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
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Acompanhe os indicadores de desempenho da produção de resina
          </p>
        </div>

        <DateRangeFilter onDateChange={handleDateChange} />

        <div className="grid gap-6 md:grid-cols-2">
          <ProductionChart dateRange={dateRange} />
          <ComparativeChart dateRange={dateRange} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProductivityTable dateRange={dateRange} />
          <QualityPieChart dateRange={dateRange} />
        </div>

        <div className="w-full">
          <EfficiencyAnalysis dateRange={dateRange} />
        </div>
      </div>
    </MainLayout>
  );
}
