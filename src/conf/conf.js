const conf = {
    appVersion: String(process.env.REACT_APP_VERSION),
    appName: String(process.env.REACT_APP_NAME),
    basename: String(process.env.PUBLIC_URL),
    apiBaseUrl: String(process.env.REACT_APP_API_BASE_URL),
    apiAssetUrl: String(process.env.REACT_APP_API_BASE_ASSET_URL),
    baseUrl: String(process.env.REACT_APP_BASE_URL),
    projectName: String(process.env.REACT_APP_PROJECTNAME),
}

export default conf;