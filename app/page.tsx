import { UrlForm } from "@/components/url-form";

export default function Home() {
  return (
    <main className="">
      <section className="flex flex-col justify-center items-center h-dvh">
        <h1 className="text-4xl mb-5">URL Shortner</h1>
        <UrlForm />
      </section>
    </main>
  );
}
