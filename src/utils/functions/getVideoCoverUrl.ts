import { APP_NAME } from '../constants'
import type { PinstaPublication } from '../custom-types'
import sanitizeIpfsUrl from './sanitizeIpfsUrl'

const getVideoCoverUrl = (pin: PinstaPublication): string => {
    const url =
        pin.metadata.cover?.original?.url ||
        `${APP_NAME.URL}/fallbackThumbnail.png`
    return sanitizeIpfsUrl(url)
}

export default getVideoCoverUrl