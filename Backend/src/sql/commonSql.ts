import { PoolClient } from "pg";
import { constructUpdateQuery } from "../helpers/functions";

const updateTableData = async (
  db: PoolClient,
  id: object,
  table: string,
  tableData: object
) => {
  try {
    const key = Object.keys(id)[0];
    const value = Object.values(id)[0];
    let query: string = `UPDATE ${table} SET ${constructUpdateQuery(
      tableData
    )} WHERE ${key} = ${
      typeof value === "string" ? `'${value}'` : value
    } RETURNING *`;
    const resp = await db.query(query, Object.values(tableData));
    return !resp ? null : { rows: resp.rows };
  } catch (err) {
    console.error(`Error in update request of ${table} : ${err}`);
    throw err;
  }
};

export { updateTableData };
