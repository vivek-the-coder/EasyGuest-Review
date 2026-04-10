'use client';

import { useState, useCallback } from 'react';

interface ReviewState {
  review: string | null;
  loading: boolean;
  error: string | null;
  copied: boolean;
  retryCount: number;
}

interface UseReviewGeneratorReturn {
  state: ReviewState;
  generateReview: () => Promise<void>;
  copyToClipboard: () => Promise<void>;
  reset: () => void;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export function useReviewGenerator(): UseReviewGeneratorReturn {
  const [state, setState] = useState<ReviewState>({
    review: null,
    loading: false,
    error: null,
    copied: false,
    retryCount: 0
  });

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const generateReviewWithRetry = async (attempt: number = 0): Promise<string> => {
    try {
      const response = await fetch('/api/generate-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate review');
      }
      
      return data.review;
    } catch (error) {
      if (attempt < MAX_RETRIES - 1) {
        console.log(`Retry attempt ${attempt + 1}/${MAX_RETRIES}...`);
        await sleep(RETRY_DELAY * (attempt + 1));
        return generateReviewWithRetry(attempt + 1);
      }
      throw error;
    }
  };

  const generateReview = useCallback(async () => {
    setState(prev => ({ 
      ...prev, 
      loading: true, 
      error: null,
      retryCount: 0 
    }));
    
    try {
      const review = await generateReviewWithRetry();
      setState(prev => ({ 
        ...prev, 
        review, 
        loading: false,
        retryCount: 0 
      }));
    } catch (error) {
      console.error('Error generating review:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        loading: false,
        retryCount: MAX_RETRIES 
      }));
    }
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!state.review) return;
    
    try {
      await navigator.clipboard.writeText(state.review);
      setState(prev => ({ ...prev, copied: true }));
      setTimeout(() => setState(prev => ({ ...prev, copied: false })), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, [state.review]);

  const reset = useCallback(() => {
    setState({
      review: null,
      loading: false,
      error: null,
      copied: false,
      retryCount: 0
    });
  }, []);

  return {
    state,
    generateReview,
    copyToClipboard,
    reset
  };
}
