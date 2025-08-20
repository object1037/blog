import { css, cx } from 'hono/css'
import { useEffect, useState } from 'hono/jsx'
import { Menu, X } from 'lucide'
import { LucideIcon } from '../components/lucideIcon'
import { getToC, type ToCEl } from '../lib/getToC.client'
import { ToCSub } from './toc'

export const ToCMobile = () => {
  const [open, setOpen] = useState(false)
  const [toc, setToC] = useState<ToCEl[]>([])

  useEffect(() => {
    setToC(getToC())
  }, [])

  const navStyle = css`
    position: absolute;
    bottom: 1.25rem;
    right: 1.25rem;
    width: 11rem;
    max-height: calc(100dvh - 10rem);
    padding: 1rem;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
    background-color: #fafafa;
    overflow-y: auto;
    transition: transform 0.1s cubic-bezier(0, 0, 0.2, 1);
    transform-origin: bottom right;
    @starting-style {
      transform: scale(0.93);
    }
  `
  const buttonStyle = css`
    position: relative;
    background-color: #171717;
    color: #fafafa;
    padding: 0.875rem;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.75rem;
    z-index: 50;
    cursor: pointer;
  `
  const iconStyle = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: font-size 0.05s cubic-bezier(0, 0, 0.2, 1);
  `
  const hideStyle = css`
    font-size: 0;
    transition-duration: 0s;
  `

  return (
    <>
      {open && (
        <nav class={navStyle}>
          <ToCSub toc={toc} setOpen={setOpen} />
        </nav>
      )}
      <button type="button" onClick={() => setOpen(!open)} class={buttonStyle}>
        <LucideIcon
          icon={X}
          title="Close ToC"
          class={cx(iconStyle, !open && hideStyle)}
        />
        <LucideIcon
          icon={Menu}
          title="Open ToC"
          class={cx(iconStyle, open && hideStyle)}
        />
      </button>
    </>
  )
}
