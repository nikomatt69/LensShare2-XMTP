import { Button } from 'src/components/UI/Button';
import { Input } from '../UI/Input';
import  Loader  from 'src/components/UI/Loader';
import { useMessagePersistStore, useMessageStore } from 'src/store/message';
import { ALLOWED_IMAGE_TYPES, ALLOWED_VIDEO_TYPES } from 'src/constants';
import { MIN_WIDTH_DESKTOP } from 'src/constants';
import useWindowSize from 'src/utils/hooks/useWindowSize';
import { FC, useRef } from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowRightShort, BsCameraVideo, BsImage } from 'react-icons/bs';
import { uploadIpfs } from 'src/utils/functions/uploadToIPFS';
import { ContentTypeImageKey } from 'src/utils/hooks/codecs/Image';
import { SendOptions } from '@xmtp/xmtp-js';
import { ContentTypeVideoKey } from 'src/utils/hooks/codecs/Video';

import type { IGif } from '@giphy/js-types';
import { v4 as uuid } from 'uuid';

import Giphy from './Giphy';

interface Props {
    sendMessage: (message: string, option?: SendOptions) => Promise<boolean>;
    conversationKey: string;
    disabledInput: boolean;
}

const Composer: FC<Props> = ({ sendMessage, conversationKey, disabledInput }) => {
    const [message, setMessage] = useState<string>('');
    const imageRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLInputElement>(null);
    const [sending, setSending] = useState<boolean>(false);
    const { width } = useWindowSize();
    const unsentMessage = useMessagePersistStore((state) => state.unsentMessages.get(conversationKey));
    const setUnsentMessage = useMessagePersistStore((state) => state.setUnsentMessage);
    const setIsUploading = useMessageStore((state) => state.setIsUploading);
    const isUploading = useMessageStore((state) => state.isUploading);
    const setAttachment = useMessageStore((state) => state.setAttachment);

    const canSendMessage = !disabledInput && !sending && message.length > 0;

    const handleSend = async () => {
        if (!canSendMessage) {
            return;
        }
        setSending(true);
        const sent = await sendMessage(message);
        if (sent) {
            setMessage('');
            setUnsentMessage(conversationKey, null);
        } else {
            toast.error(`Error sending message`);
        }
        setSending(false);
    };

    const handleSendImage = async () => {
        imageRef.current?.click();
    };

    const handleSendVideo = async () => {
        videoRef.current?.click();
    };

    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSending(true);
        setIsUploading(true);
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        if (file.size > 10000000) {
            setIsUploading(false);
            toast.error(`Image size should be less than 10MB`);
            return;
        }

        setAttachment({
            id: uuid(),
            type: 'image',
            item: URL.createObjectURL(file),
            altTag: file.name,
            previewItem: URL.createObjectURL(file)
        })

        const  url  = await uploadIpfs(file)
        if (url) {
            const sent = await sendMessage(url.toString(), {
                contentType: ContentTypeImageKey,
                contentFallback: 'Image'
            });
            if (sent) {
                setAttachment({
                    id: '',
                    type: '',
                    item: '',
                    altTag: '',
                    previewItem: ''
                })
                setMessage('');
                setIsUploading(false);
                setSending(false);
                setUnsentMessage(conversationKey, null);
            } else {
                setAttachment({
                    id: '',
                    type: '',
                    item: '',
                    altTag: '',
                    previewItem: ''
                })
                setIsUploading(false);
                setSending(false);
                toast.error(`Error sending message`);
            }
        }
    };

    const setGifAttachment = async(gif: IGif) => {
        setIsUploading(true);

        setAttachment({
            id: uuid(),
            type: 'image',
            item: gif.images.original.url,
            altTag: gif.title,
            previewItem: gif.images.original.url
        })
        const sent = await sendMessage(gif.images.original.url.toString(), {
            contentType: ContentTypeImageKey,
            contentFallback: gif.title
        });
        if (sent) {
            setAttachment({
                id: '',
                type: '',
                item: '',
                altTag: '',
                previewItem: ''
            })
            setIsUploading(false);
            setMessage('');
            setUnsentMessage(conversationKey, null);
        } else {
            setAttachment({
                id: '',
                type: '',
                item: '',
                altTag: '',
                previewItem: ''
            })
            setIsUploading(false);
            toast.error(`Error sending message`);
        }
    };

    const handleUploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSending(true);
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        if (file.size > 100000000) {
            toast.error(`Video size should be less than 100MB`);
            return;
        }

        const  url  = await uploadIpfs(file)
       
        if (url) {
            const sent = await sendMessage(url.toString(), {
                contentType: ContentTypeVideoKey,
                contentFallback: 'Video'
            });
            if (sent) {
                setMessage('');
                setUnsentMessage(conversationKey, null);
            } else {
                toast.error(`Error sending message`);
            }
        }

        setSending(false);
    };


    useEffect(() => {
        setMessage(unsentMessage ?? '');
    }, [unsentMessage]);

    const onChangeCallback = (value: string) => {
        setUnsentMessage(conversationKey, value);
        setMessage(value);
    };

    const handleKeyDown = (event: { key: string }) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="flex text-black space-x-4 items-center p-4">
            <Input
                type="text"
                className='rounded-full'
                placeholder={`Type Something`}
                value={message}
                disabled={disabledInput}
                onKeyDown={handleKeyDown}
                onChange={(event) => onChangeCallback(event.target.value)}
            />
            <input
                ref={imageRef}
                type='file'
                accept={ALLOWED_IMAGE_TYPES.join(',')}
                multiple={false}
                className='hidden'
                onChange={handleUploadImage}
            />
            <input
                ref={videoRef}
                type='file'
                accept={ALLOWED_VIDEO_TYPES.join(',')}
                multiple={false}
                className='hidden'
                onChange={handleUploadVideo}
            /> 
             <button onClick={handleSendVideo}>
                <BsCameraVideo size={24}/>
            </button> 
            <Giphy setGifAttachment={(gif: IGif) => setGifAttachment(gif)} />
            <button onClick={handleSendImage}>
                <BsImage size={24} className="fill-brand2-500 fill-brand2-400"/>
            </button>
            <Button disabled={!canSendMessage} onClick={handleSend} variant="primary" aria-label="Send message">
                <div className="flex items-center space-x-2">
                    <span>Send</span>
                    {sending && <Loader />}
                </div>
            </Button>
        </div>
    );
};

export default Composer;