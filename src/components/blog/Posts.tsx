'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  XIcon,
} from '@phosphor-icons/react'
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
  const searchParams = useSearchParams()
  const router = useRouter()

  const tagNames = useMemo(() => {
    return (tags.map((tag) => tag.name).filter(Boolean) as string[]).sort((a, b) =>
      a.localeCompare(b),
    )
  }, [tags])

  const [dateRange, setDateRange] = useState<DateRange>()
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = searchParams.get('page')
    const parsed = pageParam ? parseInt(pageParam, 10) : 1
    return parsed >= 1 ? parsed : 1
  })
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

  const setPage = useCallback(
    (page: number) => {
      setCurrentPage(page)
      const params = new URLSearchParams(searchParams.toString())
      if (page <= 1) {
        params.delete('page')
      } else {
        params.set('page', String(page))
      }
      const query = params.toString()
      router.replace(query ? `?${query}` : '/', { scroll: false })
    },
    [searchParams, router],
  )

  // Sync URL changes (e.g. browser back/forward) to state
  useEffect(() => {
    const pageParam = searchParams.get('page')
    const parsed = pageParam ? parseInt(pageParam, 10) : 1
    const page = parsed >= 1 ? parsed : 1
    setCurrentPage(page)
  }, [searchParams])

  // Persist current page so "Back to Blog" can restore it
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (currentPage > 1) {
      params.set('page', String(currentPage))
    } else {
      params.delete('page')
    }
    const query = params.toString()
    sessionStorage.setItem('blogListingUrl', query ? `/?${query}` : '/')
  }, [currentPage, searchParams])

  // Reset to page 1 when filters change (skip initial mount to preserve URL page)
  const isInitialMount = useRef(true)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    setPage(1)
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

  const tagFilterLabel =
    appliedFiltersCount > 0
      ? `${appliedFiltersCount} Tag${appliedFiltersCount > 1 ? 's' : ''} Selected`
      : 'All Tags'

  return (
    <section className="relative mx-auto max-w-[calc(100%-32px)] xl:max-w-[1080px] 2xl:max-w-[1200px]">
      <div className="flex gap-1.5 p-4 lg:gap-2 lg:py-4 lg:px-8 border-x border-bluish-gray-600 border-b items-start">
        <div className="flex flex-wrap items-center gap-2 flex-[3] min-w-0">
          <div className="flex-1 min-w-0">
            <Popover
              onOpenChange={(open) => {
                if (!open) setTagSearch('')
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className="h-9 w-full cursor-pointer justify-between !px-3 text-sm transition-colors duration-200"
                >
                  <span className="line-clamp-1">{tagFilterLabel}</span>
                  <CaretDownIcon className="size-4 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 rounded-xl p-0" align="start" side={'bottom'}>
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
                <div
                  className="max-h-64 overflow-y-auto overscroll-contain p-2"
                  onWheel={(e) => e.stopPropagation()}
                >
                  {!tagSearch.trim() && (
                    <button
                      onClick={resetFilters}
                      className="hover:bg-cta-menu-item-hovered flex h-9 w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
                    >
                      <span className="flex w-4 shrink-0 items-center justify-center">
                        {appliedFiltersCount === 0 ? (
                          <CheckIcon className="size-4" weight="bold" />
                        ) : null}
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
          </div>
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
          className="h-9 md:flex-1 !min-w-0"
        />
      </div>
      {paginatedPosts.length > 0 ? (
        <div className={' border-x border-bluish-gray-600'}>
          <div className=" grid grid-cols-1 p-4 gap-8 lg:p-8 md:gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {paginatedPosts.map((post: Post, idx: number) => (
              <BlogCard key={`blog-${idx}`} post={post} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="py-4 flex items-center justify-center gap-2 border-t border-bluish-gray-600 ">
              <Button
                variant="ghost"
                className="size-7 cursor-pointer !p-0"
                onClick={() => {
                  setPage(Math.max(1, currentPage - 1))
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                disabled={currentPage === 1}
              >
                <CaretLeftIcon size={16} />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'secondary' : 'ghost'}
                  className="size-7 cursor-pointer !p-0 text-sm"
                  onClick={() => {
                    setPage(page)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="ghost"
                className="size-7 cursor-pointer !p-0"
                onClick={() => {
                  setPage(Math.min(totalPages, currentPage + 1))
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                disabled={currentPage === totalPages}
              >
                <CaretRightIcon size={16} />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <NoResults />
      )}
    </section>
  )
}
