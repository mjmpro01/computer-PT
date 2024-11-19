import variables from "@/utils/constants/variables";
import { create } from "zustand";

interface FeedbackStore {
  feedbackIds: string[];
  addFeedbackId: (id: string) => void;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedbackIds: JSON.parse(localStorage.getItem(variables.FEEDBACKS) || "[]"),
  addFeedbackId: (id: string) =>
    set((state) => {
      const updatedFeedbackIds = state.feedbackIds.includes(id)
        ? state.feedbackIds
        : [...state.feedbackIds, id];

      // Cập nhật localStorage sau khi thay đổi trạng thái
      localStorage.setItem(
        variables.FEEDBACKS,
        JSON.stringify(updatedFeedbackIds)
      );

      return { feedbackIds: updatedFeedbackIds };
    }),
}));
