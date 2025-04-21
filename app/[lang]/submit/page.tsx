"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { translations, type Language } from "@/lib/translations"
import { UploadIcon as FileUpload, Upload } from "lucide-react"
import { createSubmission } from "@/app/actions/submit"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

export default function SubmitPaperPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    abstract: "",
    category: "",
    keywords: "",
    comments: ""
  })
  const [fileInfo, setFileInfo] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileInfo(e.target.files[0])
    }
  }

  const uploadFile = async (file: File): Promise<number | null> => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      
      if (data.success) {
        return data.fileId
      } else {
        throw new Error(data.error || "Failed to upload file")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)
    setUploadProgress(0)

    // Validate form data
    if (!formData.title || !formData.authors || !formData.abstract || !formData.category || !formData.keywords) {
      setErrorMessage(t.submit?.validationError || "Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    if (!fileInfo) {
      setErrorMessage(t.submit?.fileRequired || "Please upload your paper file")
      setIsSubmitting(false)
      return
    }

    try {
      // First upload the file
      setUploadProgress(10)
      const fileId = await uploadFile(fileInfo)
      setUploadProgress(70)

      // Then create the submission with the file ID
      const result = await createSubmission({
        title: formData.title,
        authors: formData.authors,
        abstract: formData.abstract,
        category: formData.category,
        keywords: formData.keywords,
        fileId: fileId || undefined,
        comments: formData.comments || undefined
      })
      
      setUploadProgress(100)

      if (result.success) {
        // Toast notification ko'rsatish
        toast.success(t.submit?.successMessage || "Your paper has been successfully submitted!", {
          duration: 5000,
          position: "top-center",
          icon: "🎉"
        })
        
        setSuccessMessage(t.submit?.successMessage || "Your paper has been successfully submitted!")
        // Reset form
        setFormData({
          title: "",
          authors: "",
          abstract: "",
          category: "",
          keywords: "",
          comments: ""
        })
        setFileInfo(null)
        
        // Redirect to journals page after 3 seconds
        setTimeout(() => {
          router.push(`/${lang}/journals`)
        }, 3000)
      } else {
        // Xatolik haqida toast notification ko'rsatish
        toast.error(result.error || t.submit?.errorMessage || "Failed to submit paper. Please try again.", {
          duration: 5000,
          position: "top-center"
        })
        
        setErrorMessage(result.error || t.submit?.errorMessage || "Failed to submit paper. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting paper:", error)
      setErrorMessage(t.submit?.errorMessage || "An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      {/* Toast notification uchun container */}
      <Toaster />
      
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t.submit?.title || "Submit Your Research Paper"}</h1>
          <p className="text-muted-foreground">
            {t.submit?.description ||
              "Complete the form below to submit your research paper for review and publication."}
          </p>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errorMessage}
          </div>
        )}

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>{t.submit?.formTitle || "Paper Submission Form"}</CardTitle>
              <CardDescription>
                {t.submit?.formDescription || "Please provide all required information about your paper."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            {/* Paper Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                {t.submit?.titleLabel || "Paper Title"} <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="title" 
                value={formData.title}
                onChange={handleInputChange}
                placeholder={t.submit?.titlePlaceholder || "Enter the full title of your paper"} 
              />
            </div>

            {/* Authors */}
            <div className="space-y-2">
              <Label htmlFor="authors">
                {t.submit?.authorsLabel || "Authors"} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="authors"
                value={formData.authors}
                onChange={handleInputChange}
                placeholder={t.submit?.authorsPlaceholder || "Enter author names (separated by commas)"}
              />
              <p className="text-sm text-muted-foreground">
                {t.submit?.authorsHelp || "List all authors in the order they should appear on the publication."}
              </p>
            </div>

            {/* Abstract */}
            <div className="space-y-2">
              <Label htmlFor="abstract">
                {t.submit?.abstractLabel || "Abstract"} <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="abstract"
                value={formData.abstract}
                onChange={handleInputChange}
                placeholder={
                  t.submit?.abstractPlaceholder || "Provide a brief summary of your research (250-300 words)"
                }
                className="min-h-[150px]"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                {t.submit?.categoryLabel || "Research Category"} <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={handleSelectChange} value={formData.category}>
                <SelectTrigger id="category">
                  <SelectValue placeholder={t.submit?.categoryPlaceholder || "Select a category"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="social-sciences">Social Sciences</SelectItem>
                  <SelectItem value="humanities">Humanities</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Keywords */}
            <div className="space-y-2">
              <Label htmlFor="keywords">
                {t.submit?.keywordsLabel || "Keywords"} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder={t.submit?.keywordsPlaceholder || "Enter keywords (separated by commas)"}
              />
              <p className="text-sm text-muted-foreground">
                {t.submit?.keywordsHelp || "Include 5-8 keywords that best describe your research."}
              </p>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file">
                {t.submit?.fileLabel || "Paper File"} <span className="text-destructive">*</span>
              </Label>
              <label htmlFor="file-upload" className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <FileUpload className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">
                  {fileInfo ? fileInfo.name : (t.submit?.dropzoneText || "Drag and drop your file here or click to browse")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.submit?.fileFormats || "Accepted formats: PDF, DOCX (Max size: 10MB)"}
                </p>
                <Button variant="outline" size="sm" className="mt-2" type="button" onClick={(e) => e.preventDefault()}>
                  <Upload className="mr-2 h-4 w-4" />
                  {t.submit?.browseButton || "Browse Files"}
                </Button>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.docx" 
                  onChange={handleFileChange}
                />
              </label>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Additional Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments">{t.submit?.commentsLabel || "Additional Comments"}</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder={
                  t.submit?.commentsPlaceholder || "Any additional information you'd like to share with the editors"
                }
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push(`/${lang}/journals`)}
            >
              {t.submit?.cancelButton || "Cancel"}
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (t.submit?.submittingButton || "Submitting...") : (t.submit?.submitButton || "Submit Paper")}
            </Button>
          </CardFooter>
          </form>
        </Card>

        {/* <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            {t.submit?.helpText || "Need help with your submission? Contact our editorial team at"}{" "}
            <a href="mailto:editorial@scipublish.com" className="text-primary hover:underline">
              editorial@scipublish.com
            </a>
          </p>
        </div> */}
      </div>
    </div>
  )
}

