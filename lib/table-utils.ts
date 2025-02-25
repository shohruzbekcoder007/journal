export type SortOrder = "asc" | "desc"

export interface TableSearchParams {
  query?: string
  page?: string
  sort?: string
  order?: SortOrder
}

export function parseTableParams(searchParams: URLSearchParams): TableSearchParams {
  const query = searchParams.get("query") || undefined
  const page = searchParams.get("page") || "1"
  const sort = searchParams.get("sort") || undefined
  const order = (searchParams.get("order") as SortOrder) || "asc"

  return {
    query,
    page,
    sort,
    order,
  }
}

export function applyPagination<T>(data: T[], page: number, pageSize: number): { data: T[]; pageCount: number } {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = data.slice(startIndex, endIndex)
  const pageCount = Math.ceil(data.length / pageSize)

  return {
    data: paginatedData,
    pageCount,
  }
}

export function applySort<T>(data: T[], sort: string | undefined, order: SortOrder): T[] {
  if (!sort) return data

  return [...data].sort((a, b) => {
    const aValue = (a as any)[sort]
    const bValue = (b as any)[sort]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (order === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
}

export function applyFilter<T>(data: T[], query: string | undefined, searchFields: (keyof T)[]): T[] {
  if (!query) return data

  const lowercaseQuery = query.toLowerCase()

  return data.filter((item) => {
    return searchFields.some((field) => {
      const value = item[field]
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowercaseQuery)
      }
      return false
    })
  })
}

export function processTableData<T>(data: T[], params: TableSearchParams, searchFields: (keyof T)[], pageSize = 10) {
  const { query, page, sort, order } = params
  const currentPage = Number.parseInt(page || "1", 10)

  // Apply filtering
  let filteredData = applyFilter(data, query, searchFields)

  // Apply sorting
  if (sort) {
    filteredData = applySort(filteredData, sort, order || "asc")
  }

  // Apply pagination
  const { data: paginatedData, pageCount } = applyPagination(filteredData, currentPage, pageSize)

  return {
    data: paginatedData,
    pageCount,
    currentPage,
  }
}