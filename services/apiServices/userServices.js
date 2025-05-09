import axios from "axios";
import { END_POINTS } from "../../constants/endPoints";

export const createUserService = async (userData) => {
  const response = await axios.post(END_POINTS.CREATE_USER, userData);
  return response.data;
};

export const getAllUsersService = async () => {
  const response = await axios.get(END_POINTS.GET_ALL_USERS);
  return response.data;
};
