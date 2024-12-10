import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

interface FeedbackProps {
  is_deleted: boolean;
}
export const feedbackApi = {
  hide(payload: FeedbackProps, id: number) {
    return axiosInstance.put(`${urls.FEEDBACKS}/${id}`, {
      data: payload,
    });
  },
  delete(id: number) {
    return axiosInstance.delete(`${urls.FEEDBACKS}/${id}`);
  },
};
