import { cn } from '@/lib/utils'

type SectionDividerProps = {
  className?: string
}

export const SectionDivider = ({ className }: SectionDividerProps) => {
  return (
    <div
      className={cn(
        'relative flex h-10 w-full items-start overflow-clip px-4 xl:h-20 xl:px-0',
        className,
      )}
    >
      <div className="border-bluish-gray-600 border-dashed-spaced pointer-events-none absolute inset-x-0 top-0 border-t" />
      <div className="border-bluish-gray-600 border-dashed-spaced pointer-events-none absolute inset-x-0 bottom-0 border-b" />
      {/* Inner section  */}
      <div className="border-bluish-gray-600 mx-auto flex h-full flex-1 items-center self-stretch border-y xl:max-w-[1080px] 2xl:max-w-[1200px]">
        <div className="border-bluish-gray-600 border-dashed-spaced-vertical h-full min-h-px min-w-px flex-1 border-l" />
        <div className="border-bluish-gray-600 border-dashed-spaced-vertical h-full shrink-0 border-r" />
      </div>
    </div>
  )
}

type NavigationDividerProps = {
  className?: string
}
export const NavigationDivider = ({ className }: NavigationDividerProps) => {
  return (
    <div
      className={cn('relative flex h-5 items-start overflow-clip px-4 lg:h-10 xl:px-0', className)}
    >
      <div className="border-bluish-gray-600 border-dashed-spaced pointer-events-none absolute inset-x-0 bottom-0 border-b" />
      {/* Inner section  */}
      <div className="border-bluish-gray-600 mx-auto flex h-full flex-1 items-center self-stretch border-b xl:max-w-[1080px] 2xl:max-w-[1200px]">
        <div className="border-bluish-gray-600 border-dashed-spaced-vertical h-full min-h-px min-w-px flex-1 border-x" />
      </div>
    </div>
  )
}
