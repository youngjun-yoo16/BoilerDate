const mongoose = require("mongoose");
const pdfSchema = new mongoose.Schema({
  name: String,
  email: String,
  pdfFile: {
    data: Buffer,
    contentType: String,
  },
});

const PdfModel = mongoose.model("Significant_pdf_files", pdfSchema);
module.exports = PdfModel;
