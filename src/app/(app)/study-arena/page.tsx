'use client';

import { studyArenaData } from '@/lib/study-arena-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Library, Link as LinkIcon, Youtube } from 'lucide-react';

export default function StudyArenaPage() {
  return (
    <div className="flex-1">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Library className="h-8 w-8 text-primary" />
          Study Arena
        </h1>
        <p className="text-muted-foreground mt-2">
          Your central hub for video lectures and notes for every subject.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyArenaData.map((item, index) => (
          <Card key={index} className="overflow-hidden bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg capitalize">{item.Subject}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video mb-4 rounded-md overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={item.YouTube_URL}
                  title={`YouTube video player for ${item.Subject}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <Button asChild className="w-full">
                <a href={item.Notes_Drive_Link} target="_blank" rel="noopener noreferrer">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  View/Download Notes
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
