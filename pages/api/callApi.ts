import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

export const getDatas = async (url: string) => {
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  try {
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error: any) {
    console.error(error);
    let err = error;
    if (error.response) {
      err = `[${error.response.status}] ${error.response.data.msg}`;
    }
    return err;
  }
};
