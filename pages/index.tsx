import { useEffect, useState, useRef, useCallback, CSSProperties } from 'react'
import Head from 'next/head'
import { useResizeDetector } from 'react-resize-detector'

import { SCENES_COUNT } from '../constants'
import SceneOne from '../scenes/SceneOne'
import SceneTwo from '../scenes/SceneTwo'
import SceneThree from '../scenes/SceneThree'
import SceneFour from '../scenes/SceneFour'

export default function Home() {
  const deviceHeight = useRef<number>()
  const prevTouchPosition = useRef<number>(0)
  const isAutoScrolling = useRef<boolean>(false)
  const [scrollY, setScrollY] = useState<number>(0)
  const [containerStyle, setContainerStyle] = useState<CSSProperties>()

  const { ref: containerRef } = useResizeDetector({
    onResize: function onResize() {
      if (
        !deviceHeight.current ||
        deviceHeight.current < window.visualViewport.height
      ) {
        deviceHeight.current = window.visualViewport.height
      }
    }
  })
  const { ref: scrollContainerRef, width, height } = useResizeDetector()

  useEffect(function moveToNativeBrowser() {
    if (navigator.userAgent.match(/inapp|NAVER|KAKAOTALK|Snapchat|Line|WirtschaftsWoche|Thunderbird|Instagram|everytimeApp|WhatsApp|Electron|wadiz|AliApp|zumapp|iPhone(.*)Whale|Android(.*)Whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1]/i)) {
      document.body.innerHTML = '';

      if (navigator.userAgent.match(/iPhone|iPad/i)) {
        location.href='ftp://wedding220301.com/bridge.html?_targeturl='+location.href;
      } else {
        location.href='intent://'+location.href.replace(/https?:\/\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
      }
    }
  }, [])

  const windowSmoothScrollTo = useRef((targetY: number, cb: Function) => {
    console.log('%cwindowSmoothScrollTo', 'font-weight:bold;color:black')
    const currentScrollY = window.scrollY
    const scrollAmount = targetY - currentScrollY
    const step = 1000 / scrollAmount

    console.log({
      currentScrollY,
      targetY,
      scrollAmount,
      step,
    })
    let start
    let progress

    function smoothScrollBody(timestamp) {
      if (!start) start = timestamp
      progress = timestamp - start
      console.log('progress:', progress)

      if (progress < 1000) {
        // window.scrollBy(0, step)
        window.requestAnimationFrame(smoothScrollBody)
      } else {
        cb()
      }
    }
    window.requestAnimationFrame(smoothScrollBody)
  })

  useEffect(function attachWindowScrollEventListener() {
    function handleScrollWindow() {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScrollWindow)

    return function cleanup() {
      window.removeEventListener('scroll', handleScrollWindow)
    }
  }, [])

  useEffect(function attachWindowTouchEventListener() {
    function handleTouchStartWindow(event) {
      prevTouchPosition.current = event.changedTouches[0].screenY
    }

    function handleTouchEndWindow(event) {
      const currentTouchPosition = event.changedTouches[0].screenY - prevTouchPosition.current
      if (
        deviceHeight.current &&
        currentTouchPosition < 0
      ) {
        // Snap to Scene
        if (window.scrollY >= (deviceHeight.current * 4)) {
          //
        } else if (window.scrollY >= (deviceHeight.current * 3.1)) {
          window.scroll({
            top: deviceHeight.current * 4,
            behavior: 'smooth',
          })
        } else if (window.scrollY >= (deviceHeight.current * 2.1)) {
          window.scroll({
            top: deviceHeight.current * 3,
            behavior: 'smooth',
          })
        } else if (window.scrollY >= (deviceHeight.current * 1.1)) {
          window.scroll({
            top: deviceHeight.current * 2,
            behavior: 'smooth',
          })
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStartWindow)
    window.addEventListener('touchend', handleTouchEndWindow)

    return function cleanup() {
      window.removeEventListener('touchstart', handleTouchStartWindow)
      window.removeEventListener('touchend', handleTouchEndWindow)
    }
  }, [])

  const handleSetStyle = useCallback((style: CSSProperties) => {
    setContainerStyle(style)
  }, [])

  return (
    <div
      ref={containerRef}
      className="container"
    >
      <Head>
        <title>Wedding Invitation</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a03f9d9e75edf1acc768186daa32169b"></script>

        <meta property="og:title" content="전봉 ❤ 다은 결혼합니다" key="title" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://wedding220301.com" />
        <meta property="og:description" content="2022년 3월 1일 화요일 낮 12시, 그랜드힐 컨벤션 3F 그랜드볼룸" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image" content="http://wedding220301.com/images/og_image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Wedding Invitation - 2022/03/01" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
      </Head>

      <div
        ref={scrollContainerRef}
        className="scrollContainer"
        style={containerStyle}
      >
        <main
          style={{
            height: `${(SCENES_COUNT + 1) * 100}vh`,
          }}
        >
          <SceneOne
            wrapperWidth={width}
            wrapperHeight={height}
            currentScroll={scrollY}
            sceneHeight={deviceHeight.current}
            onSetStyle={handleSetStyle}
          />

          <SceneTwo
            wrapperWidth={width}
            wrapperHeight={height}
            currentScroll={scrollY}
            sceneHeight={deviceHeight.current}
            onSetStyle={handleSetStyle}
          />

          <SceneThree
            wrapperWidth={width}
            wrapperHeight={height}
            currentScroll={scrollY}
            sceneHeight={deviceHeight.current}
            onSetStyle={handleSetStyle}
          />

          <SceneFour
            wrapperWidth={width}
            wrapperHeight={height}
            currentScroll={scrollY}
            sceneHeight={deviceHeight.current}
            onSetStyle={handleSetStyle}
          />
        </main>
      </div>

      <footer>
        <h1>그랜드힐 컨벤션 3층 그랜드볼룸</h1>
        <h2>서울 강남구 역삼로 607</h2>
        <h2>02-6964-7889</h2> <br />
        <h3>Created by Junbong</h3>
      </footer>
    </div>
  )
}
