import { END_POINTS } from "../../constants/endPoints";
import axios from "axios";

export const createFormService = async (formPayload) => {
  const response = await axios.post(END_POINTS.CREATE_FORM, formPayload);
  return response.data;
};

// get all forms
export const getAllFormsService = async () => {
  const response = await axios.get(END_POINTS.GET_ALL_FORMS);
  return response.data;
};

// form submit response service
export const submitFormResponseService = async (responsePayload) => {
  const response = await axios.post(END_POINTS.SUBMIT_FORM_RESPONSE, responsePayload);
  return response.data;
};

// all responses service
export const getAllFormResponsesService = async () => {
  const response = await axios.get(END_POINTS.GET_ALL_FORM_RESPONSES);
  return response.data;
};