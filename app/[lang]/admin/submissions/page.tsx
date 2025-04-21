"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { translations, type Language } from "@/lib/translations"
import { listSubmissions } from "@/app/actions/submit"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Check, X } from "lucide-react"
import Link from "next/link"
import { updateSubmissionStatus } from "@/app/actions/submit"
import toast, { Toaster } from "react-hot-toast"

export default function AdminSubmissionsPage() {
  const params = useParams()
  const lang = params.lang as Language
  const t = translations[lang]
  
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Submissions ni yuklash
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true)
        const result = await listSubmissions()
        
        if (result.success) {
          setSubmissions(result.submissions)
        } else {
          setError(result.error || "Failed to load submissions")
        }
      } catch (error) {
        console.error("Error fetching submissions:", error)
        setError("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }
    
    fetchSubmissions()
  }, [])
  
  // Submission statusini o'zgartirish
  const handleStatusChange = async (id: number, status: "active" | "inactive" | "pending") => {
    try {
      const result = await updateSubmissionStatus(id, status)
      
      if (result.success) {
        // Submissions ro'yxatini yangilash
        setSubmissions(submissions.map(sub => 
          sub.id === id ? { ...sub, status } : sub
        ))
        
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
  
  return (
    <div className="container py-6">
      <Toaster />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {(t.admin as any)?.submissions?.title || "Manage Submissions"}
        </h1>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          {(t.admin as any)?.submissions?.noResults || "No submissions found."}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>
              {(t.admin as any)?.submissions?.tableCaption || "List of all submitted papers"}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{(t.admin as any)?.submissions?.columns?.title || "Title"}</TableHead>
                <TableHead>{(t.admin as any)?.submissions?.columns?.authors || "Authors"}</TableHead>
                <TableHead>{(t.admin as any)?.submissions?.columns?.category || "Category"}</TableHead>
                <TableHead>{(t.admin as any)?.submissions?.columns?.status || "Status"}</TableHead>
                <TableHead>{(t.admin as any)?.submissions?.columns?.createdAt || "Submitted Date"}</TableHead>
                <TableHead className="text-right">{(t.admin as any)?.submissions?.columns?.actions || "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {submission.title}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{submission.authors}</TableCell>
                  <TableCell>{submission.category}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link href={`/${lang}/admin/submissions/${submission.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          {(t.admin as any)?.submissions?.view || "View"}
                        </Link>
                      </Button>
                      
                      {submission.fileId && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={submission.file?.path || "#"} target="_blank">
                            <Download className="h-4 w-4 mr-1" />
                            {(t.admin as any)?.submissions?.download || "Download"}
                          </Link>
                        </Button>
                      )}
                      
                      {submission.status === "pending" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleStatusChange(submission.id, "active")}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            {(t.admin as any)?.submissions?.approve || "Approve"}
                          </Button>
                          
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleStatusChange(submission.id, "inactive")}
                          >
                            <X className="h-4 w-4 mr-1" />
                            {(t.admin as any)?.submissions?.reject || "Reject"}
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
