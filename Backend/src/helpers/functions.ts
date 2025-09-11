import bcrypt from "bcryptjs";

export const hashPassword = (rawPassword: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(rawPassword, 10, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        reject(err);
      } else {
        resolve(hash as string);
      }
    });
  });
};

export const compareHashPassword = async (
  rawPassword: string,
  hashString: string
) => {
  const result = await bcrypt.compare(rawPassword, hashString);
  return result;
};

export const constructUpdateQuery = (obj: object) => {
  const setClause = Object.keys(obj)
    .map((val: string, i: number) => `${val} = $${i + 1}`)
    .join(", ");

  return setClause;
};

export const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter, index) => {
    return index === 0 ? letter.toLowerCase() : `_${letter.toLowerCase()}`;
  });
};

export const constructInsertQuery = (obj: object) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const columns = keys.map(toSnakeCase).join(", ");
  const vals = values.map((val, i) => `$${i + 1}`).join(", ");
  return { insertQuery: `(${columns}) VALUES (${vals})`, values };
};

export function normalizePath(path: string): string {
  path = path.replace(/\/$/, "");

  path = path.replace(/\/\d+$/, "/{id}");

  path = path.replace(/\/[0-9a-fA-F-]{36}$/, "/{id}");

  return path;
}
