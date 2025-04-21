"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { translations, type Language } from "@/lib/translations"
import { getSubmission, updateSubmissionStatus } from "@/app/actions/submit"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ArrowLeft, Check, X } from "lucide-react"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"

export default function SubmissionDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const lang = params.lang as Language
  const id = Number(params.id)
  const t = translations[lang]
  
  const [submission, setSubmission] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Submission ma'lumotlarini yuklash
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        setLoading(true)
        const result = await getSubmission(id)
        
        if (result.success) {
          setSubmission(result.submission)
        } else {
          setError(result.error || "Failed to load submission")
        }
      } catch (error) {
        console.error("Error fetching submission:", error)
        setError("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchSubmission()
    }
  }, [id])
  
  // Submission statusini o'zgartirish
  const handleStatusChange = async (status: "active" | "inactive" | "pending") => {
    try {
      const result = await updateSubmissionStatus(id, status)
      
      if (result.success) {
        // Submission ma'lumotlarini yangilash
        setSubmission({ ...submission, status })
        
        // Muvaffaqiyat haqida xabar
        toast.success(status === "active" 
          ? "Submission approved successfully" 
          : status === "inactive" 
            ? "Submission rejected successfully"
            : "Submission status updated successfully", {
          duration: 3000,
          position: "top-center"
        })
      } else {
        toast.error(result.error || "Failed to update submission status", {
          duration: 3000,
          position: "top-center"
        })
      }
    } catch (error) {
      console.error("Error updating submission status:", error)
      toast.error("An unexpected error occurred", {
        duration: 3000,
        position: "top-center"
      })
    }
  }
  
  // Status badge rangi
  const getStatusBadge = (status: string) => {
    const submissionsText = (t.admin as any)?.submissions || {}
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">{submissionsText.statusActive || "Approved"}</Badge>
      case "inactive":
        return <Badge className="bg-red-500">{submissionsText.statusInactive || "Rejected"}</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">{submissionsText.statusPending || "Pending"}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }
  
  if (loading) {
    return (
      <div className="container py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }
  
  if (error || !submission) {
    return (
      <div className="container py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || "Submission not found"}
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {(t.admin as any)?.submissions?.back || "Back"}
        </Button>
      </div>
    )
  }
  
  return (
    <div className="container py-6">
      <Toaster />
      
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {(t.admin as any)?.submissions?.back || "Back"}
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {(t.admin as any)?.submissions?.viewTitle || "Submission Details"}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{submission.title}</CardTitle>
                <CardDescription className="mt-2">
                  {(t.admin as any)?.submissions?.submittedOn || "Submitted on"}: {new Date(submission.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
              <div>{getStatusBadge(submission.status)}</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {(t.admin as any)?.submissions?.authors || "Authors"}
              </h3>
              <p>{submission.authors}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {(t.admin as any)?.submissions?.category || "Category"}
              </h3>
              <p>{submission.category}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {(t.admin as any)?.submissions?.keywords || "Keywords"}
              </h3>
              <p>{submission.keywords}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {(t.admin as any)?.submissions?.abstract || "Abstract"}
              </h3>
              <div className="p-4 bg-muted rounded-md">
                <p className="whitespace-pre-wrap">{submission.abstract}</p>
              </div>
            </div>
            
            {submission.comments && (
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {(t.admin as any)?.submissions?.comments || "Additional Comments"}
                </h3>
                <p className="whitespace-pre-wrap">{submission.comments}</p>
              </div>
            )}
            
            {submission.fileId && submission.file && (
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {(t.admin as any)?.submissions?.file || "Paper File"}
                </h3>
                <Button variant="outline" asChild>
                  <Link href={submission.file.path} target="_blank">
                    <Download className="h-4 w-4 mr-2" />
                    {submission.file.name || "Download Paper"}
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {submission.status === "pending" && (
              <>
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleStatusChange("active")}
                >
                  <Check className="h-4 w-4 mr-2" />
                  {(t.admin as any)?.submissions?.approve || "Approve"}
                </Button>
                
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange("inactive")}
                >
                  <X className="h-4 w-4 mr-2" />
                  {(t.admin as any)?.submissions?.reject || "Reject"}
                </Button>
              </>
            )}
            
            {submission.status !== "pending" && (
              <Button
                variant="outline"
                onClick={() => handleStatusChange("pending")}
              >
                {(t.admin as any)?.submissions?.resetStatus || "Reset to Pending"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
