'use server';

import {suggestStudyGoals} from '@/ai/flows/suggest-study-goals';
import {getDailyQuote as getDailyQuoteFlow} from '@/ai/flows/get-daily-quote';
import {z} from 'zod';
import {
  SuggestStudyGoalsInputSchema,
  SuggestStudyGoalsInput,
} from '@/ai/schemas';

export async function getStudyPlan(data: SuggestStudyGoalsInput) {
  try {
    const validatedData = SuggestStudyGoalsInputSchema.parse(data);
    const result = await suggestStudyGoals(validatedData);
    if (!result.suggestedGoals) {
      return {
        success: false,
        error: 'AI could not generate a plan. Please try again.',
      };
    }
    return {success: true, goals: result.suggestedGoals};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {success: false, error: 'Invalid input provided.'};
    }
    console.error('Error getting study plan:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while generating the study plan.',
    };
  }
}

export async function getDailyQuoteAction() {
  try {
    const result = await getDailyQuoteFlow();
    if (!result || !result.quote) {
      return {
        success: false,
        error: 'Could not generate a quote. Please try again.',
      };
    }
    return {success: true, quote: result.quote, author: result.author};
  } catch (error: any) {
    console.error('Error getting daily quote:', error.message || error);
    return {
      success: false,
      error: 'An unexpected error occurred while generating the quote.',
    };
  }
}
