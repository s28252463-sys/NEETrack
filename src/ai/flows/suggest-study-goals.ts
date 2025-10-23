'use server';

/**
 * @fileOverview AI-powered study goal suggestion flow.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {
  SuggestStudyGoalsInput,
  SuggestStudyGoalsInputSchema,
  SuggestStudyGoalsOutput,
  SuggestStudyGoalsOutputSchema,
} from '@/ai/schemas';

const suggestStudyGoalsPrompt = ai.definePrompt({
  name: 'suggestStudyGoalsPrompt',
  model: googleAI.model('gemini-1.5-flash-latest'),
  input: {schema: SuggestStudyGoalsInputSchema},
  output: {schema: SuggestStudyGoalsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized daily study goals for NEET UG aspirants.

  Based on the student's syllabus completion percentage ({{{syllabusCompletionPercentage}}}), the number of days remaining until the exam ({{{daysRemaining}}}), and any customization preferences they may have ({{{customizationPreferences}}}), suggest a list of daily study goals that will help them stay on track and manage their time effectively.

  The study goals should be specific, measurable, achievable, relevant, and time-bound (SMART).

  Provide the study goals in a clear and concise manner.
  `,
});

const suggestStudyGoalsFlow = ai.defineFlow(
  {
    name: 'suggestStudyGoalsFlow',
    inputSchema: SuggestStudyGoalsInputSchema,
    outputSchema: SuggestStudyGoalsOutputSchema,
  },
  async input => {
    const {output} = await suggestStudyGoalsPrompt(input);
    return output!;
  }
);

export async function suggestStudyGoals(
  input: SuggestStudyGoalsInput
): Promise<SuggestStudyGoalsOutput> {
  return suggestStudyGoalsFlow(input);
}
