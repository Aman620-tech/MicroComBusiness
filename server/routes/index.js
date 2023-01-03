const express = require("express");
const routes = express.Router();
const adminRoutes = require("./admin.routes");
const userRoutes = require("./user.routes");


const businessRoutes = require("./business.routes");
// const businessUserRoutes = require("./businessUser.routes");


routes.use("/admin", adminRoutes);
routes.use("/business", businessRoutes);
// routes.use("/business", businessRoutes);
// routes.use("/delivery", deliveryRoutes);
routes.use("/", userRoutes);
// routes.use("/user", userRoutes);

// routes.use("/", userRoutes);
// routes.use("/", adminRoutes);

module.exports = routes;
