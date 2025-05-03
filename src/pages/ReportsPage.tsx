
import { Filter, Download } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductionChart from "@/components/reports/ProductionChart";
import ProductivityTable from "@/components/reports/ProductivityTable";
import QualityPieChart from "@/components/reports/QualityPieChart";
import ComparativeChart from "@/components/reports/ComparativeChart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency, formatWeight } from "@/lib/formatters";

export default function ReportsPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Visualize e analise dados de produção e desempenho
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Filter size={18} />
            <span>Filtrar</span>
          </Button>
          <Button variant="outline" className="gap-1">
            <Download size={18} />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Produção Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatWeight(2450)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              12% acima da meta anual
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Produção Média Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatWeight(204.2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              3% acima da média histórica
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Receita Estimada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(138500)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Preço médio: {formatCurrency(56.53)}/kg
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="producao" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="producao">Produção</TabsTrigger>
          <TabsTrigger value="produtividade">Produtividade</TabsTrigger>
          <TabsTrigger value="comparativo">Comparativo</TabsTrigger>
          <TabsTrigger value="qualidade">Qualidade</TabsTrigger>
        </TabsList>
        
        <TabsContent value="producao" className="space-y-4">
          <ProductionChart />
        </TabsContent>
        
        <TabsContent value="produtividade" className="space-y-4">
          <ProductivityTable />
        </TabsContent>
        
        <TabsContent value="comparativo" className="space-y-4">
          <ComparativeChart />
        </TabsContent>
        
        <TabsContent value="qualidade" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <QualityPieChart />
            
            <Card>
              <CardHeader>
                <CardTitle>Fatores de Qualidade</CardTitle>
                <CardDescription>Distribuição por fatores de qualidade</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <p className="mt-2 text-muted-foreground">
                    Detalhamento de fatores que afetam a qualidade dos lotes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
