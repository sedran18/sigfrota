import {z} from "zod";

export const DateSchema = z.coerce.date();
export type DateType = z.infer<typeof DateSchema>;
