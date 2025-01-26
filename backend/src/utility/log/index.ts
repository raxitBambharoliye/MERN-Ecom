import winston,{ createLogger,format,transports } from "winston";

const logger = createLogger({
    level:'info',
    format:format.combine(
        format.colorize({all:true}),
        format.timestamp({format:"YYY-MM-DD HH:MM:ss:SSS"}),
        format.printf((info)=>{return`${[info.timestamp]} : ${[info.level]} : ${[info.message]}`})
    ),
    transports:[
        new winston.transports.Console(),
        new transports.File({
            filename:'./src/logger/log/info.log',
            level:'info',
            format:format.combine(
                format.timestamp({ format: "YYY-MM-DD HH:MM:ss:SSS" }),
                format.printf((info) => { return `${[info.timestamp]} : ${[info.level]} : ${[info.message]}` }),
                format.json()
            ),

        }),
        new transports.File({
            filename:'./src/logger/log/error.log',
            level:'error',
            format:format.combine(
                format.timestamp({format:"YYYY-MM-DD HH:MM:ss:SSS "}),
                format.printf((info)=>{return `${[info.timestamp]} : ${[info.level]} : ${[info.message]}`}),
                format.json()
            )
        })
    ]
})
winston.addColors({
    error:"red",
    info:"blue",
    warn:'yellow'
})
export default logger;