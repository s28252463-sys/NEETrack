import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function StudyPlanner() {
  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>AI Study Planner</CardTitle>
        <CardDescription>
          Get a personalized study plan based on your progress.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input placeholder="What topic do you want to focus on?" />
          <Button>Generate Plan</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Powered by Generative AI.
        </p>
      </CardFooter>
    </Card>
  );
}

    