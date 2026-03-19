'use client'

import { useEffect, useMemo, useState } from 'react'
import { CaretDownIcon, CaretLeftIcon, CaretRightIcon, CheckIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import { isAfter, isBefore, isEqual } from 'date-fns'
import { BlogCard } from './BlogCard'
import { Button } from '@/components/ui/button'
import { NoResults } from '@/components/no-results'
import { DatePickerRange, DateRange } from '@/components/ui/date-range'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/utils/hooks/use-debounce'
import type { Post, Tag } from '@/payload-types'

const POSTS_PER_PAGE = 12

type PostsProps = {
  posts: Post[]
  tags: Tag[]
}

export const Posts = ({ posts, tags }: PostsProps) => {
  const tagNames = useMemo(() => {
    return tags.map((tag) => tag.name).filter(Boolean) as string[]
  }, [tags])

  const [dateRange, setDateRange] = useState<DateRange>()
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Record<string, boolean>>(
    () => Object.fromEntries(tagNames.map((name) => [name, false])) as Record<string, boolean>,
  )

  const appliedFiltersCount = useMemo(() => {
    return Object.values(filters).filter(Boolean).length
  }, [filters])

  const debouncedFilters = useDebounce(filters, 300)
  const debouncedDateRange = useDebounce(dateRange, 300)

  const filteredPosts = useMemo(() => {
    let filteredData = posts
    const enabledFilters = Object.keys(debouncedFilters).filter((key) => debouncedFilters[key])

    if (enabledFilters.length !== 0) {
      filteredData = posts.filter((post: Post) => {
        const postTags =
          post?.tags
            ?.map((tag) => {
              const tagData = typeof tag === 'number' ? null : tag
              return tagData?.name
            })
            .filter(Boolean) ?? []

        for (const tag of enabledFilters) {
          if (postTags.includes(tag)) {
            return true
          }
        }
        return false
      })
    }

    if (debouncedDateRange?.from && debouncedDateRange?.to) {
      const dateFrom = new Date(debouncedDateRange.from)
      const dateTo = new Date(debouncedDateRange.to)
      dateTo.setHours(23, 59, 59, 999)
      return filteredData.filter((post: Post) => {
        const dateField = post.publishedAt || post.createdAt
        if (!dateField) {
          return false
        }
        const blogDate = new Date(dateField)

        return (
          (isAfter(blogDate, dateFrom) || isEqual(blogDate, dateFrom)) &&
          (isBefore(blogDate, dateTo) || isEqual(blogDate, dateTo))
        )
      })
    }

    return filteredData
  }, [posts, debouncedFilters, debouncedDateRange])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedFilters, debouncedDateRange])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )

  const resetFilters = () => {
    setFilters(Object.fromEntries(tagNames.map((name) => [name, false])))
  }

  const [tagSearch, setTagSearch] = useState('')

  const visibleTags = useMemo(() => {
    if (!tagSearch.trim()) return tagNames
    const query = tagSearch.toLowerCase()
    return tagNames.filter((tag) => tag.toLowerCase().includes(query))
  }, [tagNames, tagSearch])

  const tagFilterLabel = appliedFiltersCount > 0
    ? `${appliedFiltersCount} Tag${appliedFiltersCount > 1 ? 's' : ''} Selected`
    : 'All Tags'

  return (
    <section className="relative mx-auto mt-6 max-w-5xl px-6 md:mb-16 md:px-12 xl:px-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Popover onOpenChange={(open) => { if (!open) setTagSearch('') }}>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                className="h-9 w-52 cursor-pointer justify-between !px-3 text-sm transition-colors duration-200"
              >
                <span className="line-clamp-1">{tagFilterLabel}</span>
                <CaretDownIcon className="size-4 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 rounded-xl p-0" align="start">
              <div className="border-input-controls-border border-b p-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    placeholder="Search tags..."
                    className="bg-transparent h-8 w-full rounded-md pl-8 pr-2 text-sm text-white outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto p-2">
                {!tagSearch.trim() && (
                  <button
                    onClick={resetFilters}
                    className="hover:bg-cta-menu-item-hovered flex h-9 w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
                  >
                    <span className="flex w-4 shrink-0 items-center justify-center">
                      {appliedFiltersCount === 0 ? <CheckIcon className="size-4" weight="bold" /> : null}
                    </span>
                    All Tags
                  </button>
                )}
                {visibleTags.length === 0 && (
                  <p className="px-2 py-3 text-center text-sm text-gray-500">No tags found.</p>
                )}
                {visibleTags.map((tag) => {
                  const isSelected = filters[tag]
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        setFilters({
                          ...filters,
                          [tag]: !filters[tag],
                        })
                      }}
                      className="hover:bg-cta-menu-item-hovered flex h-9 w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
                    >
                      <span className="flex w-4 shrink-0 items-center justify-center">
                        {isSelected ? <CheckIcon className="size-4" weight="bold" /> : null}
                      </span>
                      {tag}
                    </button>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>
          {appliedFiltersCount > 0 && (
            <Button
              variant="secondary"
              className="hover:border-cta-secondary-selected-border cursor-pointer h-9 !p-2.5 transition-all duration-200"
              onClick={resetFilters}
            >
              Clear
              <XIcon size={16} />
            </Button>
          )}
        </div>
        <DatePickerRange
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={(range) => setDateRange(range)}
          className="min-w-60"
        />
      </div>
      {paginatedPosts.length > 0 ? (
        <>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedPosts.map((post: Post, idx: number) => (
              <BlogCard key={`blog-${idx}`} post={post} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                className="h-9 w-9 cursor-pointer !p-0"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <CaretLeftIcon size={16} />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'secondary'}
                  className="h-9 w-9 cursor-pointer !p-0"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="secondary"
                className="h-9 w-9 cursor-pointer !p-0"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <CaretRightIcon size={16} />
              </Button>
            </div>
          )}
        </>
      ) : (
        <NoResults />
      )}
    </section>
  )
}
