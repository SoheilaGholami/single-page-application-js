import express from "express";
import path from "path";

const app = express();
app.get("/*", (req, res) => {
  
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(process.env.PORT || 8000, () => console.log("server is running"));
