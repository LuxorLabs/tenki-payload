'use client'

import { useMemo, useState } from 'react'
import { XIcon } from '@phosphor-icons/react'
import { isAfter, isBefore, isEqual } from 'date-fns'
import { BlogCard } from './BlogCard'
import { Button } from '@/components/ui/button'
import { NoResults } from '@/components/no-results'
import { DatePickerRange, DateRange } from '@/components/ui/date-range'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/utils/hooks/use-debounce'
import type { Post, Tag } from '@/payload-types'

type PostsProps = {
  posts: Post[]
  tags: Tag[]
}

export const Posts = ({ posts, tags }: PostsProps) => {
  const tagNames = useMemo(() => {
    return tags.map((tag) => tag.name).filter(Boolean) as string[]
  }, [tags])

  const [dateRange, setDateRange] = useState<DateRange>()
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

  const resetFilters = () => {
    setFilters(Object.fromEntries(tagNames.map((name) => [name, false])))
  }

  return (
    <section className="relative mx-auto mt-6 max-w-5xl px-6 md:mb-28 md:px-12 xl:px-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-wrap gap-2">
          {tagNames.map((tag) => (
            <Button
              key={tag}
              className={cn(
                'hover:border-cta-secondary-selected-border cursor-pointer h-9 !p-2.5 transition-colors duration-200',
                filters[tag as string] &&
                  'border-cta-secondary-selected-border bg-cta-secondary-interacted',
              )}
              variant={'secondary'}
              onClick={() => {
                setFilters({
                  ...filters,
                  [tag as string]: !filters[tag as string],
                })
              }}
            >
              {tag}
            </Button>
          ))}
          {appliedFiltersCount > 0 && (
            <Button
              variant="secondary"
              className="hover:border-cta-secondary-selected-border cursor-pointer h-9 !p-2.5 transition-all duration-200"
              onClick={resetFilters}
            >
              {appliedFiltersCount} {appliedFiltersCount > 1 ? 'Filters' : 'Filter'} Applied
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
      {filteredPosts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post: Post, idx: number) => (
            <BlogCard key={`blog-${idx}`} post={post} />
          ))}
        </div>
      ) : (
        <NoResults />
      )}
    </section>
  )
}
