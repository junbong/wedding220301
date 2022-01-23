import React, { useMemo, useLayoutEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import { SCENE_PADDING, VENUE_LATITUDE, VENUE_LONGITUDE } from '../../constants'
import { SceneProps } from '../../types'
import styles from './SceneThree.module.scss'

import Snap3 from '../../public/images/snap_03.jpg'
import CallIcon from '../../public/images/call_icon.png'
import SmsIcon from '../../public/images/sms_icon.png'

export interface SceneThreeProps extends SceneProps {}

function SceneThree(
  {
    wrapperWidth = 0,
    wrapperHeight = 0,
    currentScroll = 0,
    sceneHeight,
  }: SceneThreeProps
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
      }, 100)

      kakaoMapInitialized.current = true
    }
  }, [])

  const sceneContainerStyle = useMemo<CSSProperties>(() => ({
    top: (sceneHeight * 3) + (SCENE_PADDING * 2),
    width: wrapperWidth,
    height: sceneHeight,
  }), [
    wrapperWidth,
    currentScroll,
    sceneHeight,
  ])

  const snapImageProps = useMemo(() => ({
    width: wrapperWidth,
    height: wrapperWidth * 0.6666,
  }), [
    wrapperWidth,
  ])

  const contentWrapperStyle = useMemo(() => ({
    height: `calc(100vh - ${snapImageProps.height}px)`,
  }), [
    snapImageProps.height,
  ])

  const mapContainerStyle = useMemo<CSSProperties>(() => ({
    width: wrapperWidth,
  }), [
    wrapperWidth,
  ])

  const mapStyle = useMemo<CSSProperties>(() => ({
    width: wrapperWidth,
    height: wrapperWidth * 0.6666,
  }), [
    wrapperWidth,
  ])

  if (!wrapperHeight || !sceneHeight) { return null }

  return (
    <div
      className={classNames(styles.wrapper, 'scene')}
      style={sceneContainerStyle}
    >
      <Image
        src={Snap3}
        layout="fixed"
        quality={100}
        placeholder="blur"
        alt="Wedding photo"
        {...snapImageProps}
      />

      <div
        className={styles.contentWrapper}
        style={contentWrapperStyle}
      >
        <div className={styles.heroNames}>
          <div className={styles.heroName}>
            <strong>이강한</strong><strong>·</strong><strong>정임선</strong> 의 장남 <strong>전봉</strong><br />
          </div>
          <div className={styles.heroName}>
            <strong>정범석</strong><strong>·</strong><strong>김복원</strong> 의 장녀 <strong>다은</strong>
          </div>
        </div>

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

        <div className={styles.callings}>
          <div className={styles.calling}>
            <div>신랑에게 연락하기</div>

            <a href="tel:01037162233">
              <Image
                src={CallIcon}
                layout="fixed"
                quality={100}
                alt="Call to groom"
                width={24}
                height={24}
              />
            </a>

            <a href="sms:01037162233">
              <Image
                src={SmsIcon}
                layout="fixed"
                quality={100}
                alt="Sms to groom"
                width={28}
                height={24}
              />
            </a>
          </div>

          <div className={styles.calling}>
            <div>신부에게 연락하기</div>

            <a href="tel:01025863599">
              <Image
                src={CallIcon}
                layout="fixed"
                quality={100}
                alt="Call to bride"
                width={24}
                height={24}
              />
            </a>

            <a href="sms:01025863599">
              <Image
                src={SmsIcon}
                layout="fixed"
                quality={100}
                alt="Sms to bride"
                width={28}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SceneThree
