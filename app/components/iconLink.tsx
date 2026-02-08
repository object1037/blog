import type { JSX, PropsWithChildren } from 'hono/jsx'
import type { IconNode } from 'lucide'
import { LucideIcon, type WithRequired } from './lucideIcon'

export const IconLink = ({
  icon,
  title,
  ...rest
}: WithRequired<PropsWithChildren<JSX.IntrinsicElements['a']>, 'title'> & {
  icon: IconNode
}) => {
  return (
    <a {...rest}>
      <LucideIcon icon={icon} title={title} />
    </a>
  )
}
