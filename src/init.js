import "./db.js";
import "./models/Food.js";
import app from "./server.js";

const port = 3500;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${port} 🚀`);

app.listen(port, handleListening);
