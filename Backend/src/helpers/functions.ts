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
