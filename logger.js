import { createLogger, format, transports } from "winston"

//logger config
const logger = createLogger({
    level: 'info', // minimal level to register (error, warn, info, http, debug, silly)
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `${info.timestamp} [${info.level.toLocaleUpperCase()}]: ${info.message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/combined.log' }), //saves in a file
        new transports.File({ filename: 'logs/error.log', level: 'error' }) // saves errors in another file
    ],
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }))
}

export default logger