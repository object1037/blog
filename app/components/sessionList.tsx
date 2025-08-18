import { LogOut } from 'lucide'
import { css } from '../../styled-system/css'
import type { Session } from '../services/session'
import { LucideIcon } from './lucideIcon'

export const SessionList = ({
  sessions,
  currentSID,
}: {
  sessions: Session[]
  currentSID: string
}) => {
  const h2Style = css({
    fontWeight: 'semibold',
    fontSize: 'xl',
    mb: '2',
  })
  const ulStyle = css({
    divideY: '1px',
    divideColor: 'neutral.200',
  })
  const itemStyle = css({
    position: 'relative',
    p: '3',
  })
  const idStyle = css({
    fontWeight: 'medium',
    mb: '3',
  })
  const uaStyle = css({
    fontSize: 'xs',
    color: 'neutral.700',
  })
  const formStyle = css({
    position: 'absolute',
    top: '1',
    right: '1',
  })
  const logoutBStyle = css({
    p: '2',
    h: '8',
    rounded: 'lg',
    cursor: 'pointer',
    bg: { _hover: 'red.200' },
    transition: 'background',
  })

  return (
    <>
      <h2 class={h2Style}>Sessions: {sessions.length}</h2>
      <ul class={ulStyle}>
        {sessions.map((session) => (
          <li class={itemStyle}>
            <h2 class={idStyle}>
              {session.id === currentSID ? '[current] ' : ''}
              {session.id}
            </h2>
            <p class={uaStyle}>{session.userAgent}</p>
            <form action="/logout" method="post" class={formStyle}>
              <button
                type="submit"
                name="id"
                value={session.id}
                class={logoutBStyle}
              >
                <LucideIcon icon={LogOut} title="logout" />
              </button>
            </form>
          </li>
        ))}
      </ul>
    </>
  )
}
