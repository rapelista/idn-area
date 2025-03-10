import csv from "csv-parser";
import { createReadStream } from "fs";
import { ZodError } from "zod";

export async function csvParser<T>(path: string) {
  const records: T[] = [];

  await new Promise<void>((resolve, reject) => {
    createReadStream(path)
      .pipe(csv())
      .on("data", (data: T) => {
        records.push(data);
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });

  return records;
}

export function mapErrors(error: ZodError) {
  return error.errors.map(({ message, path, code }) => ({
    code,
    detail: message,
    attr: path.join(", "),
  }));
}
