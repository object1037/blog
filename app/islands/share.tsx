import { css } from 'hono/css'
import { useState } from 'hono/jsx'
import { Check, Copy, Twitter } from 'lucide'
import { IconLink } from '../components/iconLink'
import { LucideIcon } from '../components/lucideIcon'

const copyHandler = async (
  text: string,
  setCopied: (value: boolean) => void,
) => {
  await navigator.clipboard.writeText(text)
  setCopied(true)
  setTimeout(() => setCopied(false), 2000)
}

export const Share = ({ title, url }: { title: string; url: string }) => {
  const [copied, setCopied] = useState(false)

  const text = `${title}｜ゆるふわインターネット\n`

  const headingStyle = css`
    font-size: 0.75rem;
    font-weight: 500;
    margin-right: 1rem;
  `
  const containerStyle = css`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem 0;
    margin: 1.5rem 0;
    color: #404040;
    border-top: 1px solid #e5e5e5;
  `
  const buttonStyle = css`
    font-size: 1.25rem;
    padding: 0.375rem;
    cursor: pointer;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      color: #a3a3a3;
    }
  `
  return (
    <section class={containerStyle}>
      <h2 class={headingStyle}>SHARE</h2>
      <IconLink
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        icon={Twitter}
        title="Post to Twitter"
        class={buttonStyle}
      />
      <button
        type="button"
        onClick={() => copyHandler(`${text}${url}`, setCopied)}
        class={buttonStyle}
      >
        <LucideIcon icon={copied ? Check : Copy} title="Copy title and URL" />
      </button>
    </section>
  )
}
