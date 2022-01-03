import { useMemo, useLayoutEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import classNames from 'classnames'

import { SCENE_PADDING, VENUE_LATITUDE, VENUE_LONGITUDE } from '../../constants'
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
  const mapContainerRef = useRef<HTMLDivElement>()
  const kakaoMapInitialized = useRef<boolean>(false)

  useLayoutEffect(function initializeMap() {
    if (!kakaoMapInitialized.current) {
      setTimeout(() => {
        const kakao = (window as any).kakao

        const mapOptions = {
          center: new kakao.maps.LatLng(VENUE_LATITUDE, VENUE_LONGITUDE),
          level: 5,
        }
        const map = new kakao.maps.Map(mapContainerRef.current, mapOptions)
        map.setZoomable(false)
        map.setDraggable(false)

        const markerPosition  = new kakao.maps.LatLng(VENUE_LATITUDE, VENUE_LONGITUDE)
        const marker = new kakao.maps.Marker({
          position: markerPosition
        })
        marker.setMap(map)
      }, 0)

      kakaoMapInitialized.current = true
    }
  }, [])

  const sceneContainerStyle = useMemo<CSSProperties>(() => ({
    top: (sceneHeight * 2) + SCENE_PADDING,
    width: wrapperWidth,
    height: sceneHeight,
  }), [
    wrapperWidth,
    currentScroll,
    sceneHeight,
  ])

  const mapContainerStyle = useMemo<CSSProperties>(() => ({
    width: wrapperWidth,
  }), [
    wrapperWidth,
  ])

  const mapStyle = useMemo<CSSProperties>(() => ({
    width: wrapperWidth,
    height: wrapperWidth * 2/3,
  }), [
    wrapperWidth,
  ])

  return (
    <div
      className={classNames(styles.wrapper, 'scene')}
      style={sceneContainerStyle}
    >
      <div
        className={styles.mapContainer}
        style={mapContainerStyle}
      >
        <div
          ref={mapContainerRef}
          className={styles.map}
          style={mapStyle}
        />

        <a
          className={styles.linkDetail}
          href="https://map.kakao.com/link/map/1948333104"
          target="_blank"
        >
          지도를 자세히 보려면 여기를 눌러주세요
        </a>
      </div>
    </div>
  )
}

export default SceneTwo
