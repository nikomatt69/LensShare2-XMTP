/* eslint-disable @next/next/no-img-element */
import type { DecodedMessage } from '@xmtp/xmtp-js';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Profile } from 'src/utils/lens';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import {useAppStore} from 'src/store/app';
import formatHandle from 'src/utils/functions/formatHandle';
import formatTime from 'src/utils/functions/formatTime';
import { ContentTypeImageKey } from 'src/utils/hooks/codecs/Image';
import { ContentTypeVideoKey } from 'src/utils/hooks/codecs/Video';
import getAvatar from '@/lib/getAvatar';

dayjs.extend(relativeTime);

interface Props {
    profile: Profile;
    message: DecodedMessage;
    conversationKey: string;
    isSelected: boolean;
}

const Preview: FC<Props> = ({ profile, message, conversationKey, isSelected }) => {
    const router = useRouter();
    const currentProfile = useAppStore((state) => state.currentProfile);
    const address = currentProfile?.ownedBy;

    const onConversationSelected = (profileId: string) => {
        router.push(profileId ? `/messages/${conversationKey}` : '/messages');
    };

    return (
        <div
            className={clsx(
                'cursor-pointer rounded-xl text-bold hover:bg-blue-100 hover:bg-blue-100',
                isSelected && 'bg-gray-50 bg-gray-800'
            )}
            onClick={() => onConversationSelected(profile.id)}
        >
            <div className="flex justify-between text-semibold py-3 border-grey-800 border-2 rounded-xl space-x-3 px-5">
                <img
                    src={getAvatar(profile)}
                    loading="lazy"
                    className="h-10 w-10 rounded-full border bg-gray-200 border-gray-500"
                    height={40}
                    width={40}
                    alt={formatHandle(profile?.handle)}
                />
                <div className="w-full font-bold">
                    <div className="flex w-full text-semibold justify-between space-x-1">
                        <div className="flex max-w-sm items-center">
                            <div className="line-clamp-1 text-semibold text-md">{profile?.name ?? formatHandle(profile.handle)}</div>
                        </div>
                        {message.sent && (
                            <span className="lt-text-gray-500 min-w-fit pt-0.5 text-xs" title={formatTime(message.sent)}>
                                {dayjs(new Date(message.sent)).fromNow()}
                            </span>
                        )}
                    </div>
                    <span className="lt-text-gray-500 line-clamp-1 break-all text-sm">
                        {address === message.senderAddress && 'You: '}
                        {
                            message.contentType.typeId == ContentTypeImageKey.typeId ? 'Sent a Image' :
                            message.contentType.typeId == ContentTypeVideoKey.typeId ? 'Sent a Video'
                            : message.content
                        }
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Preview;