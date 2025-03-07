"use client"

import { useState, useTransition } from "react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createAuthor } from "@/app/actions/author"

// Create a schema for author validation
const authorSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    institution: z.string().min(2, {
        message: "Institution must be at least 2 characters.",
    }),
    field: z.string().min(2, {
        message: "Field must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    publications: z.coerce.number().int().min(0, {
        message: "Publications must be a non-negative number.",
    }),
    bio: z
        .string()
        .max(500, {
            message: "Bio must not exceed 500 characters.",
        })
        .optional(),
    orcid: z
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

// Default values for the form
const defaultValues: Partial<AuthorFormValues> = {
    name: "",
    institution: "",
    field: "",
    email: "",
    publications: 0,
    bio: "",
    orcid: "",
    status: "active",
}

interface AuthorFormProps {
    lang: Language
    initialData?: AuthorFormValues
}

export function AuthorForm({ lang, initialData }: AuthorFormProps) {
    const t = translations[lang].admin.authors
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)

    // Initialize the form with react-hook-form
    const form = useForm<AuthorFormValues>({
        resolver: zodResolver(authorSchema),
        defaultValues: initialData || defaultValues,
    })

    // Get initials from name for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    // Handle form submission
    async function onSubmit(data: AuthorFormValues) {
        try {
            const formData = new FormData();
            formData.append("fullName", data.name);
            formData.append("email", data.email);
            formData.append("institution", data.institution);
            formData.append("researchField", data.field);
            formData.append("publicationsCount", data.publications.toString());
            formData.append("orcidId", data.orcid || "");
            formData.append("status", data.status);
            formData.append("biography", data.bio || "");

            if (avatarFile) {
                formData.append("file", avatarFile);
            }

            startTransition(async () => {
                try {
                    const result = await createAuthor(formData);
                    
                    if (result.success) {
                        toast({
                            title: "Success",
                            description: "Author created successfully",
                        });
                        router.push(`/${lang}/admin/authors`);
                        router.refresh();
                    } else {
                        toast({
                            title: "Error",
                            description: result.error || "Failed to create author",
                            variant: "destructive",
                        });
                    }
                } catch (error) {
                    console.error("Error in transition:", error);
                    toast({
                        title: "Error",
                        description: error instanceof Error ? error.message : "An unexpected error occurred",
                        variant: "destructive",
                    });
                }
            });
        } catch (error) {
            console.error("Error preparing form data:", error);
            toast({
                title: "Error",
                description: "Failed to prepare form data",
                variant: "destructive",
            });
        }
    }

    // Status options
    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending Review" },
    ]

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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar upload section */}
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-24 w-24">
                            {avatarPreview ? (
                                <AvatarImage src={avatarPreview} alt="Author avatar" />
                            ) : (
                                <AvatarFallback className="text-lg">
                                    {form.watch("name") ? getInitials(form.watch("name")) : "?"}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <div className="flex flex-col items-center">
                            <label htmlFor="avatar-upload" className="cursor-pointer text-sm text-primary hover:underline">
                                Upload photo
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
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Dr. Jane Smith" {...field} />
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
                                            <Input placeholder="jane.smith@university.edu" type="email" {...field} />
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
                                            <Input placeholder="University of Science" {...field} />
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
                                name="publications"
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
                                name="orcid"
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
                            name="bio"
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
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isPending ? "Creating..." : "Create Author"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
