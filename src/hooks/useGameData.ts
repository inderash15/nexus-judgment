import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerOrResumeStudent,
  submitGuess,
  adminGetDashboardData,
  adminUpdateQuestion,
  adminBulkUploadQuestions,
  adminUpdateStudentLock,
} from "@/lib/server-fns";

// Game hooks
export function useRegisterOrResume() {
  return useMutation({
    mutationFn: (data: { name: string; email: string; department: string }) =>
      registerOrResumeStudent({ data }),
  });
}

export function useSubmitGuess() {
  return useMutation({
    mutationFn: (data: { email: string; guess: string }) => submitGuess({ data }),
  });
}

// Admin hooks
export function useDashboardData() {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => adminGetDashboardData(),
    staleTime: 30000, // 30 seconds
    refetchInterval: 15000, // Auto-refresh every 15s for live data
  });
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { action: string; question: any }) => adminUpdateQuestion({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
  });
}

export function useBulkUploadQuestions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any[]) => adminBulkUploadQuestions({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
  });
}

export function useUpdateStudentLock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { email: string; locked: boolean; status: string }) =>
      adminUpdateStudentLock({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await adminGetDashboardData();
      return res.students.sort((a: any, b: any) => b.score - a.score || a.timeTaken - b.timeTaken);
    },
    staleTime: 10000,
  });
}
