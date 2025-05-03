const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");
const FormData = require("form-data");
const app = express();
const bodyParser = require("body-parser");
const petClinicRoutes = require("./src/routes/routes");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/pet-clinic", petClinicRoutes);

const upload = multer(); // store in memory
app.use(cors());

app.post("/predict", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    console.log("============ File received");

    const formData = new FormData();
    formData.append("file", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    console.log("============ Sending to Flask");

    const response = await axios.post(
      "http://localhost:5000/predict",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    console.log("============ Flask responded");

    res.json(response.data);
  } catch (err) {
    // console.error("============ Error:", err.message);
    console.log("============ Error:", err);

    res.status(500).json({ error: "Prediction failed" });
  }
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log("Node.js API running at http://localhost:" + PORT);
});
