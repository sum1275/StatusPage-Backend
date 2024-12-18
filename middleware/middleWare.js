const getISTTimestamp = () => {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    return new Date(Date.now() + istOffset); // Return the current timestamp in IST
};

module.exports = getISTTimestamp; // Export the function directly