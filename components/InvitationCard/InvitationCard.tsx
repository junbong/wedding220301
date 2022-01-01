import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import VenueContent from '../VenueContent'
import InvitationContent from '../InvitationContent'
import styles from './InvitationCard.module.scss'

export interface InvitationCardProps {
  className?: string
  style?: CSSProperties
  wrapperWidth: number
  opening?: number
}

function InvitationCard(
  {
    className,
    style = {},
    wrapperWidth = 300,
    opening = 0,
  }: InvitationCardProps
) {
  const cardSize = useMemo(() => {
    const width = wrapperWidth
    return {
      width,
      height: width * 0.7,
    }
  }, [
    wrapperWidth,
  ])

  const cardStyle = useMemo<CSSProperties>(() => {
    return {
      ...cardSize,
      ...style,
    }
  }, [
    style,
    cardSize.width,
    cardSize.height,
  ])

  const imageSize = useMemo(() => ({
    width: cardSize.width * 0.8,
    height: cardSize.height * 0.9,
  }), [
    cardSize.width,
    cardSize.height,
  ])

  const frontPageStyle = useMemo<CSSProperties>(() => {
    const rotateDegree = 180 * opening

    return {
      ...cardSize,
      transform: `rotateX(${Math.max(2, rotateDegree)}deg)`,
    }
  }, [
    opening,
    cardSize.width,
    cardSize.height,
  ])

  const frontPageContentStyle = useMemo(() => {
    const rotateDegree = 180 * opening

    return {
      transform: `translate(-50%, 0%) rotateX(${Math.max(2, rotateDegree)}deg) scaleY(-1)`,
      display: (opening >= 0.417)
        ? 'block'
        : 'none',
    }
  }, [
    opening,
  ])

  const pageShadowStyle = useMemo<CSSProperties>(() => {
    const scaleSize = Math.max(
      Math.min(1, (1 + 0.22) - Math.min(opening / 0.5, (1 + 0.22))),
      0,
    )

    return {
      transform: `scaleY(${scaleSize})`,
      display: (scaleSize > 0)
        ? 'block'
        : 'none'
    }
  }, [
    opening,
  ])

  return (
    <div
      className={classNames(styles.card, className)}
      style={cardStyle}
    >
      <div
        className={styles.frontPage}
        style={frontPageStyle}
      >
        <div className={styles.mainImageWrapper}>
          <Image
            src="/images/main.png"
            layout="fixed"
            quality={100}
            alt="Wedding Invitation"
            {...imageSize}
          />
        </div>
      </div>

      <div
        className={styles.frontPageContent}
        style={frontPageContentStyle}
      >
        <VenueContent />
      </div>

      <div
        className={styles.pageShadow}
        style={pageShadowStyle}
      />

      <div
        className={styles.backPage}
        style={cardSize}
      >
        <div className={styles.content}>
          <InvitationContent />
        </div>
      </div>
    </div>
  )
}

export default InvitationCard
