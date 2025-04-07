import { differenceInYears, formatDistance } from "date-fns";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ZodIssue } from "zod";
import { format } from "date-fns";
import { form } from "@heroui/react";
export function calAge(dob: Date) {
  return differenceInYears(new Date(), dob);
}

export function formatShortDate(date: Date) {
  return format(date, "dd MMM yy h:mm:a");
}
export function handleFormServerErrors<TFieldValues extends FieldValues>(
  errorResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>
) {
  if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((e) => {
      const fieldName = e.path.join(".") as Path<TFieldValues>;
      setError(fieldName, { message: e.message });
    });
  } else {
    setError("root.serverError", { message: errorResponse.error });
  }
}

export function transformImgUrl(imageUrl: string | null) {
  if (!imageUrl) return null;

  if (!imageUrl.includes("cloudinary")) return imageUrl;

  const uploadIndex = imageUrl.indexOf("/upload/") + "/upload/".length;

  const transformation = "c_fill,h_300,w_300,g_faces/";

  return `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(uploadIndex)}`;
}

export function truncateString(text?: string | null, num = 30) {
  if (!text) return null;
  if (text.length <= 30) return text;
  return text.slice(0, num) + "...";
}
export function createChatId(a: string, b: string) {
  return a > b ? `${b}-${a}` : `${a}-${b}`;
}


export function timeAgo(date: string) {
  return formatDistance(new Date(date), new Date()) + ' ago'
}