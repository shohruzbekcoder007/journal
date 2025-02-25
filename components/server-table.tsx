import type * as React from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react"

interface Column<T> {
  key: string
  header: string | React.ReactNode
  cell: (item: T) => React.ReactNode
  sortable?: boolean
}

interface ServerTableProps<T> {
  data: T[]
  columns: Column<T>[]
  pageCount: number
  currentPage: number
  searchParams: {
    query?: string
    page?: string
    sort?: string
    order?: "asc" | "desc"
  }
  searchPlaceholder: string
  noResultsMessage: string
  baseUrl: string
}

export function ServerTable<T>({
  data,
  columns,
  pageCount,
  currentPage,
  searchParams,
  searchPlaceholder,
  noResultsMessage,
  baseUrl,
}: ServerTableProps<T>) {
  const { query, sort, order } = searchParams

  // Create URLs for sorting and pagination
  const createSortUrl = (key: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)

    if (sort === key && order === "asc") {
      params.set("order", "desc")
    } else if (sort === key && order === "desc") {
      params.delete("sort")
      params.delete("order")
    } else {
      params.set("sort", key)
      params.set("order", "asc")
    }

    // Reset to page 1 when sorting changes
    params.set("page", "1")

    return `${baseUrl}?${params.toString()}`
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    params.set("page", page.toString())
    return `${baseUrl}?${params.toString()}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        <form className="max-w-sm">
          <Input name="query" placeholder={searchPlaceholder} defaultValue={query || ""} className="max-w-sm" />
        </form>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>
                  {column.sortable ? (
                    <Link href={createSortUrl(column.key)} className="flex items-center">
                      <Button variant="ghost" className="p-0 font-medium">
                        {column.header}
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sort === column.key ? "opacity-100" : "opacity-50"}`} />
                      </Button>
                    </Link>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>{column.cell(item)}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {noResultsMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pageCount > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Link href={createPageUrl(currentPage - 1)} aria-disabled={currentPage <= 1}>
            <Button variant="outline" size="sm" disabled={currentPage <= 1}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {pageCount}
          </div>
          <Link href={createPageUrl(currentPage + 1)} aria-disabled={currentPage >= pageCount}>
            <Button variant="outline" size="sm" disabled={currentPage >= pageCount}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}