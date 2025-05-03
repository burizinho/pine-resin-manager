
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AreaMapView from "@/components/areas/AreaMapView";
import { Area } from "@/types";
import { AreaDialog } from "@/components/areas/AreaDialog";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { AreaDetails } from "@/components/areas/AreaDetails";
import { DeleteAreaDialog } from "@/components/areas/DeleteAreaDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AreasPage() {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details" | "edit">("list");
  const [areas, setAreas] = useState<Area[]>([
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

  const handleSaveArea = (data: Omit<Area, "id" | "createdAt">) => {
    if (selectedArea) {
      // Update existing area
      const updatedAreas = areas.map(area => 
        area.id === selectedArea.id 
          ? { ...area, ...data } 
          : area
      );
      
      setAreas(updatedAreas);
      toast({
        title: "Área atualizada",
        description: `A área ${data.name} foi atualizada com sucesso.`
      });
      setSelectedArea(null);
      setViewMode("list");
    } else {
      // Create new area
      const newArea: Area = {
        ...data,
        id: `${areas.length + 1}`,
        plantingDate: data.plantingDate as string, 
        createdAt: new Date().toISOString(),
      };
      
      setAreas((prev) => [...prev, newArea]);
      toast({
        title: "Área criada",
        description: `A área ${newArea.name} foi adicionada com sucesso.`
      });
    }
  };

  const handleDeleteArea = () => {
    if (!selectedArea) return;
    
    setAreas((prev) => prev.filter(area => area.id !== selectedArea.id));
    
    toast({
      title: "Área excluída",
      description: `A área ${selectedArea.name} foi excluída com sucesso.`,
      variant: "destructive"
    });
    
    setSelectedArea(null);
    setDeleteDialogOpen(false);
    setViewMode("list");
  };

  const handleEditArea = (area: Area) => {
    setSelectedArea(area);
    setViewMode("edit");
    setOpen(true);
  };

  const handleViewAreaDetails = (area: Area) => {
    setSelectedArea(area);
    setViewMode("details");
  };

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
    <MainLayout>
      {viewMode === "list" ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Áreas de Plantio</h1>
              <p className="text-muted-foreground">
                Gerencie todas as suas áreas de plantio de pinheiros
              </p>
            </div>
            <Button className="gap-1" onClick={() => setOpen(true)}>
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
              <AreaMapView areas={areas} />
            </TabsContent>
            <TabsContent value="lista" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {areas.map((area) => (
                  <Card key={area.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle>{area.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(area.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <span className="sr-only">Abrir menu</span>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                                  <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditArea(area)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedArea(area);
                                  setDeleteDialogOpen(true);
                                }}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> 
                        {area.latitude.toFixed(4)}, {area.longitude.toFixed(4)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Tamanho:</p>
                          <p className="font-medium">{area.size.toFixed(1)} hectares</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Árvores:</p>
                          <p className="font-medium">{area.treeCount} pinheiros</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Idade:</p>
                          <p className="font-medium">{calculateAge(area.plantingDate)} anos</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Espécie:</p>
                          <p className="font-medium">{area.pineType}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => handleViewAreaDetails(area)}>Ver detalhes</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : viewMode === "details" && selectedArea ? (
        <AreaDetails 
          area={selectedArea}
          onEdit={handleEditArea}
          onClose={() => {
            setSelectedArea(null);
            setViewMode("list");
          }}
        />
      ) : null}

      <AreaDialog 
        open={open} 
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen && viewMode === "edit") {
            setViewMode("list");
            setSelectedArea(null);
          }
        }}
        onSave={handleSaveArea}
        area={viewMode === "edit" ? selectedArea : undefined}
      />

      <DeleteAreaDialog 
        open={deleteDialogOpen} 
        onOpenChange={setDeleteDialogOpen}
        area={selectedArea}
        onConfirm={handleDeleteArea}
      />
    </MainLayout>
  );
}
