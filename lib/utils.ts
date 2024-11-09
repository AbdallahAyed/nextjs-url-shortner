import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodeURL(url: string) {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

export function encodeUrl(url: string) {
  //+
  let hash = 0; //+
  for (let i = 0; i < url.length; i++) {
    //+
    const char = url.charCodeAt(i); //+
    hash = (hash << 5) - hash + char; //+
    hash |= 0; // Convert to 32-bit integer//+
  }
}
