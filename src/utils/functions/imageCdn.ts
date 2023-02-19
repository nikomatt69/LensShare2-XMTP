import { IMAGE_CDN_URL } from 'src/constants'
import sanitizeIpfsUrl from './sanitizeIpfsUrl'

const imageCdn = (
  url: string,
  type?: 'thumbnail_sm' | 'thumbnail' | 'thumbnail_lg' | 'avatar' | 'avatar_lg' | 'square' | 'thumbnail_v' | 'cover' | 'avatar_sm'
): string => {
  if (!url || !IMAGE_CDN_URL) return url
  return type
    ? `${IMAGE_CDN_URL}/tr:n-${type},tr:di-placeholder.webp,pr-true/${sanitizeIpfsUrl(
        url
      )}`
    : `${IMAGE_CDN_URL}/tr:di-placeholder.webp/${sanitizeIpfsUrl(url)}`
}

export default imageCdn