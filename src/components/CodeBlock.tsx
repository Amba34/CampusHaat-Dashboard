'use client'

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  className?: string
}

export const CodeBlock = ({ code, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className={cn(
        "relative rounded-lg border bg-muted p-4 font-mono text-sm text-muted-foreground overflow-x-auto",
        className
      )}
    >
      <pre>{code}</pre>
      <Button
        size="icon"
        variant="ghost"
        onClick={handleCopy}
        className="absolute top-2 right-2 h-7 w-7"
      >
        <Copy className="h-4 w-4" />
      </Button>
      {copied && (
        <span className="absolute top-2 right-10 text-xs text-green-500">Copied!</span>
      )}
    </div>
  )
}
