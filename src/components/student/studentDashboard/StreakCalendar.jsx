import React, { useEffect, useState } from 'react';
import '../../../assets/css/StreakCalendar.css'
import { getLastThreeYears } from '../../../utils/dynamic.util';
import { Controller } from 'react-hook-form';
import RSelect from '../../common/RSelect';
import AuthStudent, { StudenStreakDataService } from '../../../services/StudentServices';
import { CourseSmallBoxShimmer } from '../../shimmer/Shimmer';

const StreakCalendar = () => {
    const [streakData, setStreakData] = useState();
    const {student} = AuthStudent();
    
    const [streakLoading, setStreakLoading] = useState(false);
    let yearsArray = getLastThreeYears();
    const [years, setYears] = useState([...yearsArray])
    const currentYear = new Date()
    const [selectedYear, setSelectedYear] = useState({ label: currentYear.getFullYear(), value: currentYear.getFullYear() });
    useEffect(() => {
        setStreakLoading(true);
        StudenStreakDataService({ year: selectedYear?.value }).then((res) => {
            setStreakData(res?.data)
        }).catch((err) => {
            console.log(err);

        }).finally(() => {
            setStreakLoading(false)
        })
        let newArr = [];
        yearsArray?.map((elem) => newArr.push({ value: elem, label: elem }));
        setYears(newArr)
    }, [selectedYear])


    return (
        <div className="card dash-info flex-fill">
            {
                !streakLoading && streakData ? <div className="card dash-info flex-fill">
                    <div className="card-body p-0 text-center">
                        <div className="streak-dashboard m-0">
                            <div className="streak-header">
                                <h5 className='d-none d-md-block'>📅 {student?.name}'s Streak</h5>
                                <div className="streak-metrics d-flex flex-row align-items-center justify-content-between">
                                    <span>🔥 Current Streak: <strong>{streakData?.streakDetails.currentStreak ?? 0}</strong></span>
                                    <span>🏆 Max Streak: <strong>{streakData?.streakDetails.maxStreak ?? 0}</strong></span>
                                    <span className='d-none d-md-block'>
                                        <RSelect
                                            options={years}
                                            onChange={(selectedOption) => setSelectedYear(selectedOption)}
                                            value={selectedYear}
                                        /></span>
                                </div>
                            </div>

                            <div className="months-container">
                                {streakData?.streakData?.map((monthData, idx) => (
                                    <div className="month-card" key={idx}>
                                        <h3 className="month-title">{monthData.month}</h3>
                                        <div className="days-grid">
                                            {monthData.days.map((day, dayIdx) => (
                                                <div
                                                    key={dayIdx}
                                                    className={`day-box ${day ? 'active' : 'inactive'}`}
                                                    title={`Day ${dayIdx + 1}`}
                                                >
                                                    {dayIdx + 1}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div></div>
                </div> : <div className="card dash-info flex-fill">
                    <div className="card-body text-center">
                        <h5> {student?.name}'s Daily Activity </h5>
                        <CourseSmallBoxShimmer />
                    </div>
                </div>
            }

        </div>
    );
};

export default StreakCalendar;
