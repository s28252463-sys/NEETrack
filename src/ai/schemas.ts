import {z} from 'genkit';

/**
 * @fileOverview Zod schemas for AI flows.
 */

// Schema for suggestStudyGoals flow
export const SuggestStudyGoalsInputSchema = z.object({
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

export const SuggestStudyGoalsOutputSchema = z.object({
  suggestedGoals: z
    .string()
    .describe('A list of suggested daily study goals, tailored to the student.'),
});
export type SuggestStudyGoalsOutput = z.infer<typeof SuggestStudyGoalsOutputSchema>;

// Schema for getDailyQuote flow
export const DailyQuoteOutputSchema = z.object({
  quote: z.string().describe('The motivational quote.'),
  author: z.string().describe('The author of the quote (can be "Anonymous").'),
});
export type DailyQuoteOutput = z.infer<typeof DailyQuoteOutputSchema>;
