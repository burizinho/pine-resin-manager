
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Extraction } from '@/types';
import { ChartContainer } from '@/components/ui/chart';
import { animate } from '@/lib/animations';

interface ExtractionByTeamChartProps {
  extractions: Extraction[];
}

export default function ExtractionByTeamChart({ extractions }: ExtractionByTeamChartProps) {
  // Process data: aggregate extractions by team
  const chartData = useMemo(() => {
    const teamExtractions: Record<string, { name: string, value: number, count: number }> = {};
    
    // Aggregate extraction quantities by team
    extractions.forEach(extraction => {
      if (!teamExtractions[extraction.team]) {
        teamExtractions[extraction.team] = { name: extraction.team, value: 0, count: 0 };
      }
      teamExtractions[extraction.team].value += extraction.quantity;
      teamExtractions[extraction.team].count += 1;
    });
    
    return Object.values(teamExtractions);
  }, [extractions]);

  const COLORS = ['#3c9a4e', '#ffa722', '#ef4444', '#2563eb', '#8b5cf6', '#ec4899'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{payload[0].name}: {payload[0].value.toFixed(1)} kg</p>
          <p className="text-muted-foreground">{`Número de Extrações: ${payload[0].payload.count}`}</p>
          <p className="text-muted-foreground">
            {`Média por Extração: ${(payload[0].value / payload[0].payload.count).toFixed(1)} kg`}
          </p>
          <p className="text-muted-foreground">
            {`${(payload[0].percent * 100).toFixed(1)}% do total`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={animate({ variant: "scale-in", delay: "delay-300", className: "w-full hover-shadow" })}>
      <CardHeader>
        <CardTitle>Extrações por Equipe</CardTitle>
        <CardDescription>Participação de cada equipe no volume total</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Nenhum dado disponível</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
