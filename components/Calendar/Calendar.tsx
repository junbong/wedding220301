import { useState, useRef, useMemo, useEffect } from 'react'
import range from 'lodash/range'
import classNames from 'classnames'

import styles from './Calendar.module.scss'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const DAYS = [27, 28, ...range(1, 31), null, null, null]

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

  useEffect(function retrieveWrapperWidth() {
    setTimeout(() => {
      if (wrapperRef.current) {
        setWrapperWidth(wrapperRef.current.clientWidth)
      }
    }, 10)
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
          className={classNames(styles.day, styles.weekdays, {
            [styles.sunday]: index % 7 === 0,
          })}
          style={dayElementStyle}
        >
          { weekday }
        </div>
      )) }

      { (() => {
        let isPrevMonth = true
        return DAYS.map((day: number | null, index: number) => {
          if (isPrevMonth && day === 1) { isPrevMonth = false }
          return (
            <div
              key={index.toString(32)}
              className={classNames(styles.day, {
                [styles.sunday]: index % 7 === 0,
                [styles.highlight]: day === 1,
                [styles.prevMonth]: isPrevMonth,
              })}
              style={dayElementStyle}
              data-day={day}
            >
              { day }
            </div>
          )
        })
      })() }
    </div>
  )
}

export default Calendar
