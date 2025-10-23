'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ClipboardList, PlusCircle, Trash2 } from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, writeBatch, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

interface Test {
  id: string;
  name: string;
  syllabus: string;
  score: string;
}

export function MockTests() {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const [tests, setTests] = useState<Test[]>([]);
  const [newTestName, setNewTestName] = useState('');
  const [newTestSyllabus, setNewTestSyllabus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userLoading) return;
    
    setIsLoading(true);
    if (user && firestore) {
      // Logic for logged-in user
      const testsColRef = collection(firestore, `users/${user.uid}/mockTests`);
      const unsubscribe = onSnapshot(testsColRef, async (snapshot) => {
        const userTests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Test));
        
        // Migrate localStorage tests to Firestore on first load after login
        const localDataRaw = localStorage.getItem('mockTests');
        if (localDataRaw) {
          const localTests: Omit<Test, 'id'>[] = JSON.parse(localDataRaw);
          if (localTests.length > 0) {
            const batch = writeBatch(firestore);
            localTests.forEach(test => {
              const newDocRef = doc(collection(firestore, `users/${user.uid}/mockTests`));
              batch.set(newDocRef, test);
            });
            await batch.commit();
            localStorage.removeItem('mockTests'); // Clear local data after migration
          }
        }
        
        // Fetch all tests again after potential migration
        const finalSnapshot = await getDocs(testsColRef);
        const finalList = finalSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Test));
        setTests(finalList);
        setIsLoading(false);

      }, (error) => {
        const permissionError = new FirestorePermissionError({
            path: testsColRef.path,
            operation: 'list',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        setIsLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Logic for logged-out user
      const savedTests = localStorage.getItem('mockTests');
      if (savedTests) {
        setTests(JSON.parse(savedTests));
      }
      setIsLoading(false);
    }
  }, [user, firestore, userLoading]);

  useEffect(() => {
    // Persist to localStorage only for logged-out users and after initial load
    if (!user && !isLoading) {
      localStorage.setItem('mockTests', JSON.stringify(tests));
    }
  }, [tests, user, isLoading]);

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestName.trim() || !newTestSyllabus.trim()) return;

    const newTest: Omit<Test, 'id'> = {
      name: newTestName,
      syllabus: newTestSyllabus,
      score: '',
    };
    
    if (user && firestore) {
      const testsColRef = collection(firestore, `users/${user.uid}/mockTests`);
      addDoc(testsColRef, newTest).catch(serverError => {
          const permissionError = new FirestorePermissionError({
              path: `${testsColRef.path}/<new_document>`,
              operation: 'create',
              requestResourceData: newTest,
          } satisfies SecurityRuleContext);
          errorEmitter.emit('permission-error', permissionError);
      });
    } else {
      setTests(prev => [...prev, { ...newTest, id: crypto.randomUUID() }]);
    }
    setNewTestName('');
    setNewTestSyllabus('');
  };

  const handleScoreChange = (id: string, score: string) => {
    const originalTest = tests.find(t => t.id === id);
    const updatedTest = { ...originalTest, score };

    setTests(prev => prev.map(test => (test.id === id ? updatedTest as Test : test)));

    if (user && firestore) {
      const testDocRef = doc(firestore, `users/${user.uid}/mockTests`, id);
      updateDoc(testDocRef, { score }).catch(serverError => {
        const permissionError = new FirestorePermissionError({
            path: testDocRef.path,
            operation: 'update',
            requestResourceData: updatedTest,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
    }
  };
  
  const handleDeleteTest = (id: string) => {
    if (user && firestore) {
      const testDocRef = doc(firestore, `users/${user.uid}/mockTests`, id);
      deleteDoc(testDocRef).catch(serverError => {
        const permissionError = new FirestorePermissionError({
            path: testDocRef.path,
            operation: 'delete',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
    } else {
      setTests(prev => prev.filter(test => test.id !== id));
    }
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
            {isLoading ? (
              <p>Loading tests...</p>
            ) : tests.length === 0 ? (
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
