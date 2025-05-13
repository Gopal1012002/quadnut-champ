import React from 'react'
import styles from '../../assets/css/Maintenance.module.css';

const Maintenance = () => {
    return ( 
        <div className={styles.maintenance}>
            <div className={styles.spinner}></div>
            {/* <h1>Maintenance Mode</h1>
            <p>We're currently making improvements. Thank you for your patience!</p> */}
            {/* <div className={styles.socials}>
                <a href="#" className={styles.socialIcon}>🔔</a>
                <a href="#" className={styles.socialIcon}>📧</a>
                <a href="#" className={styles.socialIcon}>🌐</a>
            </div> */}
        </div>
    )
}

export default Maintenance