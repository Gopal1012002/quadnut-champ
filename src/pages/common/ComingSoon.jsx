import React from 'react'
import styles from '../../assets/css/ComingSoon.module.css';

const ComingSoon = () => {
    return (
        <div className={styles.comingSoon}>
            <div className={styles.spinner}></div>
            <h1>Coming Soon!</h1>
            <p>We're crafting something amazing. Stay tuned!</p>
            {/* <div className={styles.socials}>
                <a href="#" className={styles.socialIcon}>🔔</a>
                <a href="#" className={styles.socialIcon}>📧</a>
                <a href="#" className={styles.socialIcon}>🌐</a>
            </div> */}
        </div>
    )
}

export default ComingSoon