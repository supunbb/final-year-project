const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const markingSchemeRoutes = require("./routes/markingSchemeRoutes");
const pdfUploadRoutes = require("./routes/pdfUploadRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");

const app = express();

// Enable CORS for frontend requests (Modify origin as needed)
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// MongoDB connection setup (replace with your actual MongoDB URL)
mongoose
  .connect("mongodb+srv://supunbb:sb0272245137@pdf-reader0.yobznnh.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

// Routes
app.use("/marking-schemes", markingSchemeRoutes);
app.use("/pdf-upload", pdfUploadRoutes);
app.use("/evaluation", evaluationRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
