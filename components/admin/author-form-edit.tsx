"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { Language } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { updateAuthor } from "@/app/actions/author"

// Create a schema for author validation
const authorSchema = z.object({
    fullName: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    institution: z.string().min(2, {
        message: "Institution must be at least 2 characters.",
    }),
    researchField: z.string().min(2, {
        message: "Field must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    publicationsCount: z.coerce.number().int().min(0, {
        message: "Publications must be a non-negative number.",
    }),
    biography: z
        .string()
        .max(500, {
            message: "Bio must not exceed 500 characters.",
        })
        .optional(),
    orcidId: z
        .string()
        .regex(/^\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$/, {
            message: "ORCID must be in format XXXX-XXXX-XXXX-XXXX.",
        })
        .optional()
        .or(z.literal("")),
    status: z.enum(["active", "inactive", "pending"], {
        required_error: "Please select a status.",
    }),
})

type AuthorFormValues = z.infer<typeof authorSchema>

interface AuthorFormEditProps {
    lang: Language
    author: AuthorFormValues & {
        id: string
        photo?: {
            path: string | null,
            id: number
        }
    }
    translations: {
        edit: string
        cancel: string
        delete: string
        updating: string
        updateSuccess: string
        updateError: string
        // Add other translation keys as needed
    }
}

export function AuthorFormEdit({ lang, author, translations }: AuthorFormEditProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState<string | null>((author.photo ?? {}).path || null)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)

    // Initialize the form with author data
    const form = useForm<AuthorFormValues>({
        resolver: zodResolver(authorSchema),
        defaultValues: {
            fullName: author?.fullName,
            email: author.email,
            institution: author.institution,
            researchField: author.researchField,
            publicationsCount: author.publicationsCount,
            biography: author.biography || "",
            orcidId: author.orcidId || "",
            status: author.status,
        },
    })

    // Get initials from name for avatar fallback
    const getInitials = (name: string) => {
        return name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    // Handle form submission
    async function onSubmit(data: AuthorFormValues) {
        setIsSubmitting(true)

        try {
            // In a real application, this would be an API call
            // console.log("Updating author:", { ...data, id: author.id })

            const formData = new FormData();
            formData.append("fullName", data.fullName);
            formData.append("email", data.email);
            formData.append("institution", data.institution);
            formData.append("researchField", data.researchField);
            formData.append("publicationsCount", data.publicationsCount.toString());
            formData.append("biography", data.biography || "");
            formData.append("orcidId", data.orcidId || "");
            formData.append("status", data.status);

            if (avatarFile) {
                formData.append("file", avatarFile);
            }

            let updatedAuthor

            if(avatarFile){
                updatedAuthor = await updateAuthor(+author.id, formData, true)
            }else{
                updatedAuthor = await updateAuthor(+author.id, formData, false)
            }

            if(updatedAuthor?.success){
                toast({
                    title: translations.edit,
                    description: translations.updateSuccess,
                })
                router.push(`/${lang}/admin/authors`)
                router.refresh()
            }else{
                throw new Error("Failed to update author")
            }
        } catch (error) {
            console.error("Error updating author:", error)
            toast({
                title: "Error",
                description: translations.updateError,
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle avatar upload
    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setAvatarFile(file)
            const reader = new FileReader()
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // Research field options
    const fieldOptions = [
        { value: "computer-science", label: "Computer Science" },
        { value: "medicine", label: "Medicine" },
        { value: "physics", label: "Physics" },
        { value: "biology", label: "Biology" },
        { value: "chemistry", label: "Chemistry" },
        { value: "mathematics", label: "Mathematics" },
        { value: "engineering", label: "Engineering" },
        { value: "social-sciences", label: "Social Sciences" },
        { value: "humanities", label: "Humanities" },
        { value: "other", label: "Other" },
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
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar upload section */}
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-24 w-24">
                            {avatarPreview ? (
                                <AvatarImage src={avatarPreview} alt={`${author.fullName}'s avatar`} />
                            ) : (
                                <AvatarFallback className="text-lg">{getInitials(author.fullName)}</AvatarFallback>
                            )}
                        </Avatar>
                        <div className="flex flex-col items-center">
                            <label htmlFor="avatar-upload" className="cursor-pointer text-sm text-primary hover:underline">
                                Change photo
                            </label>
                            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                            <p className="text-xs text-muted-foreground mt-1">Recommended: Square JPG, PNG, 300x300px</p>
                        </div>
                    </div>

                    {/* Form fields */}
                    <div className="flex-1 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="institution"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Institution</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="researchField"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Research Field</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select field" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {fieldOptions.map((option) => (
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
                                name="publicationsCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Publications Count</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="0" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="orcidId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ORCID ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0000-0000-0000-0000" {...field} />
                                        </FormControl>
                                        <FormDescription>Open Researcher and Contributor ID (optional)</FormDescription>
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
                            name="biography"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Biography</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Brief biography and research interests"
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>Max 500 characters</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push(`/${lang}/admin/authors`)}
                        disabled={isSubmitting}
                    >
                        {translations.cancel}
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? translations.updating : translations.edit}
                    </Button>
                </div>
            </form>
        </Form>
    )
}


