import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const PRODUCT_HUNT_EMBED_URL =
  'https://www.producthunt.com/products/tenki-cloud?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-tenki&#0045;cloud'

const PRODUCT_HUNT_EMBED_IMAGE_URL =
  'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=971210&theme=light&t=1751472708644'

const PRODUCT_HUNT_EMBED_IMAGE_DARK_URL =
  'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=971210&theme=dark&t=1751472708644'

type ProductHuntTagProps = {
  theme?: 'light' | 'dark'
  className?: string
}

export const ProductHuntTag = ({ theme = 'light', className }: ProductHuntTagProps) => {
  const imageSrc =
    theme === 'dark' ? PRODUCT_HUNT_EMBED_IMAGE_DARK_URL : PRODUCT_HUNT_EMBED_IMAGE_URL

  return (
    <section className={cn('flex flex-col gap-y-6 md:min-w-lg', className)}>
      <Link href={PRODUCT_HUNT_EMBED_URL} target="_blank" rel="noopener noreferrer">
        <Image
          src={imageSrc}
          alt="Tenki Cloud - GitHub Actions. 90% cheaper. 30% faster. 2-clicks migration. | Product Hunt"
          className="h-8 w-40 md:h-[42px] lg:h-[54px] lg:w-[250px]"
          width={250}
          height={54}
        />
      </Link>
    </section>
  )
}
