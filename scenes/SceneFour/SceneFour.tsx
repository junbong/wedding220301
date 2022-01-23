import React, { useEffect, useMemo, useRef } from 'react'
import type { CSSProperties } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import { SCENE_PADDING, SCENE_FOUR_DIM_PADDING } from '../../constants'
import { SceneProps } from '../../types'
import styles from './SceneFour.module.scss'

import SnapV1 from '../../public/images/snap_v_01.jpg'
import SnapV2 from '../../public/images/snap_v_02.jpg'
import SnapV3 from '../../public/images/snap_v_03.jpg'
import SnapV4 from '../../public/images/snap_v_04.jpg'

import Snap1 from '../../public/images/snap_01.jpg'
import Snap2 from '../../public/images/snap_02.jpg'
import Snap3 from '../../public/images/snap_03.jpg'
import Snap4 from '../../public/images/snap_04.jpg'
import Snap5 from '../../public/images/snap_05.jpg'
import Snap6 from '../../public/images/snap_06.jpg'
import Snap7 from '../../public/images/snap_07.jpg'
import Snap8 from '../../public/images/snap_08.jpg'
import Snap9 from '../../public/images/snap_09.jpg'
import Snap10 from '../../public/images/snap_10.jpg'
import Snap11 from '../../public/images/snap_11.jpg'
import Snap12 from '../../public/images/snap_12.jpg'
import Snap13 from '../../public/images/snap_13.jpg'

const PHOTO_SIZE_RATIO = 0.9

const noop = () => {}

export interface SceneFourProps extends SceneProps {}

function SceneFour(
  {
    wrapperWidth = 0,
    wrapperHeight = 0,
    currentScroll = 0,
    sceneHeight,
    onSetStyle = noop,
  }: SceneFourProps
) {
  const isSceneDisplaying = useRef<boolean>(false)

  const sceneTop = useMemo(() => (
    (sceneHeight * 4) + (SCENE_PADDING * 3)
  ), [
    sceneHeight,
  ])

  useEffect(function dimWrapper() {
    const currentScrollBottom = currentScroll + sceneHeight

    if (currentScrollBottom >= sceneTop) {
      const ratio = Math.min((currentScrollBottom - sceneTop) / SCENE_FOUR_DIM_PADDING, 1)
      onSetStyle({
        backgroundColor: `rgba(0, 0, 0, ${ratio})`,
      })

      isSceneDisplaying.current = true
    } else {
      onSetStyle(undefined)
    }
  }, [
    sceneTop,
    sceneHeight,
    currentScroll,
    onSetStyle,
  ])

  const sceneContainerStyle = useMemo<CSSProperties>(() => ({
    top: sceneTop,
    width: wrapperWidth,
    height: sceneHeight,
  }), [
    wrapperWidth,
    currentScroll,
    sceneHeight,
  ])

  const photoGap = useMemo<number>(() => (
    wrapperWidth * 0.01
  ), [
    wrapperWidth,
  ])

  const photoWrapperStyle = useMemo<CSSProperties>(() => ({
    gap: photoGap,
  }), [
    photoGap,
  ])

  const photoStyle = useMemo<CSSProperties>(() => {
    const photoWidth = (wrapperWidth / 3) - (photoGap * (3 - 1))
    return {
      width: photoWidth,
      height: photoWidth,
    }
  }, [
    wrapperWidth,
  ])

  return (
    <div
      className={classNames(styles.wrapper, 'scene')}
      style={sceneContainerStyle}
    >
      <div className={styles.galleryTitle}>
        Gallery
      </div>

      <div
        className={styles.photoWrapper}
        style={photoWrapperStyle}
      >
        { [
          SnapV1, SnapV2, SnapV3,
          Snap2, Snap3, Snap4,
        ].map((snap, index) => (
          <div
            key={index.toString(32)}
            className={styles.photoCell}
            style={photoStyle}
          >
            <Image
              src={snap}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
        )) }
      </div>

      <div
        style={{
          margin: photoGap * 2,
        }}
      >
        <Image
          src={Snap5}
          layout="fixed"
          quality={100}
          placeholder="blur"
          alt="Wedding photo"
          width={(wrapperWidth - (photoGap * 4))}
          height={(wrapperWidth - (photoGap * 4)) * 0.6666}
        />
      </div>

      <div
        className={styles.photoWrapper}
        style={photoWrapperStyle}
      >
        { [
          Snap1, Snap6, SnapV4,
          Snap7, Snap8, Snap9,
        ].map((snap, index) => (
          <div
            key={index.toString(32)}
            className={styles.photoCell}
            style={photoStyle}
          >
            <Image
              src={snap}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
        )) }
      </div>

      <div
        className={styles.photoWrapper}
        style={photoWrapperStyle}
      >
        { [
          Snap10, Snap11, Snap12,
        ].map((snap, index) => (
          <div
            key={index.toString(32)}
            className={styles.photoCell}
            style={photoStyle}
          >
            <Image
              src={snap}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
        )) }
      </div>
    </div>
  )
}

export default SceneFour
