'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Target, BookOpen, FlaskConical, TestTube, Lightbulb } from 'lucide-react';

interface SmartStudySuggesterProps {
  progress: number;
  daysLeft: number;
}

interface Suggestion {
    title: string;
    description: string;
    icon: React.ElementType;
}

export function SmartStudySuggester({ progress, daysLeft }: SmartStudySuggesterProps) {
  
  const suggestion: Suggestion = useMemo(() => {
    const roundedProgress = Math.round(progress);
    
    if (daysLeft > 180) {
        if (roundedProgress < 30) {
            return {
                title: "Build Your Foundation",
                description: "Focus on understanding core concepts thoroughly. Don't rush. Aim to cover 1-2% of the syllabus consistently each week.",
                icon: BookOpen
            };
        } else if (roundedProgress < 70) {
            return {
                title: "Consistent Learning & Early Revision",
                description: "You're making good progress. Start incorporating weekly revisions of completed topics alongside learning new ones.",
                icon: Target
            };
        } else {
            return {
                title: "Accelerate & Consolidate",
                description: "Excellent work! Push to complete the remaining syllabus while dedicating at least two days a week for comprehensive revision.",
                icon: FlaskConical
            };
        }
    } else if (daysLeft > 90) {
        if (roundedProgress < 50) {
            return {
                title: "Intensify Syllabus Coverage",
                description: "Time to pick up the pace. Prioritize high-weightage topics and aim to complete at least 80% of the syllabus in the next two months.",
                icon: Target
            };
        } else if (roundedProgress < 90) {
            return {
                title: "Balance New Topics & Mock Tests",
                description: "Start taking full-length mock tests every 2 weeks. Analyze them thoroughly while you wrap up the remaining topics.",
                icon: FlaskConical
            };
        } else {
             return {
                title: "Revision & Practice Focus",
                description: "You are ahead of the curve. Shift your main focus to revision and solving practice papers. Take at least one mock test per week.",
                icon: TestTube
            };
        }
    } else { // Less than 90 days left
        if (roundedProgress < 70) {
            return {
                title: "Strategic High-Yield Focus",
                description: "It's crunch time. Concentrate exclusively on the most important, high-yield chapters. Quality over quantity is key now.",
                icon: Lightbulb
            };
        } else if (roundedProgress < 95) {
            return {
                title: "Aggressive Revision & Mock Tests",
                description: "Your main goal is revision. Take 2-3 mock tests weekly and spend significant time analyzing your mistakes and weak areas.",
                icon: TestTube
            };
        } else {
            return {
                title: "Peak Performance Phase",
                description: "You've done the hard work. Focus entirely on mock tests, analyzing performance, and staying calm. Avoid learning new things.",
                icon: Lightbulb
            };
        }
    }

  }, [progress, daysLeft]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Smart Study Suggester</CardTitle>
        </div>
        <CardDescription>
          Your personalized focus area based on your progress and time left.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 space-y-3">
            <div className="flex items-center gap-3">
                <suggestion.icon className="h-6 w-6 text-primary" />
                <h4 className="font-headline font-semibold text-lg">{suggestion.title}</h4>
            </div>
            <p className="text-sm ml-9">{suggestion.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
