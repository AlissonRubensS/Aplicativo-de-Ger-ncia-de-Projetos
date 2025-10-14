import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js"
import componentsRoutes from "./routes/components.routes.js"
import departmentsRoutes from "./routes/departments.routes.js"
import employeesRoutes from "./routes/employees.routes.js";
import projectsRoutes from "./routes/projects.routes.js"
import budgetRoutes from "./routes/budget.routes.js"
import viewRouter from "./routes/views.routes.js"

const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use("/auth", authRoutes)
app.use("/components", componentsRoutes);
app.use("/departments", departmentsRoutes);
app.use("/employees", employeesRoutes);
app.use("/projects", projectsRoutes);
app.use("/budgets", budgetRoutes);
app.use("/views", viewRouter);

app.listen(3001, () => {
  console.log("API rodando na porta 3001");
});
