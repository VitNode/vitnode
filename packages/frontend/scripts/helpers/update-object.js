export function updateObject(config, defaultData) {
    const updatedConfig = config;
    for (const key in defaultData) {
        if (Array.isArray(defaultData[key])) {
            if (!config[key] || config[key].length === 0) {
                updatedConfig[key] = [];
            }
        }
        else if (typeof defaultData[key] === "object" &&
            defaultData[key] !== null) {
            if (!config[key]) {
                updatedConfig[key] = {};
            }
            updatedConfig[key] = updateObject((config[key] || {}), defaultData[key]);
        }
        else {
            if (!config[key]) {
                updatedConfig[key] = defaultData[key];
            }
        }
    }
    return updatedConfig;
}
