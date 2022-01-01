import styles from './VenueContent.module.scss'

function VenueContent() {
  return (
    <div className={styles.content}>
      <div className={styles.map}>
        <div
          style={{
            backgroundImage: `url("/images/venue_map.png")`,
          }}
        />
      </div>

      <div className={styles.transportations}>
        <div
          style={{
            backgroundImage: `url("/images/venue_transportations.png")`,
          }}
        />
      </div>
    </div>
  )
}

export default VenueContent
