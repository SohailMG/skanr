const express = require("express");
const cors = require("cors");
const app = express();
const { ImageAnnotatorClient } = require("@google-cloud/vision").v1;
app.use(cors());

//
app.get("/annotate/images", (req, res) => {});

app.listen(5000, () => console.log("Server up"));
