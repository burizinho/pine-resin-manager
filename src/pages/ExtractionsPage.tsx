import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, Plus } from "lucide-react";
import { Area, Extraction } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ExtractionDialog } from "@/components/extractions/ExtractionDialog";
import { toast } from "@/hooks/use-toast";
import { ExtractionCalendar } from "@/components/extractions/ExtractionCalendar";
import { formatDate } from "@/lib/formatters";

export default function ExtractionsPage() {
  const [open, setOpen] = useState(false);
  const [areas] = useState<Area[]>([
    {
      id: "1",
      name: "Área 1",
      latitude: -25.4284,
      longitude: -49.2733,
      size: 2.5,
      plantingDate: "2015-05-10",
      treeCount: 500,
      pineType: "Pinus Elliottii",
      status: "extracao",
      createdAt: "2015-05-10T10:00:00Z",
    },
    {
      id: "2",
      name: "Área 2",
      latitude: -25.4384,
      longitude: -49.2633,
      size: 5.0,
      plantingDate: "2013-02-15",
      treeCount: 1000,
      pineType: "Pinus Taeda",
      status: "crescimento",
      createdAt: "2013-02-15T10:00:00Z",
    },
    {
      id: "3",
      name: "Área 3",
      latitude: -25.4184,
      longitude: -49.2833,
      size: 7.5,
      plantingDate: "2018-09-20",
      treeCount: 1500,
      pineType: "Pinus Caribaea",
      status: "plantio",
      createdAt: "2018-09-20T10:00:00Z",
    },
    {
      id: "4",
      name: "Área 4",
      latitude: -25.4484,
      longitude: -49.2533,
      size: 10.0,
      plantingDate: "2010-11-05",
      treeCount: 2000,
      pineType: "Pinus Elliottii",
      status: "colheita",
      createdAt: "2010-11-05T10:00:00Z",
    },
    {
      id: "5",
      name: "Área 5",
      latitude: -25.4084,
      longitude: -49.2933,
      size: 12.5,
      plantingDate: "2016-07-30",
      treeCount: 2500,
      pineType: "Pinus Taeda",
      status: "extracao",
      createdAt: "2016-07-30T10:00:00Z",
    },
  ]);
  
  const [extractions, setExtractions] = useState<Extraction[]>([
    {
      id: "1",
      areaId: "1",
      date: "2025-05-10",
      quantity: 50.0,
      team: "Equipe A",
      notes: "Primeira extração do ano",
      createdAt: "2025-05-10T10:00:00Z",
    },
    {
      id: "2",
      areaId: "5",
      date: "2025-05-11",
      quantity: 60.0,
      team: "Equipe B",
      notes: "Condições climáticas favoráveis",
      createdAt: "2025-05-11T10:00:00Z",
    },
    {
      id: "3",
      areaId: "1",
      date: "2025-05-12",
      quantity: 70.0,
      team: "Equipe A",
      notes: "Segunda extração da Área 1",
      createdAt: "2025-05-12T10:00:00Z",
    },
    {
      id: "4",
      areaId: "5",
      date: "2025-05-13",
      quantity: 80.0,
      team: "Equipe C",
      notes: "Alta produtividade",
      createdAt: "2025-05-13T10:00:00Z",
    },
    {
      id: "5",
      areaId: "1",
      date: "2025-05-14",
      quantity: 90.0,
      team: "Equipe B",
      notes: "Teste de nova técnica",
      createdAt: "2025-05-14T10:00:00Z",
    },
  ]);

  const handleSaveExtraction = (data: Omit<Extraction, "id" | "createdAt">) => {
    const newExtraction: Extraction = {
      ...data,
      id: `${extractions.length + 1}`,
      date: data.date as string,
      createdAt: new Date().toISOString(),
    };
    
    setExtractions((prev) => [...prev, newExtraction]);
    toast({
      title: "Extração registrada",
      description: `Uma nova extração foi registrada para a ${areas.find(a => a.id === data.areaId)?.name}.`
    });
  };

  const getAreaById = (id: string) => {
    return areas.find((area) => area.id === id);
  };

  const getStatusBadge = (index: number) => {
    const statusConfig = [
      { label: "Concluída", className: "bg-green-100 text-green-800" },
      { label: "Em andamento", className: "bg-yellow-100 text-yellow-800" },
      { label: "Agendada", className: "bg-blue-100 text-blue-800" },
    ];
    
    const status = statusConfig[index % 3];
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}>
        {status.label}
      </span>
    );
  };

  // Create a map of area IDs to area names for the calendar
  const areaNames = areas.reduce((acc: Record<string, string>, area) => {
    acc[area.id] = area.name;
    return acc;
  }, {});

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Extrações</h1>
          <p className="text-muted-foreground">
            Acompanhe todas as extrações de resina realizadas
          </p>
        </div>
        <Button className="gap-1" onClick={() => setOpen(true)}>
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
                    {extractions.map((extraction, i) => (
                      <tr key={extraction.id} className="border-b">
                        <td className="p-4 align-middle">#EXT-{1000 + i}</td>
                        <td className="p-4 align-middle">
                          {getAreaById(extraction.areaId)?.name || "Desconhecida"}
                        </td>
                        <td className="p-4 align-middle">
                          {new Date(extraction.date).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="p-4 align-middle">{extraction.quantity.toFixed(1)} kg</td>
                        <td className="p-4 align-middle">{extraction.team}</td>
                        <td className="p-4 align-middle">
                          {getStatusBadge(i)}
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
            <CardContent>
              <ExtractionCalendar 
                extractions={extractions} 
                areas={areaNames} 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Próximas Extrações Agendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-10 px-4 text-left align-middle font-medium">Data</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Área</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Equipe</th>
                      <th className="h-10 px-4 text-right align-middle font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractions
                      .filter(ext => new Date(ext.date) > new Date())
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .slice(0, 5)
                      .map((extraction) => (
                        <tr key={extraction.id} className="border-b">
                          <td className="p-2 align-middle">
                            {formatDate(new Date(extraction.date))}
                          </td>
                          <td className="p-2 align-middle">
                            {getAreaById(extraction.areaId)?.name || "Desconhecida"}
                          </td>
                          <td className="p-2 align-middle">{extraction.team}</td>
                          <td className="p-2 align-middle text-right">
                            <Button variant="ghost" size="sm">Ver</Button>
                          </td>
                        </tr>
                      ))}
                    {extractions.filter(ext => new Date(ext.date) > new Date()).length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-muted-foreground">
                          Nenhuma extração agendada
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
                <div className="text-3xl font-bold">
                  {extractions.reduce((sum, ext) => sum + ext.quantity, 0).toFixed(1)} kg
                </div>
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

      <ExtractionDialog
        open={open}
        onOpenChange={setOpen}
        areas={areas.filter(area => area.status === "extracao")}
        onSave={handleSaveExtraction}
      />
    </MainLayout>
  );
}
