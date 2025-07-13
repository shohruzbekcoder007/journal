'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Dynamically import react-pdf to avoid SSR issues
const PDFDocument = dynamic(() => import('react-pdf').then(mod => mod.Document), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full flex items-center justify-center">Loading PDF viewer...</div>
})

const PDFPage = dynamic(() => import('react-pdf').then(mod => mod.Page), {
  ssr: false
})

// PDF.js worker will be initialized inside the component

interface PDFViewerProps {
  pdfUrl?: string
  initialPage?: number
  onPageChange?: (page: number) => void
}

export function PDFViewer({ pdfUrl, initialPage = 1, onPageChange }: PDFViewerProps) {
  // Use default PDF if none provided
  const actualPdfUrl = pdfUrl || "/0a502192-903b-45ea-ab8e-014ee8d90a41-Grammar in Use Elm 4-ed.PDF";
  // Check if we're in browser environment
  const [isBrowser, setIsBrowser] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  
  // Set isBrowser to true once component mounts (client-side only)
  useEffect(() => {
    setIsBrowser(true);
    
    // Set up responsive container width
    const updateWidth = () => {
      const container = document.getElementById('pdf-container');
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };
    
    // Initial width calculation
    updateWidth();
    
    // Update width on resize
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(initialPage)
  const [loading, setLoading] = useState<boolean>(true)
  const [scale, setScale] = useState<number>(1.0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initialize PDF.js worker only on client side
    if (isBrowser) {
      const initPdfWorker = async () => {
        const pdfjs = await import('react-pdf');
        pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.js`;
      };
      
      initPdfWorker();
    }
  }, [isBrowser]);

  useEffect(() => {
    // Reset state when PDF URL changes
    setLoading(true)
    setError(null)
    setPageNumber(initialPage)
  }, [pdfUrl, initialPage])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
    setError(null)
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF load error:', error)
    setLoading(false)
    setError('Failed to load PDF document. Please try again later.')
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset
      if (newPageNumber >= 1 && newPageNumber <= (numPages || 1)) {
        if (onPageChange) onPageChange(newPageNumber)
        return newPageNumber
      }
      return prevPageNumber
    })
  }

  function goToPage(pageNum: number) {
    if (pageNum >= 1 && pageNum <= (numPages || 1)) {
      setPageNumber(pageNum)
      if (onPageChange) onPageChange(pageNum)
    }
  }

  function adjustZoom(delta: number) {
    setScale(prevScale => {
      const newScale = prevScale + delta
      return Math.min(Math.max(0.5, newScale), 2.5) // Limit scale between 0.5 and 2.5
    })
  }

  function downloadPdf() {
    const link = document.createElement('a')
    link.href = actualPdfUrl
    link.download = actualPdfUrl.split('/').pop() || 'document.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Only render PDF components in browser environment
  return (
    <div className="flex flex-col items-center w-full">
      <div id="pdf-container" className="relative border rounded-md overflow-hidden bg-white shadow-md w-full">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        {error ? (
          <div className="h-[600px] w-full flex items-center justify-center text-red-500">
            <div className="text-center p-4">
              <p className="mb-2">{error}</p>
              <Button variant="outline" size="sm" onClick={() => setLoading(true)}>
                Retry Loading
              </Button>
            </div>
          </div>
        ) : isBrowser && actualPdfUrl ? (
          <PDFDocument
            file={actualPdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div className="h-[600px] w-full flex items-center justify-center">Loading PDF...</div>}
            className="w-full max-w-full"
            renderMode="canvas"
          >
            <PDFPage
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="w-full max-w-full"
              scale={scale}
              width={undefined}
            />
          </PDFDocument>
        ) : (
          <div className="h-[600px] w-full flex items-center justify-center">PDF viewer loading...</div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 w-full">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1 || loading || !!error}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm">
            {pageNumber} / {numPages || '-'}
          </span>
          
          <Button
            onClick={() => changePage(1)}
            disabled={numPages !== null && pageNumber >= numPages || loading || !!error}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => adjustZoom(-0.1)}
            disabled={loading || !!error}
            variant="outline"
            size="sm"
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <span className="text-sm w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          
          <Button
            onClick={() => adjustZoom(0.1)}
            disabled={loading || !!error}
            variant="outline"
            size="sm"
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={downloadPdf}
            disabled={loading || !!error}
            variant="outline"
            size="sm"
            title="Download PDF"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Page thumbnails */}
      {numPages && numPages > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto w-full pb-2">
          {Array.from(new Array(Math.min(numPages, 10)), (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center border ${pageNumber === index + 1 ? 'bg-primary text-primary-foreground' : 'bg-white'}`}
            >
              {index + 1}
            </button>
          ))}
          {numPages > 10 && <span className="flex items-center">...</span>}
        </div>
      )}
    </div>
  )
}
