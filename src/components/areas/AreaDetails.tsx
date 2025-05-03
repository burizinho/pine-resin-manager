
import { useEffect, useState } from 'react';
import { Area } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Edit, TreePine, Calendar, Ruler, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AreaDetailsProps {
  area: Area;
  onEdit: (area: Area) => void;
  onClose: () => void;
}

export function AreaDetails({ area, onEdit, onClose }: AreaDetailsProps) {
  const [selectedTab, setSelectedTab] = useState("info");

  const getStatusBadge = (status: Area["status"]) => {
    const statusConfig = {
      plantio: { label: "Plantio", variant: "outline" as const },
      crescimento: { label: "Crescimento", variant: "secondary" as const },
      extracao: { label: "Extração", variant: "default" as const },
      colheita: { label: "Colheita", variant: "destructive" as const },
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    );
  };

  const calculateAge = (plantingDate: string) => {
    const planted = new Date(plantingDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - planted.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    return diffYears;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{area.name}</h2>
          <p className="text-muted-foreground flex items-center">
            <MapPin size={16} className="mr-1" />
            {area.latitude.toFixed(4)}, {area.longitude.toFixed(4)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Voltar</Button>
          <Button onClick={() => onEdit(area)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Área
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="extractions">Extrações</TabsTrigger>
          <TabsTrigger value="productivity">Produtividade</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detalhes da Área</CardTitle>
                <CardDescription>Informações gerais sobre a área de plantio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">{getStatusBadge(area.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tamanho</p>
                    <p className="font-medium">{area.size.toFixed(1)} hectares</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Plantio</p>
                    <p className="font-medium">{new Date(area.plantingDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Idade</p>
                    <p className="font-medium">{calculateAge(area.plantingDate)} anos</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Espécie de Pinheiro</p>
                  <p className="font-medium flex items-center">
                    <TreePine className="h-4 w-4 mr-1 text-forest-600" />
                    {area.pineType}
                  </p>
                </div>
                {area.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Observações</p>
                    <p className="text-sm mt-1">{area.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
                <CardDescription>Números importantes desta área</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total de árvores</p>
                    <p className="text-2xl font-bold">{area.treeCount.toLocaleString('pt-BR')}</p>
                    <p className="text-xs text-muted-foreground">
                      {(area.treeCount / area.size).toFixed(0)} árvores/hectare
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Idade da plantação</p>
                    <p className="text-2xl font-bold">{calculateAge(area.plantingDate)} anos</p>
                    <p className="text-xs text-muted-foreground">
                      Plantado em {new Date(area.plantingDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Produção estimada</p>
                    <p className="text-2xl font-bold">
                      {(area.treeCount * 2.5).toLocaleString('pt-BR')} kg
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Média de 2,5 kg por árvore
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Maturidade</p>
                    <p className="text-2xl font-bold">
                      {calculateAge(area.plantingDate) >= 8 ? "Madura" : "Em crescimento"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {calculateAge(area.plantingDate) >= 8 
                        ? "Pronta para extração" 
                        : `Falta ${8 - calculateAge(area.plantingDate)} anos`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximas atividades</CardTitle>
              <CardDescription>Atividades planejadas para esta área</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 border rounded-lg">
                  <Calendar className="h-10 w-10 text-forest-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Inspeção de saúde das árvores</h4>
                      <Badge variant="outline">Agendado</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Agendado para {new Date().toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-sm mt-2">
                      Verificação de pragas e doenças em toda a área.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 border rounded-lg">
                  <Ruler className="h-10 w-10 text-forest-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Medição de crescimento</h4>
                      <Badge variant="outline">Em breve</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Próximo mês
                    </p>
                    <p className="text-sm mt-2">
                      Acompanhamento do desenvolvimento dos pinheiros.
                    </p>
                  </div>
                </div>
                {area.status === 'extracao' && (
                  <div className="flex items-start gap-4 p-3 border rounded-lg">
                    <Users className="h-10 w-10 text-forest-600" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Extração de resina</h4>
                        <Badge variant="default">Prioritário</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Próxima semana
                      </p>
                      <p className="text-sm mt-2">
                        Atividade de extração de resina em 30% da área.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="extractions">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Extrações</CardTitle>
              <CardDescription>Registros de extração de resina nesta área</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TreePine className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                <p>Não há registros de extração para esta área.</p>
                <p className="text-sm">Adicione registros de extração para ver o histórico aqui.</p>
                <Button className="mt-4" variant="outline">Nova extração</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="productivity">
          <Card>
            <CardHeader>
              <CardTitle>Produtividade</CardTitle>
              <CardDescription>Análise de produtividade da área</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TreePine className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                <p>Não há dados de produtividade disponíveis.</p>
                <p className="text-sm">Registre extrações para gerar dados de produtividade.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Atividades</CardTitle>
              <CardDescription>Todas as atividades registradas nesta área</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-muted rounded-full p-2 h-10 w-10 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Área criada</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(area.createdAt).toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm mt-1">
                      A área foi registrada no sistema com {area.treeCount} árvores.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
