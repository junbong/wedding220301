import { useState, useRef, useMemo, useLayoutEffect } from 'react'
import range from 'lodash/range'
import classNames from 'classnames'

import styles from './Calendar.module.scss'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const DAYS = [null, null, ...range(1, 31), null, null, null]

export interface CalendarProps {
  className?: string
}

function Calendar(
  {
    className,
  }: CalendarProps
) {
  const wrapperRef = useRef<HTMLDivElement>()

  const [wrapperWidth, setWrapperWidth] = useState<number>(0)

  useLayoutEffect(function retrieveWrapperWidth() {
    setTimeout(() => {
      if (wrapperRef.current) {
        setWrapperWidth(wrapperRef.current.clientWidth)
      }
    }, 0)
  }, [
    wrapperRef.current,
  ])

  const dayElementStyle = useMemo(() => ({
    width: wrapperWidth / 7,
    height: wrapperWidth / 7,
  }), [
    wrapperWidth,
  ])

  return (
    <div
      ref={wrapperRef}
      className={classNames(styles.calendar, className)}
    >
      { WEEKDAYS.map((weekday: string, index: number) => (
        <div
          key={index.toString(32)}
          className={classNames(styles.day, {
            [styles.sunday]: index % 7 === 0,
          })}
          style={dayElementStyle}
        >
          { weekday }
        </div>
      )) }

      { DAYS.map((day: number | null, index: number) => (
        <div
          key={index.toString(32)}
          className={classNames(styles.day, {
            [styles.sunday]: index % 7 === 0,
            [styles.highlight]: day === 1,
          })}
          style={dayElementStyle}
          data-day={day}
        >
          { day }
        </div>
      )) }
    </div>
  )
}

export default Calendar
