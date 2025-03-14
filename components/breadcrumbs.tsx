import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  title: string
  href: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />}
            {item.current ? (
              <span className="font-medium text-foreground" aria-current="page">
                {item.title}
              </span>
            ) : (
              <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

