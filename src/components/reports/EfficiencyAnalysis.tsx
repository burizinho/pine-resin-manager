
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Scatter, ScatterChart, ZAxis, Cell } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { formatDate } from '@/lib/formatters';

// Sample data for efficiency analysis
const efficiencyData = {
  timeVsQuantity: [
    { date: '2024-01-15', team: 'Equipe A', timeSpent: 5.2, quantity: 42, efficiency: 8.1 },
    { date: '2024-01-22', team: 'Equipe B', timeSpent: 6.5, quantity: 58, efficiency: 8.9 },
    { date: '2024-02-05', team: 'Equipe A', timeSpent: 4.8, quantity: 39, efficiency: 8.1 },
    { date: '2024-02-12', team: 'Equipe C', timeSpent: 7.0, quantity: 68, efficiency: 9.7 },
    { date: '2024-02-28', team: 'Equipe B', timeSpent: 5.0, quantity: 45, efficiency: 9.0 },
    { date: '2024-03-10', team: 'Equipe A', timeSpent: 4.5, quantity: 40, efficiency: 8.9 },
    { date: '2024-03-22', team: 'Equipe C', timeSpent: 6.2, quantity: 65, efficiency: 10.5 },
    { date: '2024-04-05', team: 'Equipe B', timeSpent: 5.5, quantity: 52, efficiency: 9.5 },
    { date: '2024-04-18', team: 'Equipe A', timeSpent: 4.2, quantity: 43, efficiency: 10.2 },
    { date: '2024-05-02', team: 'Equipe C', timeSpent: 6.0, quantity: 67, efficiency: 11.2 },
  ],
  treeEfficiency: [
    { month: 'Jan', treeCount: 500, quantity: 42, efficiency: 0.084 },
    { month: 'Fev', treeCount: 500, quantity: 97, efficiency: 0.194 },
    { month: 'Mar', treeCount: 800, quantity: 105, efficiency: 0.131 },
    { month: 'Abr', treeCount: 800, quantity: 95, efficiency: 0.119 },
    { month: 'Mai', treeCount: 650, quantity: 67, efficiency: 0.103 },
  ]
};

const teamColors = {
  'Equipe A': '#3c9a4e',
  'Equipe B': '#2563eb',
  'Equipe C': '#f59e0b',
};

export default function EfficiencyAnalysis() {
  const [activeTab, setActiveTab] = useState('timeVsQuantity');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      if (activeTab === 'timeVsQuantity') {
        return (
          <div className="bg-background border rounded p-2 shadow-sm text-sm">
            <p className="font-semibold">Data: {formatDate(label)}</p>
            <p>Equipe: {payload[0].payload.team}</p>
            <p>Tempo: {payload[0].payload.timeSpent} horas</p>
            <p>Quantidade: {payload[1].payload.quantity} kg</p>
            <p className="font-medium text-primary">
              Eficiência: {payload[0].payload.efficiency.toFixed(1)} kg/hora
            </p>
          </div>
        );
      } else {
        return (
          <div className="bg-background border rounded p-2 shadow-sm text-sm">
            <p className="font-semibold">Mês: {payload[0].payload.month}</p>
            <p>Árvores: {payload[0].payload.treeCount}</p>
            <p>Quantidade: {payload[0].payload.quantity} kg</p>
            <p className="font-medium text-primary">
              Eficiência: {payload[0].payload.efficiency.toFixed(3)} kg/árvore
            </p>
          </div>
        );
      }
    }
    return null;
  };

  const chartConfig = {
    timeSpent: {
      theme: {
        light: "#2563eb",
        dark: "#3b82f6",
      },
      label: "Tempo (horas)",
    },
    quantity: {
      theme: {
        light: "#3c9a4e",
        dark: "#4ade80",
      },
      label: "Quantidade (kg)",
    },
    efficiency: {
      theme: {
        light: "#f59e0b",
        dark: "#fbbf24",
      },
      label: "Eficiência",
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Análise de Eficiência</CardTitle>
        <CardDescription>Relação entre tempo, árvores e quantidade extraída</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="timeVsQuantity">Tempo vs Quantidade</TabsTrigger>
            <TabsTrigger value="treeEfficiency">Eficiência por Árvore</TabsTrigger>
          </TabsList>
          <TabsContent value="timeVsQuantity" className="h-[350px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    type="number" 
                    dataKey="timeSpent" 
                    name="Tempo" 
                    label={{ 
                      value: 'Tempo (horas)', 
                      position: 'insideBottom', 
                      offset: -5 
                    }} 
                  />
                  <YAxis 
                    type="number" 
                    dataKey="quantity" 
                    name="Quantidade" 
                    label={{ 
                      value: 'Quantidade (kg)', 
                      angle: -90, 
                      position: 'insideLeft' 
                    }}
                  />
                  <ZAxis type="number" dataKey="efficiency" range={[60, 200]} name="Eficiência" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend payload={
                    Object.entries(teamColors).map(([team, color]) => ({
                      value: team,
                      type: 'circle',
                      color
                    }))
                  } />
                  <Scatter name="Extrações" data={efficiencyData.timeVsQuantity}>
                    {efficiencyData.timeVsQuantity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={teamColors[entry.team as keyof typeof teamColors]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="treeEfficiency" className="h-[350px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyData.treeEfficiency} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" label={{ value: 'Quantidade (kg)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Eficiência (kg/árvore)', angle: 90, position: 'insideRight' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="quantity" stroke="var(--color-quantity)" name="Quantidade" />
                  <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="var(--color-efficiency)" name="Eficiência (kg/árvore)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
