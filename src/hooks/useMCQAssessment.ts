import { useState, useEffect } from 'react';

export interface Question {
  id: string;
  category: string;
  text: string;
  options: string[];
}

export type QuestionStatus = 'unanswered' | 'answered' | 'skipped' | 'marked';

export interface AssessmentState {
  answers: Record<string, number>;
  statuses: Record<string, QuestionStatus>;
  timeRemaining: number;
  currentQuestionIndex: number;
}

const STORAGE_KEY = 'nexus_mcq_session';
const DEFAULT_TIME = 15; // 15 seconds per question

export function useMCQAssessment(questions: Question[], email: string) {
  const STORAGE_KEY = `nexus_mcq_session_${email}`;
  const [state, setState] = useState<AssessmentState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.currentQuestionIndex !== 'number' || parsed.currentQuestionIndex >= questions.length || parsed.currentQuestionIndex < 0) {
          parsed.currentQuestionIndex = 0;
        }
        if (typeof parsed.timeRemaining !== 'number' || parsed.timeRemaining > DEFAULT_TIME || parsed.timeRemaining < 0) {
          parsed.timeRemaining = DEFAULT_TIME;
        }
        if (!parsed.answers) parsed.answers = {};
        if (!parsed.statuses) parsed.statuses = {};
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved session', e);
      }
    }
    return {
      answers: {},
      statuses: {},
      timeRemaining: DEFAULT_TIME,
      currentQuestionIndex: 0
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, STORAGE_KEY]);

  useEffect(() => {
    if (state.timeRemaining <= 0) return;
    const interval = setInterval(() => {
      setState(s => ({ ...s, timeRemaining: s.timeRemaining - 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [state.timeRemaining]);

  const answerQuestion = (questionId: string, optionIndex: number) => {
    setState(s => ({
      ...s,
      answers: { ...s.answers, [questionId]: optionIndex },
      statuses: { ...s.statuses, [questionId]: 'answered' }
    }));
  };

  const markQuestion = (questionId: string) => {
    setState(s => ({
      ...s,
      statuses: { ...s.statuses, [questionId]: 'marked' }
    }));
  };

  const skipQuestion = (questionId: string) => {
    setState(s => ({
      ...s,
      statuses: { ...s.statuses, [questionId]: 'skipped' }
    }));
  };

  const goToNext = () => {
    if (state.currentQuestionIndex < questions.length - 1) {
      setState(s => ({ ...s, currentQuestionIndex: s.currentQuestionIndex + 1, timeRemaining: DEFAULT_TIME }));
    }
  };

  const goToPrevious = () => {
    if (state.currentQuestionIndex > 0) {
      setState(s => ({ ...s, currentQuestionIndex: s.currentQuestionIndex - 1 }));
    }
  };

  const jumpToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setState(s => ({ ...s, currentQuestionIndex: index }));
    }
  };

  const clearSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      answers: {},
      statuses: {},
      timeRemaining: DEFAULT_TIME,
      currentQuestionIndex: 0
    });
  };

  return {
    state,
    answerQuestion,
    markQuestion,
    skipQuestion,
    goToNext,
    goToPrevious,
    jumpToQuestion,
    clearSession,
    currentQuestion: questions[state.currentQuestionIndex]
  };
}
