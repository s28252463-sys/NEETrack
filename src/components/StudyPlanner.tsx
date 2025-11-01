'use client';

import { useState, useTransition } from 'react';
import { getStudyPlan } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Sparkles, BrainCircuit, Loader2 } from 'lucide-react';

interface StudyPlannerProps {
  progress: number;
  daysLeft: number;
}

export function StudyPlanner({ progress, daysLeft }: StudyPlannerProps) {
  const [plan, setPlan] = useState<string | null>(null);
  const [customization, setCustomization] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await getStudyPlan({
        syllabusCompletionPercentage: Math.round(progress),
        daysRemaining: daysLeft,
        customizationPreferences: customization,
      });

      if (result.success) {
        setPlan(result.goals);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
        setPlan(null);
      }
    });
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Personalized Study Planner</CardTitle>
        </div>
        <CardDescription>
          Use AI to generate daily study goals based on your progress and time left.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="customization" className="font-semibold">Customization (Optional)</Label>
            <Textarea
              id="customization"
              placeholder="e.g., 'Focus more on weak topics in Chemistry', 'I want to revise twice a week', 'Allocate more time for mock tests'"
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              className="mt-2"
              rows={3}
            />
          </div>
          {plan && (
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 space-y-2">
                <h4 className="font-headline font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Suggested Goals</h4>
                <p className="text-sm whitespace-pre-wrap">{plan}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Study Plan
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
