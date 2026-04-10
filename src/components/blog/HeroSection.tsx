import { cn } from '@/lib/utils'

export const HeroSection = () => {
  return (
    <section
      className={cn(
        'border-bluish-gray-600 mx-auto max-w-[calc(100%-32px)] border-x border-b xl:max-w-[1080px] 2xl:max-w-[1200px]',
        'pt-26 pb-8 lg:pt-29 lg:pb-12',
      )}
    >
      <div className="flex flex-col items-start px-4 lg:px-8">
        <div className="flex w-full flex-col items-start gap-y-2 xl:gap-y-3">
          <div
            className={cn(
              'border-bluish-gray-600 text-static-primary font-geist-mono rounded-full border px-3 py-1 text-[10px] uppercase xl:text-sm',
            )}
          >
            Blog
          </div>
          <div className="space-y-2">
            <h1 className="text-static-primary text-left text-2xl font-semibold md:text-[30px]">
              What <span className="text-blue-150">Engineers</span> building{' '}
              <br className="hidden md:block" /> fast actually{' '}
              <span className="text-blue-150">read</span>.
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
