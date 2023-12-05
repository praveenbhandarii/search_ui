import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const { action } = req.body;

    if (action === "sendOTP") {
      // Handle sending OTP here
      const { email } = req.body;
      const otpdata = {
        emailid: email,
      };

      let otpconfig = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/generate_otp/",
        headers: {
          "Content-Type": "application/json",
        },
        data: otpdata,
      };

      try {
        const response = await axios.request(otpconfig);
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else if (action === "checkOTP") {
      // Handle checking OTP here
      const { email, otp } = req.body;
      const otpcheckdata = {
        emailid: email,
        otp,
      };

      const otpcheckconfig = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/client_login/",
        headers: {
          "Content-Type": "application/json",
        },
        data: otpcheckdata,
      };

      try {
        const response = await axios.request(otpcheckconfig);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.status(400).json({ error: "Invalid action" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
