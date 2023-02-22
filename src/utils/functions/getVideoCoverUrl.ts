import { APP_NAME } from 'src/constants'
import type { LenstokPublication } from '../custom-types'
import sanitizeIpfsUrl from './sanitizeIpfsUrl2'

const getVideoCoverUrl = (pin: LenstokPublication): string => {
    const url =
        pin.metadata.cover?.original?.url ||
        `${APP_NAME}/fallbackThumbnail.png`
    return sanitizeIpfsUrl(url)
}

export default getVideoCoverUrl