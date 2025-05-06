import { useMemo } from 'react';
import { Extraction, Area } from '@/types';
import StatsCard from '@/components/dashboard/StatsCard';
import { ChartLine, Users, TrendingUp, CalendarClock } from 'lucide-react';
import { parseISO, isAfter, subDays } from 'date-fns';

interface ExtractionStatsProps {
  extractions: Extraction[];
  areas: Area[];
}

export default function ExtractionStats({ extractions, areas }: ExtractionStatsProps) {
  const stats = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);
    const sixtyDaysAgo = subDays(now, 60);
    
    // Total extraction quantity
    const totalQuantity = extractions.reduce((sum, ext) => sum + ext.quantity, 0);
    
    // Recent extractions (last 30 days)
    const recentExtractions = extractions.filter(ext => 
      isAfter(parseISO(ext.date), thirtyDaysAgo)
    );
    const recentQuantity = recentExtractions.reduce((sum, ext) => sum + ext.quantity, 0);
    
    // Previous period (30-60 days ago)
    const previousPeriodExtractions = extractions.filter(ext => 
      isAfter(parseISO(ext.date), sixtyDaysAgo) && !isAfter(parseISO(ext.date), thirtyDaysAgo)
    );
    const previousQuantity = previousPeriodExtractions.reduce((sum, ext) => sum + ext.quantity, 0);
    
    // Calculate trend percentage
    let trendPercentage = 0;
    if (previousQuantity > 0) {
      trendPercentage = ((recentQuantity - previousQuantity) / previousQuantity) * 100;
    }
    
    // Areas with extraction
    const areasWithExtraction = new Set(extractions.map(ext => ext.areaId));
    
    // Teams involved
    const teamsInvolved = new Set(extractions.map(ext => ext.team));
    
    // Average productivity
    const extractionAreaIds = extractions.map(ext => ext.areaId);
    const extractionAreas = areas.filter(area => extractionAreaIds.includes(area.id));
    const totalAreaSize = extractionAreas.reduce((sum, area) => sum + area.size, 0);
    const avgProductivity = totalAreaSize > 0 ? totalQuantity / totalAreaSize : 0;
    
    // Next scheduled extraction
    const futureExtractions = extractions
      .filter(ext => isAfter(parseISO(ext.date), now))
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
    
    const scheduledCount = futureExtractions.length;
    
    return {
      totalQuantity,
      areasCount: areasWithExtraction.size,
      teamsCount: teamsInvolved.size,
      avgProductivity,
      scheduledCount,
      trend: {
        value: trendPercentage,
        isPositive: trendPercentage >= 0
      }
    };
  }, [extractions, areas]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Extraído"
        value={`${stats.totalQuantity.toFixed(1)} kg`}
        description="Em todas as extrações"
        icon={<ChartLine className="h-4 w-4" />}
        trend={stats.trend}
      />
      
      <StatsCard
        title="Áreas Produtivas"
        value={stats.areasCount}
        description={`De um total de ${areas.length} áreas cadastradas`}
        icon={<TrendingUp className="h-4 w-4" />}
      />
      
      <StatsCard
        title="Equipes Envolvidas"
        value={stats.teamsCount}
        description="Equipes realizando extrações"
        icon={<Users className="h-4 w-4" />}
      />
      
      <StatsCard
        title="Extrações Agendadas"
        value={stats.scheduledCount}
        description="Para os próximos dias"
        icon={<CalendarClock className="h-4 w-4" />}
      />
    </div>
  );
}
