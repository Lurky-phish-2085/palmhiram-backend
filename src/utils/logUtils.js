import { getDateTimeNow } from "./dateTimeUtils"

const redColor = '\x1b[31m';
const greenColor = '\x1b[32m';
const resetColor = '\x1b[0m';

export const logDebug = (routeName, message) => {

  console.log(`${greenColor}${getDateTimeNow()}${resetColor}`, `${routeName}: ${message}`)
}

export const logError = (routeName, message) => {

  console.log(`${redColor}${getDateTimeNow()}${resetColor}`, `${routeName}: ${message}`)
}
