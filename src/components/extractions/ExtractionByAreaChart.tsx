
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Extraction } from '@/types';
import { ChartContainer } from '@/components/ui/chart';
import { animate } from '@/lib/animations';

interface ExtractionByAreaChartProps {
  extractions: Extraction[];
  areas: Record<string, string>;
}

export default function ExtractionByAreaChart({ extractions, areas }: ExtractionByAreaChartProps) {
  // Process data: aggregate extractions by area
  const chartData = useMemo(() => {
    const areaExtractions: Record<string, { name: string, quantity: number, count: number }> = {};
    
    // Initialize with all areas to ensure we show even areas with no extractions
    Object.entries(areas).forEach(([id, name]) => {
      areaExtractions[id] = { name, quantity: 0, count: 0 };
    });
    
    // Aggregate extraction quantities by area
    extractions.forEach(extraction => {
      if (areaExtractions[extraction.areaId]) {
        areaExtractions[extraction.areaId].quantity += extraction.quantity;
        areaExtractions[extraction.areaId].count += 1;
      }
    });
    
    return Object.values(areaExtractions)
      .sort((a, b) => b.quantity - a.quantity); // Sort by quantity in descending order
  }, [extractions, areas]);

  const chartConfig = {
    "quantity": {
      theme: {
        light: "#3c9a4e",
        dark: "#4ade80",
      },
      label: "Quantidade Total (kg)",
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-forest-600">{`Quantidade Total: ${payload[0].value.toFixed(1)} kg`}</p>
          <p className="text-muted-foreground">{`Número de Extrações: ${payload[0].payload.count}`}</p>
          {payload[0].payload.count > 0 && (
            <p className="text-muted-foreground">
              {`Média por Extração: ${(payload[0].value / payload[0].payload.count).toFixed(1)} kg`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={animate({ variant: "scale-in", delay: "delay-300", className: "w-full hover-shadow" })}>
      <CardHeader>
        <CardTitle>Extrações por Área</CardTitle>
        <CardDescription>Quantidade total extraída por área</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="vertical"
              margin={{ top: 10, right: 10, left: 70, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
              <XAxis type="number" className="text-xs" />
              <YAxis 
                dataKey="name" 
                type="category" 
                className="text-xs"
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="quantity" 
                fill="var(--color-quantity)" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
