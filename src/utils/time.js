const epochToLocale = (epochTime) => {
    const time = new Date(0);
    time.setUTCSeconds(epochTime);
    return time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
    });
};

export default epochToLocale;
