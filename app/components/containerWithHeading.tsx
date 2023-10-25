import { css } from 'styled-system/css'
import { container, divider } from 'styled-system/patterns'

export const ContainerWithHeading = ({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) => {
  const containerStyle = container({
    maxWidth: '3xl',
    px: { base: '6', md: '8', lg: '10' },
  })
  const dividerStyle = divider({
    color: 'neutral.700',
    w: '10',
    mt: '2',
  })
  const headingStyle = css({
    fontSize: '5xl',
    fontWeight: 'bold',
    py: '6',
  })

  return (
    <div className={containerStyle}>
      <div className={dividerStyle} />
      <h1 className={headingStyle}>{heading}</h1>
      {children}
    </div>
  )
}
