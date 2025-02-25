"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { translations, type Language } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

// Create a schema for journal validation
const journalSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  field: z.string().min(2, {
    message: "Field must be at least 2 characters.",
  }),
  issn: z.string().regex(/^\d{4}-\d{4}$/, {
    message: "ISSN must be in format XXXX-XXXX.",
  }),
  frequency: z.string({
    required_error: "Please select a publication frequency.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  publisher: z.string().min(2, {
    message: "Publisher must be at least 2 characters.",
  }),
  status: z.enum(["active", "inactive", "pending"], {
    required_error: "Please select a status.",
  }),
})

type JournalFormValues = z.infer<typeof journalSchema>

// Default values for the form
const defaultValues: Partial<JournalFormValues> = {
  title: "",
  field: "",
  issn: "",
  frequency: "",
  description: "",
  publisher: "",
  status: "active",
}

interface JournalFormProps {
  lang: Language
  initialData?: JournalFormValues
}

export function JournalForm({ lang, initialData }: JournalFormProps) {
  const t = translations[lang].admin.journals
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form with react-hook-form
  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalSchema),
    defaultValues: initialData || defaultValues,
  })

  // Handle form submission
  async function onSubmit(data: JournalFormValues) {
    setIsSubmitting(true)

    try {
      // In a real application, this would be an API call
      console.log("Journal data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Journal created",
        description: "The journal has been created successfully.",
      })

      // Redirect back to journals list
      router.push(`/${lang}/admin/journals`)
      router.refresh()
    } catch (error) {
      console.error("Error creating journal:", error)
      toast({
        title: "Error",
        description: "There was an error creating the journal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Frequency options
  const frequencyOptions = [
    { value: "weekly", label: "Weekly" },
    { value: "biweekly", label: "Bi-weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "bimonthly", label: "Bi-monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "semiannually", label: "Semi-annually" },
    { value: "annually", label: "Annually" },
  ]

  // Status options
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending Review" },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Journal Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter journal title" {...field} />
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
                <FormLabel>Research Field</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Medicine, Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISSN</FormLabel>
                <FormControl>
                  <Input placeholder="XXXX-XXXX" {...field} />
                </FormControl>
                <FormDescription>International Standard Serial Number (e.g. 1234-5678)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publication Frequency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input placeholder="Publisher name" {...field} />
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
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter journal description" className="min-h-[120px]" {...field} />
              </FormControl>
              <FormDescription>Brief description of the journal's scope and focus</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${lang}/admin/journals`)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Creating..." : "Create Journal"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

