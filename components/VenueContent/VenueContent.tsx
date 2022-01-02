import Image from 'next/image'

import styles from './VenueContent.module.scss'

function VenueContent() {
  return (
    <div className={styles.content}>
      <div className={styles.map}>
        <Image
          className={styles.venueImage}
          src="/images/venue_map.png"
          layout="responsive"
          width={230}
          height={245}
          quality={100}
          alt="Venue map"
        />
      </div>

      <div className={styles.transportations}>
        <Image
          className={styles.venueImage}
          src="/images/venue_transportations.png"
          layout="responsive"
          width={260}
          height={150}
          quality={100}
          alt="Venue information about transportation"
        />
      </div>
    </div>
  )
}

export default VenueContent
