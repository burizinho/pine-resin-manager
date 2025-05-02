
import { BarChart3, Download, Filter } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      <Tabs defaultValue="producao" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="producao">Produção</TabsTrigger>
          <TabsTrigger value="produtividade">Produtividade</TabsTrigger>
          <TabsTrigger value="comparativo">Comparativo</TabsTrigger>
          <TabsTrigger value="qualidade">Qualidade</TabsTrigger>
        </TabsList>
        
        <TabsContent value="producao" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Produção Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.450 kg</div>
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
                <div className="text-3xl font-bold">204,2 kg</div>
                <p className="text-xs text-muted-foreground mt-1">
                  3% acima da média histórica
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Maior Produção Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">310 kg</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Março/2025
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Produção por Período</CardTitle>
              <CardDescription>Valores em kg nos últimos 12 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">
                  Gráfico de barras com produção mensal
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="produtividade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Produtividade por Área</CardTitle>
              <CardDescription>Comparativo em kg/hectare</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium">Área</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Tamanho (ha)</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Árvores</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Produção (kg)</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Produtividade (kg/ha)</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Vs Meta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-4 align-middle">Área {i + 1}</td>
                        <td className="p-4 align-middle">{(i * 2.5 + 5).toFixed(1)}</td>
                        <td className="p-4 align-middle">{(i + 1) * 500}</td>
                        <td className="p-4 align-middle text-right">{(i + 1) * 150}</td>
                        <td className="p-4 align-middle text-right font-medium">
                          {((i + 1) * 150 / (i * 2.5 + 5)).toFixed(1)}
                        </td>
                        <td className="p-4 align-middle text-right">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            i % 3 === 0
                              ? "bg-green-100 text-green-800"
                              : i % 3 === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {i % 3 === 0
                              ? "+12%"
                              : i % 3 === 1
                              ? "+2%"
                              : "-5%"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Produtividade</CardTitle>
              <CardDescription>Evolução nos últimos 3 anos</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">
                  Gráfico de linha com tendência de produtividade
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparativo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativo Anual</CardTitle>
              <CardDescription>Produção e produtividade por ano</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">
                  Gráfico de barras comparando anos
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="qualidade" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Qualidade por Lote</CardTitle>
                <CardDescription>Classificação dos lotes produzidos</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">
                    Gráfico de pizza com distribuição de qualidade
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fatores de Qualidade</CardTitle>
                <CardDescription>Distribuição por fatores de qualidade</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">
                    Gráfico de radar com fatores de qualidade
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
