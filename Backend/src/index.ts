import { PoolClient } from "pg";
import app from "./app";
import { PORT } from "./config/config";
import { connectToDB } from "./config/postgres";
import handler from "./middlewares/reqHandler";

app.listen(PORT, async () => {
  const db: PoolClient | undefined = await connectToDB();
  handler(app, db);
  console.log(!db ? "Error in DB Connection." : "Database connected : " + db);
  console.log(`Server running on port ${PORT}`);
});
