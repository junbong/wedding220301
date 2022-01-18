import React, { useMemo } from 'react'
import type { CSSProperties } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import { SCENE_PADDING } from '../../constants'
import { SceneProps } from '../../types'
import Calendar from '../../components/Calendar'
import Snap2 from '../../public/images/snap_02.jpg'
import styles from './SceneTwo.module.scss'

const THE_DAY = new Date(2022, 2, 1)
const REMAINING_DAYS = (() => {
  let now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setMilliseconds(0)
  const gap = THE_DAY.getTime() - now.getTime()
  return Math.round((gap / 1000) / (60 * 60 * 24))
})()

export interface SceneTwoProps extends SceneProps {}

function SceneTwo(
  {
    wrapperWidth = 0,
    wrapperHeight = 0,
    currentScroll = 0,
    sceneHeight,
  }: SceneTwoProps
) {
  const sceneContainerStyle = useMemo<CSSProperties>(() => ({
    top: (sceneHeight * 2) + (SCENE_PADDING * 1),
    width: wrapperWidth,
    height: sceneHeight,
  }), [
    wrapperWidth,
    currentScroll,
    sceneHeight,
  ])

  return (
    <div
      className={classNames(styles.wrapper, 'scene')}
      style={sceneContainerStyle}
    >
      <Image
        src={Snap2}
        layout="fixed"
        quality={100}
        placeholder="blur"
        alt="Wedding photo"
        width={wrapperWidth}
        height={wrapperWidth * 0.6666}
      />

      <div className={styles.venue}>
        2022. 03. 01 TUE PM 12:00<br />
        그랜드힐 컨벤션 3F 그랜드볼룸
      </div>

      <Calendar className={styles.calendar} />

      <div className={styles.remainingDaysWrapper}>
        전봉 ❤️ 다은의 결혼식이 <strong>{ `${REMAINING_DAYS}일` }</strong> 남았습니다.
      </div>
    </div>
  )
}

export default SceneTwo
