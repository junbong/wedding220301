import { useMemo } from 'react'
import classNames from 'classnames'

import { SCENE_PADDING } from '../../constants'
import { SceneProps } from '../../types'
import styles from './SceneTwo.module.scss'

export interface SceneTwoProps extends SceneProps {}

function SceneTwo(
  {
    wrapperWidth = 0,
    wrapperHeight = 0,
    currentScroll = 0,
    sceneHeight,
  }: SceneTwoProps
) {
  const sceneContainerStyle = useMemo(() => ({
    top: (sceneHeight * 2) + SCENE_PADDING,
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
      <h1>Scene#2</h1>
    </div>
  )
}

export default SceneTwo
