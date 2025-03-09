"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { createArticle } from "@/app/actions/articles"
// import FileInput from "../FileInput"
import { useParams } from "next/navigation";

interface CreateArticleDialogProps {
  translations: {
    title: string
    description: string
    form: {
      title: string
      titlePlaceholder: string
      abstract: string
      abstractPlaceholder: string
      authors: string
      authorsPlaceholder: string
      status: string
      statusPlaceholder: string
      file: string
      filePlaceholder: string
      submit: string
    }
    success: string
    error: string
  }
  trigger: React.ReactNode
}

const statuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
]

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  abstract: z.string().min(1, "Abstract is required"),
  authors: z.string().min(1, "Authors are required"),
  status: z.string().min(1, "Status is required"),
  file: z.instanceof(File).nullable(),
})

export function CreateArticleDialog({ translations, trigger }: CreateArticleDialogProps) {
  const [open, setOpen] = React.useState(false)
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const params = useParams();
  const id = params.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      abstract: "",
      authors: "",
      status: "",
      file: null,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === "file" && value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          if (key === "authors") {
            formData.append("author", (value !== undefined && value !== null) ? value?.toString() : '');
          } else if (key === "abstract") {
            formData.append("description", (value !== undefined && value !== null) ? value?.toString() : '');
          } else {
            formData.append(key, (value !== undefined && value !== null) ? value?.toString() : '');
          }
        }
      });

      formData.append("journalId", String(id));

      startTransition(async () => {
        try {
          const result = await createArticle(formData);
          const parsedResult = JSON.parse(result);
          if (!parsedResult.success) {
            toast({
              variant: "destructive",
              description: translations.error,
            })
          } else {
            toast({
              description: translations.success,
            })
            setOpen(false)
            form.reset()
          }
        } catch (error) {
          toast({
            variant: "destructive",
            description: translations.error,
          })
          setOpen(false)
          form.reset()
        }

      });

    } catch (error) {
      toast({
        variant: "destructive",
        description: translations.error,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{translations.title}</DialogTitle>
          <DialogDescription>{translations.description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form?.title}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.form?.titlePlaceholder} disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form?.abstract}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={translations.form?.abstractPlaceholder}
                      className="h-32"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form?.authors}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.form?.authorsPlaceholder} disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form?.status}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={translations.form?.statusPlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form?.file}</FormLabel>
                  <FormControl>
                    <Input onChange={val => field.onChange(val.target.files?.[0])} id="picture" type="file" placeholder={translations.form?.filePlaceholder} disabled={isPending} />
                    {/* <FileInput
                      type="file"
                      placeholder={translations.form?.filePlaceholder}
                      disabled={isPending}
                      {...field}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {translations.form?.submit}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

