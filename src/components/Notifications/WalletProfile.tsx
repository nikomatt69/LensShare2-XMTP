/* eslint-disable @next/next/no-img-element */
import formatAddress from '@/utils/functions/formatAddress';
import getStampFyiURL from '@/utils/functions/getStampFyiURL';
import { AVATAR, POLYGONSCAN_URL } from '@/constants';
import type { Wallet } from '@/utils/lens';
import type { FC } from 'react';
import imageCdn from '@/utils/functions/imageCdn';

interface Props {
  wallet: Wallet;
}

export const NotificationWalletProfileAvatar: FC<Props> = ({ wallet }) => {
    return (
        <a href={`${POLYGONSCAN_URL}/address/${wallet?.address}`} target="_blank" rel="noreferrer noopener">
            <img
                src={imageCdn(getStampFyiURL(wallet?.address), AVATAR)}
                className="w-8 h-8 bg-gray-200 rounded-full border "
                height={32}
                width={32}
                alt={wallet?.address}
            />
        </a>
    );
};

export const NotificationWalletProfileName: FC<Props> = ({ wallet }) => {
    return (
        <a
            className="inline-flex items-center space-x-1 font-bold"
            href={`${POLYGONSCAN_URL}/address/${wallet?.address}`}
            target="_blank"
            rel="noreferrer noopener"
        >
            <div>{formatAddress(wallet?.address)}</div>
        </a>
    );
};