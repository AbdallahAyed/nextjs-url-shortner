"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { encodeURL } from "@/lib/utils";
import { addUrl, doesUrlExist } from "@/actions/urls-actions";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  url: z.string().url({
    message: "Url Must be Added",
  }),
});

export function UrlForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log("Sended", data);
      const doesExist = await doesUrlExist(data.url);

      console.log(doesExist);

      if (doesExist) {
        toast("Here is your url", {
          description: `${location.origin}/${encodeURL(data.url)}`,
          action: {
            label: "Visit",
            onClick: () =>
              window.open(`${location.origin}/${encodeURL(data.url)}`),
          },
        });
      } else {
        await addUrl(data.url, encodeURL(data.url))
          .then(() => {
            toast("Here is your url", {
              description: `${location.origin}/${encodeURL(data.url)}`,
              action: {
                label: "Visit",
                onClick: () =>
                  window.open(`${location.origin}/${encodeURL(data.url)}`),
              },
            });
          })
          .catch(() => {
            toast("already exist", {
              description: `${location.origin}/${encodeURL(data.url)}`,
              action: {
                label: "Visit",
                onClick: () =>
                  window.open(`${location.origin}/${encodeURL(data.url)}`),
              },
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-1/2 flex flex-col"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className=""
                  placeholder="Paste your url here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
