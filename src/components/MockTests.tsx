'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockTestsData = [
  { name: 'Mock Test 1', score: 85, date: '2024-04-01' },
  { name: 'Mock Test 2', score: 92, date: '2024-04-15' },
  { name: 'Mock Test 3', score: 78, date: '2024-05-01' },
];

export function MockTests() {
  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>Mock Tests</CardTitle>
        <CardDescription>
          Your recent performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockTestsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                borderColor: 'rgba(255,255,255,0.2)',
              }}
              labelStyle={{ color: '#ffffff' }}
            />
            <Bar dataKey="score" fill="rgba(130, 225, 255, 0.7)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex w-full items-center gap-2">
            <span className="font-semibold">Average Score: 85%</span>
        </div>
        <Button size="sm" className="w-full">
          Start New Mock Test
        </Button>
      </CardFooter>
    </Card>
  );
}

    