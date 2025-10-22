'use server';

/**
 * @fileOverview AI-powered motivational quote generator.
 *
 * - getDailyQuote - A function that returns a motivational quote.
 * - DailyQuoteOutput - The return type for the getDailyQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyQuoteOutputSchema = z.object({
  quote: z.string().describe('The motivational quote.'),
  author: z.string().describe('The author of the quote (can be "Anonymous").'),
});
export type DailyQuoteOutput = z.infer<typeof DailyQuoteOutputSchema>;

// This is the exported function that should be called from outside.
export async function getDailyQuote(): Promise<DailyQuoteOutput> {
    return getDailyQuoteFlow();
}

const prompt = ai.definePrompt({
  name: 'getDailyQuotePrompt',
  output: {schema: DailyQuoteOutputSchema},
  prompt: `You are an AI assistant that provides motivational quotes for students preparing for the highly competitive NEET UG medical entrance exam in India.

  Generate a short, powerful, and inspiring quote that is relevant to their journey of hard work, perseverance, and dreams of becoming a doctor. The quote should be encouraging and uplifting.
  `,
});

// This is the internal flow definition.
const getDailyQuoteFlow = ai.defineFlow(
  {
    name: 'getDailyQuoteFlow',
    outputSchema: DailyQuoteOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
