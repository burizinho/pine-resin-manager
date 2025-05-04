
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaMarker } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, LayersIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

// Custom marker icon
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Status color map
const statusColors = {
  plantio: '#fbbf24', // amber-400
  crescimento: '#4ade80', // forest-400
  extracao: '#365314', // pine-600
  colheita: '#84cc16' // pine-300
};

// Status label map
const statusLabels = {
  plantio: "Plantio recente",
  crescimento: "Em crescimento",
  extracao: "Em extração",
  colheita: "Pronto para colheita"
};

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
    treeCount: 3000,
    pineType: 'Pinus Elliottii',
    plantingDate: '2018-05-10',
    productivity: 8.2
  },
  {
    id: '2',
    name: 'Talhão 2',
    position: [-22.9068, -43.1729], // Rio de Janeiro
    size: 20,
    status: 'crescimento',
    treeCount: 4200,
    pineType: 'Pinus Taeda',
    plantingDate: '2020-03-15',
    productivity: 0
  },
  {
    id: '3',
    name: 'Talhão 3',
    position: [-25.4284, -49.2733], // Curitiba
    size: 10,
    status: 'plantio',
    treeCount: 2000,
    pineType: 'Pinus Caribaea',
    plantingDate: '2023-01-20',
    productivity: 0
  },
  {
    id: '4',
    name: 'Talhão 4',
    position: [-27.5969, -48.5495], // Florianópolis
    size: 18,
    status: 'colheita',
    treeCount: 3600,
    pineType: 'Pinus Elliottii',
    plantingDate: '2016-08-05',
    productivity: 12.4
  }
];

export default function AreaMap() {
  const [markers, setMarkers] = useState<AreaMarker[]>([]);
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, fetch markers from an API
    // For now, use the sample data
    setMarkers(sampleMarkers);
  }, []);

  const calculateAge = (plantingDate: string): number => {
    const planted = new Date(plantingDate);
    const now = new Date();
    return Math.floor((now.getTime() - planted.getTime()) / (1000 * 60 * 60 * 24 * 365));
  };

  const handleViewDetails = (id: string) => {
    navigate(`/areas?id=${id}`);
  };

  const toggleMapType = () => {
    setMapType(prev => prev === 'streets' ? 'satellite' : 'streets');
  };

  return (
    <Card className="h-[400px] md:h-[600px]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" /> Mapa de Áreas
            </CardTitle>
            <CardDescription>Visualize todas as suas áreas de plantio</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={toggleMapType}>
            <LayersIcon className="mr-2 h-4 w-4" />
            {mapType === 'streets' ? 'Vista Satélite' : 'Vista Normal'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-80px)]">
        <MapContainer 
          center={[-15.7801, -47.9292]} // Brazil center (approximate)
          zoom={4} 
          style={{ height: '100%', width: '100%' }}
          className="rounded-b-lg z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={mapType === 'streets' 
              ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            }
          />
          <MapBounds />
          
          {markers.map(marker => (
            <Marker 
              key={marker.id} 
              position={marker.position}
              icon={DefaultIcon}
            >
              <Popup className="custom-popup" minWidth={280} maxWidth={320}>
                <div className="p-1">
                  <h3 className="font-semibold text-lg">{marker.name}</h3>
                  
                  <div className="mt-2 mb-3">
                    <Badge 
                      style={{
                        backgroundColor: statusColors[marker.status as keyof typeof statusColors],
                        color: marker.status === 'extracao' ? "white" : "black"
                      }}
                    >
                      {statusLabels[marker.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Tamanho</span>
                      <span className="font-medium">{marker.size} hectares</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Árvores</span>
                      <span className="font-medium">{marker.treeCount?.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Espécie</span>
                      <span className="font-medium">{marker.pineType}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Idade</span>
                      <span className="font-medium">
                        {marker.plantingDate ? calculateAge(marker.plantingDate) : 0} anos
                      </span>
                    </div>
                    
                    {marker.productivity && marker.productivity > 0 && (
                      <div className="flex flex-col col-span-2">
                        <span className="text-xs text-muted-foreground">Produtividade</span>
                        <span className="font-medium">{marker.productivity.toFixed(1)} kg/árvore/ano</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full mt-4" 
                    onClick={() => handleViewDetails(marker.id)}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Ver detalhes
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Círculos coloridos para indicar status e tamanho */}
          {markers.map(marker => (
            <CircleMarker
              key={`circle-${marker.id}`}
              center={marker.position}
              radius={Math.max(10, Math.min(25, marker.size))} // Tamanho do círculo proporcional à área (com limites)
              fillColor={statusColors[marker.status as keyof typeof statusColors]}
              fillOpacity={0.4}
              stroke={true}
              color={statusColors[marker.status as keyof typeof statusColors]}
              weight={1}
              opacity={0.8}
            />
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
}
