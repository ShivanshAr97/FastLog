import allowedOrigins from "./origins.js";

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error("CORS issue occured"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions