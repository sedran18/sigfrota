import {z} from "zod";

export const DateSchema = z.string().pipe(
  z.transform((val) => {
    if (!val || val.trim() === "") return undefined;
    const dateStr = val.includes("T") ? val : `${val}T00:00:00`;
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  })
).pipe(z.date());
export type DateType = z.infer<typeof DateSchema>;
