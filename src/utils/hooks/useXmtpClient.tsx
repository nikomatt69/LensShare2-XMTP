import { Client } from '@xmtp/xmtp-js';
import { APP_NAME, XMTP_ENV } from 'src/constants';
import { useCallback, useEffect, useState } from 'react';
import { useSigner } from 'wagmi';
import {useAppStore} from 'src/store/app';
import { useMessageStore } from 'src/store/message';
import { VideoCodec } from './codecs/Video';
import { ImageCodec } from './codecs/Image';

const ENCODING = 'binary';

const buildLocalStorageKey = (walletAddress: string) => `xmtp:${XMTP_ENV}:keys:${walletAddress}`;

const loadKeys = (walletAddress: string): Uint8Array | null => {
    const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
    return val ? Buffer.from(val, ENCODING) : null;
};

/**
 * Anyone copying this code will want to be careful about leakage of sensitive keys.
 * Make sure that there are no third party services, such as bug reporting SDKs or ad networks, exporting the contents
 * of your LocalStorage before implementing something like this.
 */
const storeKeys = (walletAddress: string, keys: Uint8Array) => {
    localStorage.setItem(buildLocalStorageKey(walletAddress), Buffer.from(keys).toString(ENCODING));
};

const wipeKeys = (walletAddress: string) => {
    localStorage.removeItem(buildLocalStorageKey(walletAddress));
};

const useXmtpClient = (cacheOnly = false) => {
    const currentProfile = useAppStore((state) => state.currentProfile);
    const client = useMessageStore((state) => state.client);
    const setClient = useMessageStore((state) => state.setClient);
    const [awaitingXmtpAuth, setAwaitingXmtpAuth] = useState<boolean>();
    const { data: signer, isLoading } = useSigner();

    useEffect(() => {
        const initXmtpClient = async () => {
            if (signer && !client && currentProfile) {
                let keys = loadKeys(await signer.getAddress());
                if (!keys) {
                    if (cacheOnly) {
                        return;
                    }
                    setAwaitingXmtpAuth(true);
                    keys = await Client.getKeys(signer, {
                        env: XMTP_ENV,
                        appVersion: APP_NAME + '/' + APP_NAME
                    });
                    storeKeys(await signer.getAddress(), keys);
                }

                const xmtp = await Client.create(null, {
                    env: XMTP_ENV,
                    appVersion: APP_NAME + '/' + APP_NAME,
                    privateKeyOverride: keys,
                    codecs: [new VideoCodec(), new ImageCodec()]
                });
                setClient(xmtp);
                setAwaitingXmtpAuth(false);
            } else {
                setAwaitingXmtpAuth(false);
            }
        };
        initXmtpClient();
        if (!signer || !currentProfile) {
            // eslint-disable-next-line
            setClient(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer, currentProfile]);

    return {
        client: client,
        loading: isLoading || awaitingXmtpAuth
    };
};

export const useDisconnectXmtp = () => {
    const { data: signer } = useSigner();
    const client = useMessageStore((state) => state.client);
    const setClient = useMessageStore((state) => state.setClient);
    const disconnect = useCallback(async () => {
        if (signer) {
            wipeKeys(await signer.getAddress());
        }
        if (client) {
            // eslint-disable-next-line
            setClient(undefined);
        }
        localStorage.removeItem('lensshare.message.store');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer, client]);

    return disconnect;
};

export default useXmtpClient;