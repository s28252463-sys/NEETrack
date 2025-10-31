'use server';

import { suggestStudyGoals } from '@/ai/flows/suggest-study-goals';
import { z } from 'zod';

const studyPlanSchema = z.object({
  syllabusCompletionPercentage: z.number().min(0).max(100),
  daysRemaining: z.number().min(0),
  customizationPreferences: z.string().max(500),
});


export async function getStudyPlan(data: z.infer<typeof studyPlanSchema>) {
  try {
    const validatedData = studyPlanSchema.parse(data);
    const result = await suggestStudyGoals(validatedData);
    if (!result.suggestedGoals) {
        return { success: false, error: 'AI could not generate a plan. Please try again.' };
    }
    return { success: true, goals: result.suggestedGoals };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input provided.' };
    }
    console.error('Error getting study plan:', error);
    return { success: false, error: 'An unexpected error occurred while generating the study plan.' };
  }
}
