import axios from "axios";
import { parse } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Return a 405 Method Not Allowed if the method is not GET.
  }

  const cookies = parse(req.headers.cookie || "");
  const usertoken = cookies.usertoken;

  if (!usertoken) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/getUserDetails",
    headers: {
      Authorization: `Token ${usertoken}`
    }
  };

  try {
    const response = await axios.request(config);
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}