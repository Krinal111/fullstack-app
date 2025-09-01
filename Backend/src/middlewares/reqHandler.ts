import express, { type Application } from "express";
import bodyParser from "body-parser";
import { PoolClient } from "pg";
import { router } from "../routes";

const handler = (app: Application, db: PoolClient | undefined) => {
  app.locals.db = db;
  if (!db) {
    app.use((req, res) => {
      res.status(500).json({ error: "Database connection error" });
    });
  }
  app.use(express.json(), bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
    app.use("/api", router);

};

export default handler;
