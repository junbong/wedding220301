import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import InvitationCard from '../../components/InvitationCard'
import styles from './SceneOne.module.scss'

const CARD_SIZE_BY_CONTAINER = 0.8
const CARD_SCALE_TIMING_BY_OPENING = 0.5

export interface SceneOneProps {
  wrapperWidth?: number
  wrapperHeight?: number
  currentScroll?: number
}

function SceneOne(
  {
    wrapperWidth = 0,
    wrapperHeight = 0,
    currentScroll = 0,
  }: SceneOneProps
) {
  const sceneContainerStyle = useMemo(() => ({
    width: wrapperWidth,
  }), [
    wrapperWidth,
  ])

  const cardOpening = useMemo(() => (
    Math.min(currentScroll / (wrapperHeight / 4), 1)
  ), [
    wrapperHeight,
    currentScroll,
  ])

  const cardStyle = useMemo<CSSProperties>(() => {
    const transform = [
      (cardOpening > CARD_SCALE_TIMING_BY_OPENING)
        ? `translate(-50%, ${-50 + ((cardOpening - CARD_SCALE_TIMING_BY_OPENING) * 100)}%)`
        : 'translate(-50%, -50%)',
      (cardOpening > CARD_SCALE_TIMING_BY_OPENING)
        ? `scale(${Math.min(CARD_SIZE_BY_CONTAINER + (cardOpening - CARD_SCALE_TIMING_BY_OPENING), 1)})`
        : `scale(${CARD_SIZE_BY_CONTAINER})`,
    ].join(' ')

    return {
      left: '50%',
      top: '50%',
      transform,
    }
  },[
    cardOpening,
  ])

  return (
    <div
      className={classNames(styles.One, 'scene')}
      style={sceneContainerStyle}
    >
      <InvitationCard
        style={cardStyle}
        wrapperWidth={wrapperWidth}
        opening={cardOpening}
      />

      <div
        className={classNames(styles.arrowForOpenWrapper, {
          [styles.hideAway]: (cardOpening > 0),
        })}
      >
        <Image
          className={styles.arrowImage}
          src="/images/arrow_with_drawable.png"
          layout="fill"
        />

        <div className={styles.drawableCircle} />
      </div>
    </div>
  )
}

export default SceneOne
