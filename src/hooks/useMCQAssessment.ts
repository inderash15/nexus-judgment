import { useState, useEffect, useRef } from 'react';

export interface MCQQuestion {
  id: string;
  category: string;
  text: string;
  options: string[];
}

export interface PuzzleQuestion {
  id: string;
  type: 'puzzle';
  category: string;
  text: string;
  imageUrl: string;
  rows: number;
  cols: number;
}

export type Question = MCQQuestion | PuzzleQuestion;

export type QuestionStatus = 'unanswered' | 'answered' | 'skipped' | 'marked';

export interface AssessmentState {
  answers: Record<string, number | string>;
  statuses: Record<string, QuestionStatus>;
  timeRemaining: number;
  currentQuestionIndex: number;
}

const STORAGE_KEY = 'nexus_mcq_session';
const DEFAULT_TIME = 30; // 30 seconds per question

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

  // Single stable, drift-resistant countdown: tracks real elapsed wall-clock time
  // so backgrounded tabs don't lose time, and never re-creates the interval.
  useEffect(() => {
    let lastTick = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - lastTick) / 1000);
      if (elapsed <= 0) return;
      lastTick = now;
      setState(s =>
        s.timeRemaining <= 0 ? s : { ...s, timeRemaining: Math.max(0, s.timeRemaining - elapsed) }
      );
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const answerQuestion = (questionId: string, optionIndex: number) => {
    setState(s => ({
      ...s,
      answers: { ...s.answers, [questionId]: optionIndex },
      statuses: { ...s.statuses, [questionId]: 'answered' }
    }));
  };

  const setAnswer = (questionId: string, value: number | string) => {
    setState(s => ({
      ...s,
      answers: { ...s.answers, [questionId]: value },
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
    setAnswer,
    markQuestion,
    skipQuestion,
    goToNext,
    goToPrevious,
    jumpToQuestion,
    clearSession,
    currentQuestion: questions[state.currentQuestionIndex]
  };
}
