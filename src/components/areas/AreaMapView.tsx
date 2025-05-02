
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layers, MapPin, Filter, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AreaMarker } from '@/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Fix for marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Status color map
const statusColors = {
  plantio: '#fbbf24', // amber-400
  crescimento: '#4ade80', // forest-400
  extracao: '#365314', // pine-600
  colheita: '#84cc16', // pine-300
};

const statusLabels = {
  plantio: "Plantio recente",
  crescimento: "Em crescimento",
  extracao: "Em extração",
  colheita: "Pronto para colheita"
};

// Custom marker icon
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Set Brazilian bounds
function MapBounds() {
  const map = useMap();
  
  useEffect(() => {
    map.fitBounds([
      [-33.8, -73.9], // Southwest coordinates
      [5.3, -34.8] // Northeast coordinates
    ]);
  }, [map]);
  
  return null;
}

// Sample data for demonstration
const sampleMarkers: AreaMarker[] = [
  {
    id: '1',
    name: 'Talhão 1',
    position: [-23.5505, -46.6333], // São Paulo
    size: 15,
    status: 'extracao',
    treeCount: 1500,
    pineType: 'Pinus Elliottii',
    plantingDate: '2012-04-15',
    productivity: 3.8
  },
  {
    id: '2',
    name: 'Talhão 2',
    position: [-22.9068, -43.1729], // Rio de Janeiro
    size: 20,
    status: 'crescimento',
    treeCount: 2000,
    pineType: 'Pinus Taeda',
    plantingDate: '2015-06-23',
    productivity: 3.2
  },
  {
    id: '3',
    name: 'Talhão 3',
    position: [-25.4284, -49.2733], // Curitiba
    size: 10,
    status: 'plantio',
    treeCount: 1000,
    pineType: 'Pinus Caribaea',
    plantingDate: '2022-03-10',
    productivity: 0
  },
  {
    id: '4',
    name: 'Talhão 4',
    position: [-20.8137, -49.3823], // São José do Rio Preto
    size: 25,
    status: 'colheita',
    treeCount: 2500,
    pineType: 'Pinus Elliottii',
    plantingDate: '2010-09-03',
    productivity: 4.2
  },
  {
    id: '5',
    name: 'Talhão 5',
    position: [-23.4209, -51.9331], // Maringá
    size: 18,
    status: 'extracao',
    treeCount: 1800,
    pineType: 'Pinus Taeda',
    plantingDate: '2013-11-15',
    productivity: 3.5
  }
];

export default function AreaMapView() {
  const [markers, setMarkers] = useState<AreaMarker[]>([]);
  const [filteredMarkers, setFilteredMarkers] = useState<AreaMarker[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  
  useEffect(() => {
    // Em um app real, buscar marcadores de uma API
    setMarkers(sampleMarkers);
    setFilteredMarkers(sampleMarkers);
  }, []);

  useEffect(() => {
    let filtered = [...markers];
    
    if (selectedStatus !== "all") {
      filtered = filtered.filter(marker => marker.status === selectedStatus);
    }
    
    if (selectedType !== "all") {
      filtered = filtered.filter(marker => marker.pineType.includes(selectedType));
    }
    
    setFilteredMarkers(filtered);
  }, [selectedStatus, selectedType, markers]);

  // Extrair tipos de pinheiros únicos
  const pineTypes = Array.from(new Set(markers.map(marker => marker.pineType)));

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="lg:w-2/3 h-[500px]">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Mapa de Áreas</CardTitle>
                <CardDescription>Visualize todas as áreas de plantio</CardDescription>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Layers className="mr-2 h-4 w-4" />
                      <span>Ver camadas</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Funcionalidade de camadas em desenvolvimento</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-80px)]">
            <MapContainer 
              center={[-15.7801, -47.9292]} 
              zoom={4} 
              style={{ height: '100%', width: '100%' }}
              className="rounded-b-lg z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapBounds />
              
              {filteredMarkers.map(marker => (
                <Marker 
                  key={marker.id} 
                  position={marker.position}
                  icon={DefaultIcon}
                >
                  <Popup>
                    <div className="p-1 w-64">
                      <h3 className="font-semibold text-lg">{marker.name}</h3>
                      <div className="mt-2 space-y-2 text-sm">
                        <Badge 
                          style={{
                            backgroundColor: statusColors[marker.status as keyof typeof statusColors],
                            color: marker.status === 'extracao' ? "white" : "black"
                          }}
                        >
                          {statusLabels[marker.status as keyof typeof statusLabels]}
                        </Badge>
                        
                        <p className="grid grid-cols-2 gap-x-2">
                          <span className="font-medium">Tamanho:</span>
                          <span>{marker.size} hectares</span>
                        </p>
                        
                        <p className="grid grid-cols-2 gap-x-2">
                          <span className="font-medium">Árvores:</span> 
                          <span>{marker.treeCount.toLocaleString('pt-BR')}</span>
                        </p>
                        
                        <p className="grid grid-cols-2 gap-x-2">
                          <span className="font-medium">Espécie:</span>
                          <span>{marker.pineType}</span>
                        </p>
                        
                        <p className="grid grid-cols-2 gap-x-2">
                          <span className="font-medium">Plantio:</span>
                          <span>{new Date(marker.plantingDate).toLocaleDateString('pt-BR')}</span>
                        </p>
                        
                        <p className="grid grid-cols-2 gap-x-2">
                          <span className="font-medium">Idade:</span>
                          <span>{new Date().getFullYear() - new Date(marker.plantingDate).getFullYear()} anos</span>
                        </p>
                        
                        {marker.productivity > 0 && (
                          <p className="grid grid-cols-2 gap-x-2">
                            <span className="font-medium">Produtividade:</span>
                            <span>{marker.productivity.toFixed(1)} kg/ha</span>
                          </p>
                        )}
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" /> Ver detalhes
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Círculos coloridos para indicar status */}
              {filteredMarkers.map(marker => (
                <CircleMarker
                  key={`circle-${marker.id}`}
                  center={marker.position}
                  radius={marker.size / 2} // Tamanho do círculo proporcional à área
                  fillColor={statusColors[marker.status as keyof typeof statusColors]}
                  fillOpacity={0.3}
                  stroke={false}
                />
              ))}
            </MapContainer>
          </CardContent>
        </Card>

        <Card className="lg:w-1/3">
          <CardHeader>
            <CardTitle>Filtros e Estatísticas</CardTitle>
            <CardDescription>Filtre as áreas no mapa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="plantio">Plantio recente</SelectItem>
                    <SelectItem value="crescimento">Em crescimento</SelectItem>
                    <SelectItem value="extracao">Em extração</SelectItem>
                    <SelectItem value="colheita">Pronto para colheita</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Espécie</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por espécie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Todas as espécies</SelectItem>
                    {pineTypes.map((type, index) => (
                      <SelectItem key={index} value={type}>{type}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 space-y-4">
              <h3 className="font-semibold border-b pb-2">Resumo</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total áreas</p>
                  <p className="text-2xl font-bold">{filteredMarkers.length}</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Hectares</p>
                  <p className="text-2xl font-bold">
                    {filteredMarkers.reduce((acc, marker) => acc + marker.size, 0)}
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Árvores</p>
                  <p className="text-2xl font-bold">
                    {filteredMarkers.reduce((acc, marker) => acc + marker.treeCount, 0).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Em extração</p>
                  <p className="text-2xl font-bold">
                    {filteredMarkers.filter(m => m.status === 'extracao').length}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
