"use client"

import type React from "react"

import { useRef, useState } from "react"
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
import { Loader2, File, Upload, X } from "lucide-react"
import Image from "next/image"
import { createJournal } from "@/app/actions/journal"

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
  file: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => {
        return (
          !files ||
          files.length === 0 ||
          Array.from(files).every((file) =>
            ["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(file.type),
          )
        )
      },
      {
        message: "File must be an image (JPEG, PNG) or PDF document.",
      },
    ),
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
  // file is handled separately since it can't be initialized with a value
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

  // Add this ref inside the JournalForm component, before the return statement
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Add this state inside the JournalForm component, before the return statement
  const [filePreview, setFilePreview] = useState<string | null>(null)

  // Add this function inside the JournalForm component, before the return statement
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files)
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }
  }

  // Add this function inside the JournalForm component, before the return statement
  function clearFile(onChange: (...event: any[]) => void) {
    onChange(undefined)
    setFilePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Handle form submission
  async function onSubmit(data: JournalFormValues) {
    setIsSubmitting(true)

    try {
      // In a real application, this would be an API call
      console.log("Journal data:", data)

      // Handle file upload
      if (data.file && data.file.length > 0) {
        const file = data.file[0]
        console.log("File to upload:", file.name, file.type, file.size)
        // In a real application, you would upload the file to a storage service
        // For example:
        // const formData = new FormData()
        // formData.append('file', file)
        // await fetch('/api/upload', { method: 'POST', body: formData })
      }

      const formData = new FormData()
        Object.keys(data).forEach((key) => {
          if (key === "file") {
            if (data.file && data.file.length > 0) {
              formData.append(key, data.file[0])
            }
          } else {
            const value = data[key as keyof JournalFormValues];
            if (value instanceof FileList) {
              formData.append(key, value[0]);
            } else {
              formData.append(key, value ?? '');
            }
          }
        })

        console.log(formData, "<--formData");

        const jounral = await createJournal(formData);

      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1000))

      if(jounral) {
        toast({
          title: "Journal created",
          description: "The journal has been created successfully.",
        })
  
        // Redirect back to journals list
        router.push(`/${lang}/admin/journals`)
        router.refresh()
      }
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
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
    { value: "Other", label: "Other" },
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

          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Journal Cover or Document</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-9"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                      {value && value.length > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => clearFile(onChange)}
                          className="h-9"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Clear
                        </Button>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                        onChange={(e) => {
                          handleFileChange(e, onChange)
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0]
                            if (file.type.startsWith("image/")) {
                              const url = URL.createObjectURL(file)
                              setFilePreview(url)
                            } else {
                              setFilePreview(null)
                            }
                          }
                        }}
                      />
                    </div>
                    {value && value.length > 0 && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <File className="h-4 w-4" />
                        {value[0].name} ({Math.round(value[0].size / 1024)} KB)
                      </div>
                    )}
                    {filePreview && (
                      <div className="mt-2 relative h-40 w-40 overflow-hidden rounded-md border">
                        <Image
                          src={filePreview || "/placeholder.svg"}
                          alt="File preview"
                          fill
                          className="object-cover"
                          onLoad={() => {
                            URL.revokeObjectURL(filePreview)
                          }}
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>Upload a journal cover image (JPEG, PNG) or document (PDF)</FormDescription>
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