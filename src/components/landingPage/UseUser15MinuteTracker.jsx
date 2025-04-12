import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { AddStudentLoggedInStreak } from '../../services/StudentServices';

const MINUTES_15 = 15 * 60 * 1000;

const UseUser15MinuteTracker = () => {
  useEffect(() => {
    // 🔍 Check if cookie already exists
    const alreadySet = Cookies.get('user_15min_session');
    if (alreadySet === 'true') {
      console.log("🔁 Cookie already set, skipping timer.");
      return;
    }

    // ⏲️ Set a timer for 15 minutes
    const timer = setTimeout(() => {
      set15MinSessionCookie();
      console.log("✅ 15 minutes passed — Cookie set!");
    }, MINUTES_15);

    return () => clearTimeout(timer);
  }, []);
};

export default UseUser15MinuteTracker;

// 🍪 Set cookie that expires at midnight
const set15MinSessionCookie = () => {
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); // Set expiry to 12:00 AM today
  AddStudentLoggedInStreak().then((res)=>{
    Cookies.set('user_15min_session', 'true', { expires: midnight });
  }).catch((err)=>{
    console.log(err);
  })
};
