import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { translations, type Language } from "@/lib/translations"
import { UploadIcon as FileUpload, Upload } from "lucide-react"

export default function SubmitPaperPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t.submit?.title || "Submit Your Research Paper"}</h1>
          <p className="text-muted-foreground">
            {t.submit?.description ||
              "Complete the form below to submit your research paper for review and publication."}
          </p>
        </div>

        <Card>
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
              <Input id="title" placeholder={t.submit?.titlePlaceholder || "Enter the full title of your paper"} />
            </div>

            {/* Authors */}
            <div className="space-y-2">
              <Label htmlFor="authors">
                {t.submit?.authorsLabel || "Authors"} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="authors"
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
              <Select>
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
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <FileUpload className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">
                  {t.submit?.dropzoneText || "Drag and drop your file here or click to browse"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.submit?.fileFormats || "Accepted formats: PDF, DOCX (Max size: 10MB)"}
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="mr-2 h-4 w-4" />
                  {t.submit?.browseButton || "Browse Files"}
                </Button>
              </div>
            </div>

            {/* Additional Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments">{t.submit?.commentsLabel || "Additional Comments"}</Label>
              <Textarea
                id="comments"
                placeholder={
                  t.submit?.commentsPlaceholder || "Any additional information you'd like to share with the editors"
                }
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">{t.submit?.cancelButton || "Cancel"}</Button>
            <Button>{t.submit?.submitButton || "Submit Paper"}</Button>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            {t.submit?.helpText || "Need help with your submission? Contact our editorial team at"}{" "}
            <a href="mailto:editorial@scipublish.com" className="text-primary hover:underline">
              editorial@scipublish.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

