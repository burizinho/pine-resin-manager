
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaMarker } from '@/types';
import 'leaflet/dist/leaflet.css';

// Fix for marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Sample data for demonstration
const sampleMarkers: AreaMarker[] = [
  {
    id: '1',
    name: 'Talhão 1',
    position: [-23.5505, -46.6333], // São Paulo
    size: 15,
    status: 'extracao'
  },
  {
    id: '2',
    name: 'Talhão 2',
    position: [-22.9068, -43.1729], // Rio de Janeiro
    size: 20,
    status: 'crescimento'
  },
  {
    id: '3',
    name: 'Talhão 3',
    position: [-25.4284, -49.2733], // Curitiba
    size: 10,
    status: 'plantio'
  }
];

// Custom marker icon
const customIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Status color map
const statusColors = {
  plantio: 'bg-amber-400',
  crescimento: 'bg-forest-400',
  extracao: 'bg-pine-600',
  colheita: 'bg-pine-300'
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

export default function AreaMap() {
  const [markers, setMarkers] = useState<AreaMarker[]>([]);
  
  useEffect(() => {
    // In a real app, fetch markers from an API
    // For now, use the sample data
    setMarkers(sampleMarkers);
  }, []);

  return (
    <Card className="h-[400px] md:h-[600px]">
      <CardHeader className="pb-2">
        <CardTitle>Mapa de Áreas</CardTitle>
        <CardDescription>Visualize todas as suas áreas de plantio</CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-80px)]">
        <MapContainer 
          center={[-15.7801, -47.9292]} // Brazil center (approximate)
          zoom={4} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapBounds />
          
          {markers.map(marker => (
            <Marker 
              key={marker.id} 
              position={marker.position}
              icon={customIcon}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-semibold">{marker.name}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Tamanho: {marker.size} hectares</p>
                    <p className="flex items-center">
                      Status: 
                      <span className={`ml-1 inline-block w-3 h-3 rounded-full ${statusColors[marker.status as keyof typeof statusColors]}`}></span>
                      <span className="ml-1 capitalize">{marker.status}</span>
                    </p>
                  </div>
                  <a href={`/areas/${marker.id}`} className="text-forest-600 hover:text-forest-800 text-sm font-medium mt-2 inline-block">
                    Ver detalhes
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
}
