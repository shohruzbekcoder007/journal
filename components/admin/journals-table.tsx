"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Journal {
  id: string
  title: string
  field: string
  issn: string
  frequency: string
  status: string
  createdAt: string
}

interface JournalsTableProps {
  data: Journal[]
  translations: {
    search: string
    noResults: string
    edit: string
    delete: string
    columns: {
      title: string
      field: string
      issn: string
      frequency: string
      status: string
      createdAt: string
      actions: string
    }
  }
}

export function AdminJournalsTable({ data, translations }: JournalsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const pathname = usePathname()
  const lang = pathname.split("/")[1]

  const columns: ColumnDef<Journal>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            {translations.columns.title}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="min-w-[200px]">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "field",
      header: translations.columns.field,
      cell: ({ row }) => <div className="min-w-[120px]">{row.getValue("field")}</div>,
    },
    {
      accessorKey: "issn",
      header: translations.columns.issn,
      cell: ({ row }) => <div className="min-w-[100px]">{row.getValue("issn")}</div>,
    },
    {
      accessorKey: "frequency",
      header: translations.columns.frequency,
      cell: ({ row }) => <div className="min-w-[100px]">{row.getValue("frequency")}</div>,
    },
    {
      accessorKey: "status",
      header: translations.columns.status,
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div className="min-w-[100px]">
            <Badge variant={status === "active" ? "default" : "secondary"}>{status}</Badge>
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: translations.columns.createdAt,
      cell: ({ row }) => (
        <div className="min-w-[100px]">{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
      ),
    },
    {
      id: "actions",
      header: translations.columns.actions,
      cell: ({ row }) => {
        const journal = row.original

        return (
          <div className="min-w-[64px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/${lang}/admin/journals/${journal.id}/edit`}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    {translations.edit}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  {translations.delete}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        <Input
          placeholder={translations.search}
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {translations.noResults}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

