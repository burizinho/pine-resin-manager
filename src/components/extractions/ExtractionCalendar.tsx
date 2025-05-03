
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Extraction } from "@/types";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDate, formatWeight } from "@/lib/formatters";
import { CalendarClock, Droplet, Users } from "lucide-react";

interface ExtractionCalendarProps {
  extractions: Extraction[];
  areas: Record<string, string>;
}

export function ExtractionCalendar({ extractions, areas }: ExtractionCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Group extractions by date for easier lookup
  const extractionsByDate = extractions.reduce((acc: Record<string, Extraction[]>, extraction) => {
    const dateKey = extraction.date.split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(extraction);
    return acc;
  }, {});

  // Get all unique dates that have extractions
  const extractionDates = Object.keys(extractionsByDate).map(dateStr => new Date(dateStr));

  // Get extractions for the selected date
  const selectedDateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedDateExtractions = selectedDateKey ? extractionsByDate[selectedDateKey] || [] : [];

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateKey = format(date, 'yyyy-MM-dd');
      if (extractionsByDate[dateKey]?.length) {
        setDialogOpen(true);
      }
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col items-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          className="rounded-md border p-3 pointer-events-auto"
          modifiers={{
            extraction: extractionDates,
          }}
          modifiersClassNames={{
            extraction: "bg-green-100 text-green-900 relative after:absolute after:bottom-1 after:right-1 after:w-1.5 after:h-1.5 after:bg-green-500 after:rounded-full",
          }}
        />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Extrações em {selectedDate ? formatDate(selectedDate) : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedDateExtractions.map((extraction) => (
              <div key={extraction.id} className="border rounded-md p-4 bg-card">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">{areas[extraction.areaId]}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    #{extraction.id}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Droplet size={16} />
                    <span>Quantidade: {formatWeight(extraction.quantity)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>Equipe: {extraction.team}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarClock size={16} />
                    <span>Registrado em: {formatDate(new Date(extraction.createdAt))}</span>
                  </div>
                  {extraction.notes && (
                    <div className="mt-2 pt-2 border-t text-xs italic">
                      "{extraction.notes}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
