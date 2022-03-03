import logger from "pino";

const log = logger({
    // prettyPrint: true,
    prettifier: true,
    base: {
        pid: false
    },
    timestamp: () => `,time:${Date.now()}`
});

export default log;