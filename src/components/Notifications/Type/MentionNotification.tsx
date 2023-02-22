import InterweaveContent from '@/components/UI/InterweaveContent';
import UserPreview from '@/components/UI/UserPreview';
import formatTime from '@/utils/functions/formatTime';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { NewMentionNotification } from '@/utils/lens';
import Link from 'next/link';
import type { FC } from 'react';

import { NotificationProfileAvatar, NotificationProfileName } from '../Profile';
import { HiOutlineAtSymbol } from 'react-icons/hi';

dayjs.extend(relativeTime);

interface Props {
    notification: NewMentionNotification;
}

const MentionNotification: FC<Props> = ({ notification }) => {
    const profile = notification?.mentionPublication?.profile;

    return (
        <div className="flex justify-between items-start">
            <div className="space-y-2 w-4/5">
                <div className="flex items-center space-x-3">
                    <HiOutlineAtSymbol className="h-6 w-6 text-orange-500" />
                    <UserPreview profile={profile}>
                        <NotificationProfileAvatar profile={profile} />
                    </UserPreview>
                </div>
                <div className="ml-9">
                    <NotificationProfileName profile={profile} />{' '}
                    <span className="text-gray-600 dark:text-gray-400">mentioned you in a </span>
                    {notification?.mentionPublication?.__typename?.toLowerCase() !== 'comment' ? (
                        <>
                            <Link href={`/pin/${notification?.mentionPublication?.id}`} className="brandGradientText">
                                {notification?.mentionPublication?.__typename?.toLowerCase()}
                            </Link>
                            <Link
                                href={`/pin/${notification?.mentionPublication?.id}`}
                                className="lt-text-gray-500 line-clamp-2 linkify mt-2"
                            >
                                <InterweaveContent content={notification?.mentionPublication?.metadata?.content}/>
                            </Link>
                        </>
                    ) : (
                            <>
                                {notification?.mentionPublication?.__typename?.toLowerCase()}
                                <span className="lt-text-gray-500 line-clamp-2 linkify mt-2">
                                    <InterweaveContent content={notification?.mentionPublication?.metadata?.content} />
                                </span>    
                            </>
                    )}
                </div>
            </div>
            <div className="text-gray-400 text-[12px]" title={formatTime(notification?.createdAt)}>
                {dayjs(new Date(notification?.createdAt)).fromNow()}
            </div>
        </div>
    );
};

export default MentionNotification;