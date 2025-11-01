'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CountdownTimer from '@/components/countdown-timer';

export default function DashboardPage() {
  const examDate = new Date('2025-05-05T09:00:00');

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Time Until Exam</CardTitle>
        </CardHeader>
        <CardContent>
          <CountdownTimer targetDate={examDate} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quote of the Day</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm italic text-muted-foreground">
            &quot;The secret of getting ahead is getting started.&quot;
          </p>
          <p className="text-right text-sm font-semibold mt-2">- Mark Twain</p>
        </CardContent>
      </Card>
    </div>
  );
}
