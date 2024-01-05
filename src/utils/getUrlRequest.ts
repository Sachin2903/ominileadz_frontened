import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BASE_URL!;

type IProps = {
  path: string;
};

export const getUrlRequest = async (path: IProps) => {
  const response = await axios.get(`${URL}${path}`);
  return response;
};
