import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { NewFollowerNotification } from '@/utils/lens';
import type { FC } from 'react';
import { NotificationProfileAvatar, NotificationProfileName } from '../Profile';
import { NotificationWalletProfileAvatar, NotificationWalletProfileName } from '@/components/Notifications/WalletProfile';
import {useAppStore} from '@/store/app';
import { HiOutlineUserAdd } from 'react-icons/hi';

dayjs.extend(relativeTime);

interface Props {
  notification: NewFollowerNotification;
}

const FollowerNotification: FC<Props> = ({ notification }) => {
    const currentProfile = useAppStore((state) => state.currentProfile);
    const isSuperFollow = currentProfile?.followModule?.__typename === 'FeeFollowModuleSettings';

    return (
        <div className="flex justify-between items-start">
            <div className="flex items-center text-sm space-x-2">
                <div className='flex items-center space-x-1'>
                    {/* {isSuperFollow ? (
                        <HiOutlineUserAdd className="h-6 w-6 text-pink-500" />
                    ) : (
                        <HiOutlineUserAdd className="h-6 w-6 text-green-500" />
                    )} */}
                    {notification?.wallet?.defaultProfile ? (
                        <NotificationProfileAvatar profile={notification?.wallet?.defaultProfile} />
                    ) : (
                        <NotificationWalletProfileAvatar wallet={notification?.wallet} />
                    )}
                    {notification?.wallet?.defaultProfile ? (
                        <NotificationProfileName profile={notification?.wallet?.defaultProfile} />
                    ) : (
                        <NotificationWalletProfileName wallet={notification?.wallet} />
                    )}
                    <div>
                        <span className="text-gray-600 dark:text-gray-400">
                            {isSuperFollow ? 'super' : ''} followed you
                        </span>
                    </div>
                </div>
            </div>
            {/* <div className="text-gray-400 text-[12px]" title={formatTime(notification?.createdAt)}>
                {dayjs(new Date(notification?.createdAt)).fromNow()}
            </div> */}
        </div>
    );
};

export default FollowerNotification;