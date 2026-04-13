import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  cn(
    'ring-offset-background inline-flex cursor-pointer items-center justify-center gap-1 rounded-sm text-sm font-medium whitespace-nowrap transition-colors',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-button-primary-rest',
          'hover:bg-button-primary-interacted hover:border-button-primary-hovered-border active:bg-button-primary-interacted',
          'focus-visible:bg-button-primary-interacted focus-visible:outline-button-primary-selected-border focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
          'aria-selected:bg-button-primary-interacted aria-selected:outline-button-primary-selected-border aria-selected:outline aria-selected:outline-1',
        ),
        destructive: cn(
          'bg-button-destructive-rest hover:bg-button-destructive-hovered',
          'active:bg-button-destructive-interacted',
          'focus-visible:bg-button-destructive-interacted focus-visible:outline-button-destructive-selected-border focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
          'aria-selected:bg-button-destructive-interacted aria-selected:outline-button-destructive-selected-border aria-selected:outline aria-selected:outline-1',
        ),
        ghost: cn(
          'hover:bg-button-ghost-hovered active:bg-button-ghost-interacted bg-transparent',
          'focus-visible:bg-button-ghost-interacted focus-visible:outline-button-ghost-selected-border focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
          'aria-selected:bg-button-ghost-interacted aria-selected:outline-button-ghost-selected-border aria-selected:outline aria-selected:outline-1',
        ),
        link: 'text-primary underline-offset-4 hover:underline',
        tertiary: cn(
          'bg-button-tertiary-rest hover:bg-button-tertiary-hovered active:bg-button-tertiary-interacted',
          'focus-visible:bg-button-tertiary-interacted focus-visible:outline-button-tertiary-selected-border focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
        ),
        outline: cn(
          'outline-button-outline-border bg-transparent outline outline-1',
          'hover:outline-button-outline-hovered-border active:outline-button-outline-hovered-border hover:outline active:outline active:outline-1',
          'focus-visible:bg-button-outline-selected focus-visible:outline-button-outline-selected-border focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
          'aria-selected:bg-button-outline-selected aria-selected:outline-button-outline-selected-border aria-selected:outline aria-selected:outline-1',
        ),
        secondary: cn(
          'bg-button-secondary-rest outline-button-secondary-border outline outline-1',
          'hover:bg-button-secondary-hovered hover:outline-button-secondary-border hover:outline',
          'active:bg-button-secondary-interacted active:outline-button-secondary-border active:outline',
          'focus-visible:bg-button-secondary-interacted focus-visible:outline-button-secondary-selected-border focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
          'aria-selected:bg-button-secondary-interacted aria-selected:outline-button-secondary-selected-border aria-selected:outline aria-selected:outline-1',
        ),
        comboBox: cn(
          'bg-input-controls ring-offset-background data-[placeholder]:text-input-controls-secondary border-none',
          'flex h-10 w-full items-center justify-between rounded-lg border text-xs',
          'ring-input-controls-border hover:ring-input-controls-hovered-border ring',
          'focus-visible:outline-button-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
        ),
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-sm px-3',
        lg: 'h-11 rounded-sm px-8',
        icon: 'max-h-10 max-w-10 p-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  iconClassName?: string
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon: Icon,
      iconClassName,
      children,
      isLoading,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {Icon && !isLoading && <Icon className={cn('size-4', iconClassName)} />}
        {children}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
