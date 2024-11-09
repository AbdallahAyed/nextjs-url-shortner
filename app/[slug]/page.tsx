import { getUrlById } from "@/actions/urls-actions";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const url = await getUrlById(params.slug);

  redirect(url);
}
