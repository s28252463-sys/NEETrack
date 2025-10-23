'use server';
/**
 * @fileOverview A flow that returns a daily motivational quote.
 */

import {ai} from '@/ai/genkit';
import {DailyQuoteOutput, DailyQuoteOutputSchema} from '@/ai/schemas';

const getDailyQuotePrompt = ai.definePrompt({
  name: 'getDailyQuotePrompt',
  output: {schema: DailyQuoteOutputSchema},
  prompt: `You are an AI assistant that provides motivational quotes for students preparing for the highly competitive NEET UG medical entrance exam in India.

  Generate a short, powerful, and inspiring quote that is relevant to their journey of hard work, perseverance, and dreams of becoming a doctor. The quote should be encouraging and uplifting.
  `,
});

const getDailyQuoteFlow = ai.defineFlow(
  {
    name: 'getDailyQuoteFlow',
    outputSchema: DailyQuoteOutputSchema,
  },
  async () => {
    const {output} = await getDailyQuotePrompt();
    return output!;
  }
);

export async function getDailyQuote(): Promise<DailyQuoteOutput> {
  return getDailyQuoteFlow();
}
