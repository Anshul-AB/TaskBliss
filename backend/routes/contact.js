// contact.js
const router = require("express").Router();
const Contact = require("../models/contact");

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const contactDoc = new Contact({ name, email, phone, message });
    await contactDoc.save();
    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.log("Error submitting contact form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

