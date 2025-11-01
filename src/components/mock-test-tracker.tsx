'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClipboardList, PlusCircle } from 'lucide-react';
import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { format } from 'date-fns';

const testSchema = z.object({
  testName: z.string().min(1, 'Test name is required'),
  physicsScore: z.coerce.number().min(0, 'Score must be positive').max(180),
  chemistryScore: z.coerce.number().min(0, 'Score must be positive').max(180),
  biologyScore: z.coerce.number().min(0, 'Score must be positive').max(360),
});

type TestFormValues = z.infer<typeof testSchema>;

type MockTest = {
  id: string;
  testName: string;
  physicsScore: number;
  chemistryScore: number;
  biologyScore: number;
  totalScore: number;
  createdAt: {
    toDate: () => Date;
  };
};

export default function MockTestTracker() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mockTestsQuery = useMemoFirebase(
    () => (user ? collection(firestore, 'users', user.uid, 'mockTests') : null),
    [firestore, user]
  );
  const { data: mockTests, isLoading: isLoadingTests } =
    useCollection<MockTest>(mockTestsQuery);

  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      testName: '',
      physicsScore: 0,
      chemistryScore: 0,
      biologyScore: 0,
    },
  });

  const onSubmit = async (values: TestFormValues) => {
    if (!user || !mockTestsQuery) return;
    const totalScore =
      values.physicsScore + values.chemistryScore + values.biologyScore;

    await addDocumentNonBlocking(mockTestsQuery, {
      ...values,
      totalScore,
      createdAt: serverTimestamp(),
      userId: user.uid,
    });
    
    form.reset();
    setIsDialogOpen(false);
  };
  
  const sortedTests = useMemoFirebase(() => {
    if (!mockTests) return [];
    // Firestore returns a different Timestamp object than the client
    // so we need to normalize to JS Date
    const testsWithDate = mockTests.map(t => ({...t, date: t.createdAt.toDate()}))
    return testsWithDate.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [mockTests]);

  const chartData = useMemoFirebase(() => {
    if (!sortedTests) return [];
    return sortedTests.map((test, index) => ({
      name: `Test ${index + 1}`,
      totalScore: test.totalScore,
      physics: test.physicsScore,
      chemistry: test.chemistryScore,
      biology: test.biologyScore,
    }));
  }, [sortedTests]);

  if (isUserLoading || isLoadingTests) {
    return (
      <Card className="w-full max-w-4xl bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-1/4 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full mb-6" />
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6" />
            Mock Test Tracker
          </CardTitle>
          <CardDescription>
            Log and analyze your mock test performance.
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              Log New Test
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log New Mock Test</DialogTitle>
              <DialogDescription>
                Enter your scores for each subject. The total will be calculated
                automatically.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="testName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Name / ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Aakash Mock Test 3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="physicsScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Physics</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="chemistryScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chemistry</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="biologyScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biology</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Save Test</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Performance Over Time</h3>
            <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis domain={[0, 720]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  content={
                    <ChartTooltipContent
                      labelClassName="font-bold"
                      className="bg-card/80 backdrop-blur-sm"
                    />
                  }
                />
                <Line type="monotone" dataKey="totalScore" name="Total" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                <Line type="monotone" dataKey="physics" name="Physics" stroke="hsl(var(--chart-1))" strokeWidth={1.5} strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="chemistry" name="Chemistry" stroke="hsl(var(--chart-2))" strokeWidth={1.5} strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="biology" name="Biology" stroke="hsl(var(--chart-3))" strokeWidth={1.5} strokeDasharray="5 5"/>
            </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Physics</TableHead>
              <TableHead className="text-right">Chemistry</TableHead>
              <TableHead className="text-right">Biology</TableHead>
              <TableHead className="text-right font-bold">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTests.length > 0 ? (
              sortedTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.testName}</TableCell>
                  <TableCell>{format(test.date, 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right">
                    {test.physicsScore}
                  </TableCell>
                  <TableCell className="text-right">
                    {test.chemistryScore}
                  </TableCell>
                  <TableCell className="text-right">
                    {test.biologyScore}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {test.totalScore}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No mock tests logged yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
