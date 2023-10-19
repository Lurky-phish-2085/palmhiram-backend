import { getDateTimeNow } from "./dateTimeUtils"

export const logDebug = (routeName, message) => {

  console.log(getDateTimeNow(), `${routeName}: ${message}`)
}
