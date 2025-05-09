import { END_POINTS } from "../../constants/endPoints";
import axios from "axios";

export const createFormService = async (formPayload) => {
  const response = await axios.post(END_POINTS.CREATE_FORM, formPayload);
  return response.data;
};
