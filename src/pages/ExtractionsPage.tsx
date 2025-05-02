
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, Plus } from "lucide-react";

export default function ExtractionsPage() {
  const [view, setView] = useState("calendario");
  
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Extrações</h1>
          <p className="text-muted-foreground">
            Acompanhe todas as extrações de resina realizadas
          </p>
        </div>
        <Button className="gap-1">
          <Plus size={18} />
          <span>Nova Extração</span>
        </Button>
      </div>

      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lista" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Extrações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Área</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Quantidade</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Responsável</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-4 align-middle">#EXT-{1000 + i}</td>
                        <td className="p-4 align-middle">Área {i + 1}</td>
                        <td className="p-4 align-middle">{`${10 + i}/05/2025`}</td>
                        <td className="p-4 align-middle">{(50 + i * 10).toFixed(1)} kg</td>
                        <td className="p-4 align-middle">João Silva</td>
                        <td className="p-4 align-middle">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            i % 3 === 0
                              ? "bg-green-100 text-green-800"
                              : i % 3 === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {i % 3 === 0
                              ? "Concluída"
                              : i % 3 === 1
                              ? "Em andamento"
                              : "Agendada"}
                          </span>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <Button variant="ghost" size="sm">Ver</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendario" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendário de Extrações</CardTitle>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center text-center">
                  <Droplet className="h-16 w-16 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">Calendário de Extrações</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Aqui você poderá ver todas as extrações programadas no calendário
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="estatisticas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Extraído (2025)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.450 kg</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +12% em relação ao mesmo período de 2024
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Produtividade Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">15,2 kg/ha</div>
                <p className="text-xs text-muted-foreground mt-1">
                  -2% em relação à média histórica
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Extrações Agendadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Próxima: 15/05/2025 - Área 3
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Histórico de Extrações</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <Droplet className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">
                  Gráfico de histórico de extrações por área
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
