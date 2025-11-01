'use server';

/**
 * @fileOverview AI-powered study goal suggestion flow.
 *
 * - suggestStudyGoals - A function that suggests personalized study goals based on syllabus completion and exam date.
 * - SuggestStudyGoalsInput - The input type for the suggestStudyGoals function.
 * - SuggestStudyGoalsOutput - The return type for the suggestStudyGoals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestStudyGoalsInputSchema = z.object({
  syllabusCompletionPercentage: z
    .number()
    .describe('The percentage of the syllabus that the student has completed.'),
  daysRemaining: z
    .number()
    .describe('The number of days remaining until the NEET UG exam.'),
  customizationPreferences: z
    .string()
    .optional()
    .describe('Any customization preferences specified by the user.'),
});
export type SuggestStudyGoalsInput = z.infer<typeof SuggestStudyGoalsInputSchema>;

const SuggestStudyGoalsOutputSchema = z.object({
  suggestedGoals: z
    .string()
    .describe('A list of suggested daily study goals, tailored to the student.'),
});
export type SuggestStudyGoalsOutput = z.infer<typeof SuggestStudyGoalsOutputSchema>;

export async function suggestStudyGoals(input: SuggestStudyGoalsInput): Promise<SuggestStudyGoalsOutput> {
  return suggestStudyGoalsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStudyGoalsPrompt',
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
    const {output} = await prompt(input);
    return output!;
  }
);
