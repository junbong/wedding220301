import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import set from 'lodash/set'
import isNil from 'lodash/isNil'

import { SCENE_PADDING } from '../../constants'
import InvitationCard from '../../components/InvitationCard'
import { SceneProps } from '../../types'
import styles from './SceneOne.module.scss'

const CARD_SIZE_BY_CONTAINER = 0.8
const CARD_SCALE_TIMING_BY_OPENING = 0.5

export interface SceneOneProps extends SceneProps {}

function SceneOne(
  {
    wrapperWidth = 0,
    wrapperHeight = 0,
    currentScroll = 0,
    sceneHeight,
  }: SceneOneProps
) {
  const sceneContainerStyle = useMemo(() => {
    const result = {
      width: wrapperWidth,
      height: sceneHeight,
    }
    if (
      !isNil(sceneHeight) &&
      currentScroll >= (sceneHeight + SCENE_PADDING)
    ) {
      set(result, 'position', 'absolute')
      set(result, 'top', sceneHeight + SCENE_PADDING)
    }
    return result
  }, [
    wrapperWidth,
    currentScroll,
    sceneHeight,
  ])

  const cardOpening = useMemo(() => (
    Math.min(currentScroll / sceneHeight, 1)
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
        <div className={styles.arrowImageWrapper}>
          <Image
            className={styles.arrowImage}
            src="/images/arrow_with_drawable.png"
            layout="fill"
          />

          <div className={styles.drawableCircle} />
        </div>
      </div>
    </div>
  )
}

export default SceneOne
