import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  cn(
    'ring-offset-background inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-button-primary-rest border-button-primary-rest-border border-t-[1.5px]',
          'hover:bg-button-primary-interacted hover:border-button-primary-hovered-border active:bg-button-primary-interacted active:bg-button-primary-interacted',
          'focus:bg-button-primary-interacted focus:outline focus:outline-1 focus:outline-offset-2',
          'focus-visible:outline-button-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
        ),
        destructive: cn(
          'bg-button-destructive-rest hover:bg-button-destructive-hovered',
          'active:bg-button-destructive-interacted',
          'focus:outline-button-primary-selected-border focus:bg-button-destructive-interacted focus:outline focus:outline-1 focus:outline-offset-2',
          'focus-visible:outline-button-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
        ),
        ghost: cn(
          'hover:bg-button-ghost-hovered active:bg-button-ghost-interacted bg-transparent',
          'focus:bg-button-ghost-interacted focus:outline-button-primary-selected-border focus:outline focus:outline-1 focus:outline-offset-2',
          'focus-visible:outline-button-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
        ),
        link: 'text-primary underline-offset-4 hover:underline',
        tertiary: cn(
          'bg-button-tertiary-rest hover:bg-button-tertiary-hovered active:bg-button-tertiary-interacted',
          'focus:bg-button-tertiary-interacted focus:outline-button-primary-selected-border focus:outline focus:outline-1 focus:outline-offset-2',
          'focus-visible:outline-button-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
        ),
        outline: cn(
          'outline-button-outline-border bg-transparent outline outline-1',
          'hover:outline-button-outline-hovered-border active:outline-button-outline-hovered-border hover:outline active:outline active:outline-1',
          'focus:outline-button-primary-selected-border focus:bg-button-outline-selected focus:outline focus:outline-1 focus:outline-offset-2',
          'focus-visible:outline-button-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
        ),
        secondary: cn(
          'bg-button-secondary-rest outline-button-secondary-border outline outline-1',
          'hover:bg-button-secondary-hovered hover:outline-button-secondary-border hover:outline',
          'active:bg-button-secondary-interacted active:outline-button-secondary-border active:outline',
          'focus:bg-button-secondary-interacted focus:outline-button-primary-selected-border focus:outline focus:outline-1 focus:outline-offset-2',
          'focus-visible:outline-button-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2',
        ),
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
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
  customIconSize?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, customIconSize = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), !customIconSize && '[&_svg]:size-4')}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
