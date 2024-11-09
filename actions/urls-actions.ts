"use server";

import { db } from "@/db/drizzle";
import { urls } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUrls = async () => {
  const data = await db.select().from(urls);
  return data;
};

export const addUrl = async (url: string, urlCode: string) => {
  await db.insert(urls).values({ path: url, code: urlCode });
};

export const getUrlById = async (urlCode: string) => {
  const url = await db
    .select({ path: urls.path })
    .from(urls)
    .where(eq(urls.code, urlCode));

  return url[0].path;
};

export const doesUrlExist = async (path: string) => {
  const url = await db.select().from(urls).where(eq(urls.path, path)).limit(1);

  return url.length > 0;
};
