import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import componentsRoutes from "./routes/components.routes.js";
import departmentsRoutes from "./routes/departments.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import equipmentRoutes from "./routes/equipment.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import viewRoutes from "./routes/view.routes.js";
import materialRoutes from "./routes/materiails.routes.js";
import componentRecipeRoutes from "./routes/componentRecipes.routes.js";
import equipRecipeCompRecipeRoutes from "./routes/equipRecipeCompRecipe.routes.js";
import componentRecipeMaterialsRouter from "./routes/componentRecipeMaterials.routes.js";
import equipmentRecipeRouter from "./routes/equipmentRecipe.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use("/auth", authRoutes);
app.use("/components", componentsRoutes);
app.use("/departments", departmentsRoutes);
app.use("/employees", employeesRoutes);
app.use("/projects", projectsRoutes);
app.use("/equipments", equipmentRoutes);
app.use("/budgets", budgetRoutes);
app.use("/views", viewRoutes);
app.use("/materials", materialRoutes);
app.use("/component-recipes", componentRecipeRoutes);
app.use("/equip-recipe-comp-recipe", equipRecipeCompRecipeRoutes);
app.use("/comp-recipe-mat", componentRecipeMaterialsRouter);
app.use("/equip-recipe", equipmentRecipeRouter);

app.listen(3001, () => {
  console.log("API rodando na porta 3001");
});
