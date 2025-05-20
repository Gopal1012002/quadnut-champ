import React, { createContext, useContext, useState, useEffect } from 'react';
// import { themes } from './Pages/themes';
// import { getAppConfig } from './Services/AppService';
import Maintenance from './pages/common/Maintenance';
import ComingSoon from './pages/common/ComingSoon';
import {  getAppConfig, useAuthCompany } from './services/AppServices';


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const {companyData, setCompanyData} = useAuthCompany();
    const [maintenanceMode, setMaintenanceMode] = useState(true);
    const [comingSoonPage, setComingSoonPage] = useState(true);
    // const [currentTheme, setCurrentTheme] = useState("");
    // const [currentHeader, setCurrentHeader] = useState("");
    // const [currentFooter, setCurrentFooter] = useState("");
    // const [currentTheme, setCurrentTheme] = useState(themes.theme3);
    // const [currentHeader, setCurrentHeader] = useState(() => themes.theme3.header);
    // const [currentFooter, setCurrentFooter] = useState(() => themes.theme3.footer);

    useEffect(() => {
        const domain = window.location.hostname;
        // const domain = "startupify.co.in";
        getAppConfig(domain).then((res) => {
            // if (res.data.companyStatus != "ACTIVE") {
            //     setMaintenanceMode(true);
            //     setComingSoonPage(false);
            //     return;
            // }
            // if (res.data.maintainanceMode != "NO") {
            //     setMaintenanceMode(true);
            //     setComingSoonPage(false);
            //     return;
            // }
            setCompanyData(res?.data)
            setComingSoonPage(false);
            setMaintenanceMode(false);
        }).catch((err) => {
            setComingSoonPage(true);
            setMaintenanceMode(false);
        })
    }, []);


    return (
        <>
            {maintenanceMode && <Maintenance />}
            {comingSoonPage && <ComingSoon />}
            {
                !maintenanceMode && !comingSoonPage && (<ThemeContext.Provider value={{  }}>
                    {children}
                </ThemeContext.Provider>)
            }
           
        </>
    );
};

export const useTheme = () => useContext(ThemeContext);