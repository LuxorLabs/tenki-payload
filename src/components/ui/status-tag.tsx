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
        'inline-flex h-6 flex-nowrap items-center gap-x-1 rounded-md px-2 py-1 leading-5 ring',
        type === 'info' && 'bg-[#001133] text-[#047bff] ring-[#003875]',
        type === 'positive' && 'bg-[#052f1a] text-[#26c281] ring-[#0f5a33]',
        className,
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <p className="whitespace-nowrap text-xs font-normal leading-5">{label}</p>
    </div>
  )
}
