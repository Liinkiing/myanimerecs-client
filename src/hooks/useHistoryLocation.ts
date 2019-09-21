import {useMemo} from "react"
// @ts-ignore
import {useSubscription} from "use-subscription"
import {globalHistory, HistoryLocation} from "@reach/router"

const useHistoryLocation = (): HistoryLocation => {
  const subscription = useMemo(
    () => ({
      getCurrentValue: () => globalHistory.location,
      subscribe: (callback: any) => globalHistory.listen(callback)
    }),
    []
  )

  return useSubscription(subscription)
}

export default useHistoryLocation
