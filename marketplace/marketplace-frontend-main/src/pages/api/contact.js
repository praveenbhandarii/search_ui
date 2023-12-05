import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, phone, query } = req.body;

      // You can perform any validation or data processing here.

      const data = {
        name,
        email,
        phone,
        query
      };

      const config = {
        method: "post",
        url: "http://127.0.0.1:8000/contact_us",
        headers: {
          "Content-Type": "application/json"
        },
        data
      };

      const response = await axios(config);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
