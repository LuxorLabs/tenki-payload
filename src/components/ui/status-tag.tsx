'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface StatusTagProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  label: string
  type?: 'neutral' | 'positive' | 'negative' | 'caution' | 'info'
}

export function StatusTag({ className, type = 'positive', icon, label, ...props }: StatusTagProps) {
  return (
    <div
      className={cn(
        'text-status-foreground inline-flex h-5 flex-nowrap items-center gap-1 rounded-sm px-1.5 py-0.5 text-sm leading-5 md:py-1',
        type === 'info' && 'bg-[#001133] text-[#047bff] ',
        type === 'positive' && 'bg-[#052f1a] text-[#26c281] ',
        className,
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <p className="whitespace-nowrap text-xs font-normal leading-5">{label}</p>
    </div>
  )
}
