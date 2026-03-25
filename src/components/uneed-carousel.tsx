'use client'

import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'

import { UneedDailyBadge } from '@/assets/svg/uneed-daily-badge.svg'
import { UneedMonthlyBadge } from '@/assets/svg/uneed-monthly-badge.svg'
import { UneedReviewBadge } from '@/assets/svg/uneed-review-badge.svg'
import { UneedWeeklyBadge } from '@/assets/svg/uneed-weekly-badge.svg'
import { Carousel, CarouselContent, CarouselDotButtons, CarouselItem } from '@/components/ui/carousel'

const TENKI_UNEED_TOOL_URL = 'https://www.uneed.best/tool/tenki'
const TENKI_UNEED_BLOG_URL = 'https://www.uneed.best/blog/tenki-cloud'

const UNEED_BADGES = [
  {
    id: 1,
    logo: <UneedDailyBadge />,
    link: TENKI_UNEED_TOOL_URL,
  },
  {
    id: 2,
    logo: <UneedWeeklyBadge />,
    link: TENKI_UNEED_TOOL_URL,
  },
  {
    id: 3,
    logo: <UneedMonthlyBadge />,
    link: TENKI_UNEED_TOOL_URL,
  },
  {
    id: 4,
    logo: <UneedReviewBadge />,
    link: TENKI_UNEED_BLOG_URL,
  },
]

export const UneedCarousel = () => {
  return (
    <div className="">
      <Carousel
        className="flex min-h-[44px] w-[202px] flex-col gap-y-2 lg:min-h-[54px] lg:w-[252px]"
        plugins={[
          Autoplay({
            playOnInit: true,
            delay: 5000,
            stopOnInteraction: false,
            stopOnFocusIn: false,
            stopOnMouseEnter: false,
          }),
        ]}
      >
        <CarouselContent className="gap-x-1">
          {UNEED_BADGES.map((badge) => (
            <CarouselItem key={badge.id} className="flex !basis-full items-center justify-center">
              <Link href={badge.link} target="_blank" rel="noopener noreferrer">
                <div className="block h-[44px] w-[200px] lg:h-[54px] lg:w-[250px]">{badge.logo}</div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDotButtons />
      </Carousel>
    </div>
  )
}
