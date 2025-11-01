'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ClipboardList, PlusCircle, Trash2 } from 'lucide-react';

interface Test {
  id: string;
  name: string;
  syllabus: string;
  score: string;
}

export function MockTests() {
  const [tests, setTests] = useState<Test[]>([]);
  const [newTestName, setNewTestName] = useState('');
  const [newTestSyllabus, setNewTestSyllabus] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTests = localStorage.getItem('mockTests');
      if (savedTests) {
        setTests(JSON.parse(savedTests));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockTests', JSON.stringify(tests));
    }
  }, [tests]);

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestName.trim() || !newTestSyllabus.trim()) return;
    
    const newTest: Test = {
      id: crypto.randomUUID(),
      name: newTestName,
      syllabus: newTestSyllabus,
      score: '',
    };
    setTests(prev => [...prev, newTest]);
    setNewTestName('');
    setNewTestSyllabus('');
  };

  const handleScoreChange = (id: string, score: string) => {
    setTests(prev =>
      prev.map(test =>
        test.id === id ? { ...test, score } : test
      )
    );
  };
  
  const handleDeleteTest = (id: string) => {
    setTests(prev => prev.filter(test => test.id !== id));
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Mock Tests</CardTitle>
        </div>
        <CardDescription>
          Add your upcoming mock tests and track your scores.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleAddTest} className="space-y-4 p-4 border rounded-lg bg-card">
            <h3 className="font-semibold font-headline">Add New Test</h3>
            <div className="space-y-2">
                <Label htmlFor="test-name">Test Name / Description</Label>
                <Input 
                    id="test-name"
                    placeholder="e.g., Full Syllabus Test #1"
                    value={newTestName}
                    onChange={e => setNewTestName(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="test-syllabus">Syllabus</Label>
                <Textarea 
                    id="test-syllabus"
                    placeholder="e.g., Physics (Full), Chemistry (Organic), Botany (Full)"
                    value={newTestSyllabus}
                    onChange={e => setNewTestSyllabus(e.target.value)}
                    rows={2}
                />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Test
            </Button>
        </form>
        
        <div className="space-y-4">
            <h3 className="font-semibold font-headline text-lg">Your Tests</h3>
            {tests.length === 0 ? (
                <p className="text-muted-foreground text-sm">You haven't added any tests yet.</p>
            ) : (
                <ul className="space-y-4">
                    {tests.map(test => (
                        <li key={test.id} className="p-4 border rounded-lg flex flex-col md:flex-row gap-4 justify-between items-start bg-muted/20">
                           <div className="flex-1 space-y-2">
                                <p className="font-bold">{test.name}</p>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{test.syllabus}</p>
                           </div>
                           <div className="flex items-center gap-2 w-full md:w-auto">
                                <Input
                                    type="text"
                                    placeholder="Score"
                                    value={test.score}
                                    onChange={e => handleScoreChange(test.id, e.target.value)}
                                    className="w-full md:w-32"
                                />
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteTest(test.id)} aria-label="Delete test">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                           </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
      </CardContent>
    </Card>
  );
}