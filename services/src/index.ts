import "dotenv/config";
import { configureModel } from "#root/models/model.configurations";
import sequelize from "#root/db/connection";
import "#root/server/startServer";

configureModel(sequelize);
