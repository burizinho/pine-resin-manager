
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AreasPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Áreas de Plantio</h1>
          <p className="text-muted-foreground">
            Gerencie todas as suas áreas de plantio de pinheiros
          </p>
        </div>
        <Button className="gap-1">
          <Plus size={18} />
          <span>Nova Área</span>
        </Button>
      </div>

      <Tabs defaultValue="mapa" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="mapa">Mapa</TabsTrigger>
          <TabsTrigger value="lista">Lista</TabsTrigger>
        </TabsList>
        <TabsContent value="mapa" className="space-y-4">
          <div className="relative w-full h-[60vh] rounded-lg overflow-hidden border bg-card shadow-sm">
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <MapPin className="h-12 w-12 text-muted-foreground/50" />
              <p className="ml-2 text-lg text-muted-foreground">
                Visualização do mapa das áreas
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="lista" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item}>
                <CardHeader className="pb-2">
                  <CardTitle>Área {item}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> 
                    Fazenda São Pedro, Lote {item}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tamanho:</p>
                      <p className="font-medium">{(item * 2.5).toFixed(1)} hectares</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Árvores:</p>
                      <p className="font-medium">{item * 500} pinheiros</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Idade média:</p>
                      <p className="font-medium">{item + 10} anos</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Produtividade:</p>
                      <p className="font-medium">{(item * 3.5).toFixed(1)} kg/ha</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">Ver detalhes</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
