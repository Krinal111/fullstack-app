import { PoolClient } from "pg";
import {
  constructInsertQuery,
  constructUpdateQuery,
} from "../helpers/functions";

export function getSearchQuery(
  searchValue = "",
  searchEntity: string[],
  isIncludeWhere = true
) {
  if (!searchValue) {
    return "";
  }
  let query = isIncludeWhere ? " WHERE (" : "";
  searchEntity.forEach((entity, index) => {
    query += `LOWER(CAST(${entity} as TEXT)) LIKE LOWER('%${searchValue}%')`;
    query += index === searchEntity.length - 1 ? "" : " OR ";
  });
  query = isIncludeWhere ? query + ")" : query + "";
  return query;
}

const getTable = async (db: PoolClient, table: string) => {
  const query = `SELECT * FROM ${table}`;
  const resp = await db.query(query);
  return !resp ? null : resp.rows;
};

const getTableData = async (
  db: PoolClient,
  table: string,
  pagination: {
    limit: number;
    page: number;
    sort: string;
    search: string;
    projection: string[];
    widgetType?: string;
  },
  name?: string // 👈 changed from user_name
) => {
  try {
    const { limit, page, sort = "ASC", search, projection = "*" } = pagination;

    let searchQuery = "";
    if (search && projection !== "*") {
      searchQuery = getSearchQuery(search, projection, false);
    }

    // ===== COUNT QUERY =====
    const count = await db.query(
      `SELECT COUNT(*) AS total_count FROM ${table} ${
        table === "users"
          ? `WHERE name != '${name}' AND name NOT IN ('superadmin', 'adminUser')${
              searchQuery ? ` AND (${searchQuery})` : ""
            }`
          : searchQuery
          ? `WHERE (${searchQuery})`
          : ""
      }`
    );

    const total_count = count.rows[0]?.total_count || 0;

    // ===== DATA QUERY =====
    let query: string = `SELECT ${
      Array.isArray(projection) ? projection.join(",") : projection
    } FROM ${table} ${
      table === "users"
        ? `WHERE name != '${name}' AND name NOT IN ('superadmin', 'adminUser')${
            searchQuery ? ` AND (${searchQuery})` : ""
          }`
        : searchQuery
        ? `WHERE (${searchQuery})`
        : ""
    } ORDER BY created_at ${sort}
    `;

    if (limit) {
      const offset = (page - 1) * limit;
      query = query + `LIMIT ${limit} OFFSET ${offset}`;
    }

    const resp = await db.query(query);
    return !resp ? null : { rows: resp?.rows, total_count };
  } catch (err) {
    console.error(`Error in get request of ${table} : ${err}`);
    throw err;
  }
};

const addTableData = async (
  db: PoolClient,
  table: string,
  tableData: object
) => {
  try {
    const { insertQuery, values } = constructInsertQuery(tableData);
    let query: string = `INSERT INTO ${table} ${insertQuery} RETURNING *`;
    const resp = await db.query(query, values);
    return !resp ? null : { rows: resp.rows };
  } catch (err) {
    console.error(`Error Adding ${table} data : ${err}`);
    throw err;
  }
};

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

const deleteTableData = async (db: PoolClient, id: object, table: string) => {
  try {
    const key = Object.keys(id)[0];
    const value = Object.values(id)[0];
    let query: string = `DELETE FROM ${table} WHERE ${key} = ${
      typeof value === "string" ? `'${value}'` : `${value}`
    } RETURNING *`;
    const resp = await db.query(query);
    return !resp ? null : { rows: resp.rows };
  } catch (err) {
    console.error(`Error in delete request of ${table} : ${err}`);
    throw err;
  }
};

export {
  getTable,
  getTableData,
  addTableData,
  updateTableData,
  deleteTableData,
};
