'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';
import { format, subDays, parseISO } from 'date-fns';
import { TrendingUp } from 'lucide-react';

export interface DailyFocus {
  date: string; // YYYY-MM-DD
  sessions: number;
}

interface FocusGraphProps {
  data: DailyFocus[];
}

export function FocusGraph({ data }: FocusGraphProps) {
  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      return format(date, 'yyyy-MM-dd');
    }).reverse();

    return last7Days.map(dateStr => {
      const entry = data.find(d => d.date === dateStr);
      return {
        date: format(parseISO(dateStr), 'MMM d'),
        sessions: entry ? entry.sessions : 0,
      };
    });
  }, [data]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
         <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Weekly Focus Tracker</CardTitle>
        </div>
        <CardDescription>Your completed Pomodoro sessions over the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              width={20}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{
                  fontWeight: 'bold',
                  color: 'hsl(var(--foreground))'
              }}
              formatter={(value: number) => [`${value} sessions`, `Focused for ${value * 25} min`]}
            />
            <Bar dataKey="sessions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
