"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const journalFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not be longer than 100 characters.",
    }),
  field: z.string({
    required_error: "Please select a field.",
  }),
  issn: z
    .string()
    .min(9, {
      message: "ISSN must be in the format XXXX-XXXX",
    })
    .max(9, {
      message: "ISSN must be in the format XXXX-XXXX",
    })
    .regex(/^\d{4}-\d{4}$/, {
      message: "ISSN must be in the format XXXX-XXXX",
    }),
  frequency: z.string({
    required_error: "Please select a frequency.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(1000, {
      message: "Description must not be longer than 1000 characters.",
    }),
  status: z.string({
    required_error: "Please select a status.",
  }),
  coverImage: z.any().optional(),
})

type FormData = z.infer<typeof journalFormSchema>

const fields = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Medicine",
  "Engineering",
  "Social Sciences",
  "Arts & Humanities",
  "Business & Economics",
] as const

const frequencies = [
  "Weekly",
  "Biweekly",
  "Monthly",
  "Bimonthly",
  "Quarterly",
  "Triannually",
  "Biannually",
  "Annually",
] as const

const statuses = ["active", "inactive", "draft"] as const

interface JournalFormEditProps {
  journal: {
    id: string
    title: string
    field: string
    issn: string
    frequency: string
    description: string
    status: string
    coverImage?: string
  }
  translations: {
    title: string
    field: string
    issn: string
    frequency: string
    description: string
    status: string
    submit: string
    cancel: string
    success: string
    error: string
  }
}

export function JournalFormEdit({ journal, translations }: JournalFormEditProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = React.useState(journal.coverImage)

  const form = useForm<FormData>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      title: journal.title,
      field: journal.field,
      issn: journal.issn,
      frequency: journal.frequency,
      description: journal.description,
      status: journal.status,
    },
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      toast({
        title: "Success",
        description: translations.success,
      })

      // Redirect back to journals list
      router.push(`/${window.location.pathname.split("/")[1]}/admin/journals`)
      router.refresh()
    } catch (error) {
      // Show error message
      toast({
        title: "Error",
        description: translations.error,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.title}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.field}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fields.map((fieldOption) => (
                        <SelectItem key={fieldOption} value={fieldOption}>
                          {fieldOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.issn}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="XXXX-XXXX" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.frequency}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {frequencies.map((frequency) => (
                        <SelectItem key={frequency} value={frequency}>
                          {frequency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.description}</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[150px]" />
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
                  <FormLabel>{translations.status}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        {...field}
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleFileChange(e)
                          onChange(e.target.files?.[0])
                        }}
                      />
                      {previewImage && (
                        <div className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-lg border">
                          <Image
                            src={previewImage || "/placeholder.svg"}
                            alt="Cover preview"
                            className="object-cover"
                            fill
                            sizes="200px"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a cover image for the journal. Recommended size: 300x400 pixels.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translations.submit}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            {translations.cancel}
          </Button>
        </div>
      </form>
    </Form>
  )
}

