const express = require("express");
const app = express();
const eurekaClient = require("./eureka/eureka-client");

require("dotenv").config();

const premiumRoutes = require("./routes/premium");
const userRoutes = require("./routes/user");

app.use(express.json());

app.get("/", (req, res) =>
  res.send({ status: "ok", message: "BusinessCommun API" }),
);

app.use("/api/premium", premiumRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  // ✅ REGISTER WITH EUREKA AFTER SERVER STARTS
  eurekaClient.start((error) => {
    if (error) {
      console.error("❌ Eureka registration failed:", error);
    } else {
      console.log("✅ Registered with Eureka");
    }
  });
});

// ✅ GRACEFUL SHUTDOWN (VERY IMPORTANT)
process.on("SIGINT", () => {
  console.log("Shutting down...");
  eurekaClient.stop(() => {
    console.log("🛑 Deregistered from Eureka");
    process.exit();
  });
});
