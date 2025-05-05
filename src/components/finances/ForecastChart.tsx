
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { animate } from '@/lib/animations';

// Sample data for financial forecast
const forecastData = [
  { month: 'Mai', real: 21400, projetado: null },
  { month: 'Jun', real: 24800, projetado: null },
  { month: 'Jul', real: 22600, projetado: null },
  { month: 'Ago', real: 23900, projetado: null },
  { month: 'Set', real: null, projetado: 25200 },
  { month: 'Out', real: null, projetado: 26400 },
  { month: 'Nov', real: null, projetado: 27800 },
  { month: 'Dez', real: null, projetado: 31500 },
];

export default function ForecastChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const value = data.real !== null ? data.real : data.projetado;
      const type = data.real !== null ? 'Realizado' : 'Projetado';
      
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{`${label}`}</p>
          <p>{`${type}: R$ ${value.toLocaleString('pt-BR')}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={animate({ variant: "scale-in", delay: "delay-100", className: "hover-shadow" })}>
      <CardHeader>
        <CardTitle>Previsão Financeira</CardTitle>
        <CardDescription>Receita realizada e projetada para os próximos 4 meses</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={forecastData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3c9a4e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3c9a4e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProjetado" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="real" 
              stroke="#3c9a4e" 
              fillOpacity={1} 
              fill="url(#colorReal)" 
              name="Realizado"
              connectNulls 
            />
            <Area 
              type="monotone" 
              dataKey="projetado" 
              stroke="#6366f1" 
              fillOpacity={1} 
              fill="url(#colorProjetado)" 
              name="Projetado" 
              strokeDasharray="5 5"
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
