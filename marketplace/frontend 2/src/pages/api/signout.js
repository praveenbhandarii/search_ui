import axios from "axios";
import { parse } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Return a 405 Method Not Allowed if the method is not GET.
  }

  const cookies = parse(req.headers.cookie || "");
  const usertoken = cookies.usertoken;

  if (!usertoken) {
    return res.status(401).json({ error: "Authentication required" });
  }

  // Send a request to the logout API endpoint.
  const config = {
    method: "get",
    url: "http://127.0.0.1:8000/logout",
    headers: {
      Authorization: `Token ${usertoken}`,
    },
  };

  try {
    await axios.request(config);
    res.status(204).end(); // Successful sign-out, return a 204 No Content status
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during sign-out" });
  }
}
