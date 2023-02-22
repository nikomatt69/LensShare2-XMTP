/* eslint-disable @next/next/no-img-element */
import InterweaveContent from 'src/components/UI/InterweaveContent';
import { Card } from 'src/components/UI/Card';
import getProfilePicture from 'src/utils/functions/getProfilePicture';
import type { DecodedMessage } from '@xmtp/xmtp-js';
import clsx from 'clsx';
import dayjs from 'dayjs';
import type { Profile } from 'src/utils/lens';
import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import formatHandle from 'src/utils/functions/formatHandle';
import formatTime from 'src/utils/functions/formatTime';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { ContentTypeImageKey } from 'src/utils/hooks/codecs/Image';
import MessageMedia from './MessageMedia';
import { ContentTypeVideoKey } from 'src/utils/hooks/codecs/Video';
import { useMessageStore } from 'src/store/message';
import { NewLenstokAttachment } from 'src/utils/custom-types';
import  Loader  from 'src/components/UI/Loader';
import getAvatar from '@/lib/getAvatar';

const isOnSameDay = (d1?: Date, d2?: Date): boolean => {
  return dayjs(d1).format('YYYYMMDD') === dayjs(d2).format('YYYYMMDD');
};

const formatDate = (d?: Date) => dayjs(d).format('MMMM D, YYYY');

interface MessageTileProps {
    message: DecodedMessage;
    profile?: Profile;
    currentProfile?: Profile | null;
}

const MessageTile: FC<MessageTileProps> = ({ message, profile, currentProfile }) => {
    const address = currentProfile?.ownedBy;

    return (
        <div
        className={clsx(
            address === message.senderAddress ? 'mr-4 items-end' : 'items-start',
            'mx-auto mb-4 flex flex-col'
        )}
        >
            <div
                className={clsx( 'flex',
                    message.contentType.typeId == ContentTypeVideoKey.typeId ? 'w-full h-full max-w-[60%]' : 'max-w-[60%]'
                )}
            >
                {address !== message.senderAddress && (
                    <img
                        // @ts-ignore
                        src={getAvatar(profile)}
                        className="mr-2 h-10 w-10 rounded-full border  border-gray-700"
                        alt={formatHandle(profile?.handle)}
                    />
                )}
                <div
                className={clsx(
                    address === message.senderAddress ? 'bg-brand2-500' : '',
                    'w-full',
                    message.contentType.typeId == ContentTypeImageKey.typeId ? 'rounded-2xl' : 'rounded-full',
                    message.contentType.typeId == ContentTypeImageKey.typeId || message.contentType.typeId == ContentTypeVideoKey.typeId ? 'p-0' : 'px-4 py-2'
                )}
                >
                    {message.error
                        ? `Error: ${message.error?.message}`
                            : message.contentType.typeId == ContentTypeImageKey.typeId ? <MessageMedia message={message} type='image' />
                            : message.contentType.typeId == ContentTypeVideoKey.typeId ? <MessageMedia message={message} type='video' />
                            : 
                            <span
                                className={clsx(
                                address === message.senderAddress && 'text-black',
                                'text-md linkify-message block break-words'
                                )}
                            >
                                <InterweaveContent content={message.content} />
                            </span>
                     ?? ''}
                </div>
            </div>
            <div className={clsx(address !== message.senderAddress ? 'ml-12' : '')}>
                <span className="place-self-end text-xs text-gray-400" title={formatTime(message.sent)}>
                    {dayjs(message.sent).fromNow()}
                </span>
            </div>
        </div>
    );
};

interface AttachmentMessageTileProps {
    attachment: NewLenstokAttachment;
    profile?: Profile;
    currentProfile?: Profile | null;
}

const AttachmentMessageTile: FC<AttachmentMessageTileProps> = ({ attachment, profile, currentProfile }) => {
    return (
        <div className='mr-4 border-black border-2 items-end mx-auto mb-4 flex flex-col'>
            <div className='flex max-w-[60%] border-black border-2 relative'>
                <div className='w-full rounded-2xl p-0'>
                    <img
                        src={attachment.item}
                        alt={attachment.altTag ?? ''}
                        className='w-full rounded-2xl cursor-pointer'
                    />
                </div>
                <div className='absolute  flex items-center justify-center w-full h-full rounded-2xl'>
                    <Loader  />
                </div>
            </div>
        </div>
    );
};

interface Props {
    children: ReactNode;
}

const DateDividerBorder: FC<Props> = ({ children }) => (
    <>
        <div className="h-0.5 grow 300/25" />
            {children}
        <div className="h-0.5 grow 300/25" />
    </>
);

const DateDivider: FC<{ date?: Date }> = ({ date }) => (
    <div className="align-items-center flex items-center p-4 pt-0 pl-2">
        <DateDividerBorder>
            <span className="mx-11 flex-none text-sm font-semibold text-gray-300">{formatDate(date)}</span>
        </DateDividerBorder>
    </div>
);

const MissingXmtpAuth: FC = () => (
    <Card as="aside" className="mb-2 mr-4 space-y-2.5 border-black border-2  !bg-opacity-20 p-5">
        <div className="flex items-center space-x-2 font-bold">
            <HiOutlineEmojiSad className="h-5 w-5" />
        <p>
            This fren hasn&apos;t enabled DMs yet
        </p>
        </div>
        <p className="text-sm leading-[22px]">
            You can&apos;t send them a message until they enable DMs.
        </p>
    </Card>
);

const ConversationBeginningNotice: FC = () => (
    <div className="align-items-center mt-6 flex justify-center pb-4">
        <span className="text-sm font-semibold text-gray-300">
            This is the beginning of the conversation
        </span>
    </div>
);

const LoadingMore: FC = () => (
    <div className="mt-6 p-1 text-center text-sm font-bold text-gray-300">
        Loading...
    </div>
);

interface MessageListProps {
    messages: DecodedMessage[];
    fetchNextMessages: () => void;
    profile?: Profile;
    currentProfile?: Profile | null;
    hasMore: boolean;
    missingXmtpAuth: boolean;
}

const MessagesList: FC<MessageListProps> = ({
  messages,
  fetchNextMessages,
  profile,
  currentProfile,
  hasMore,
  missingXmtpAuth
}) => {
    let lastMessageDate: Date | undefined;
    const isUploading = useMessageStore((state) => state.isUploading);
    const attachment = useMessageStore((state) => state.attachment);
    return (
        <div className="flex h-[75%]  text-sm font-semibold flex-grow">
            <div className="relative h-full w-full pl-4">
                <div id="scrollableMessageListDiv" className="flex h-full w-full flex-col-reverse overflow-y-auto">
                {missingXmtpAuth && <MissingXmtpAuth />}
                    <InfiniteScroll
                        dataLength={messages.length}
                        next={fetchNextMessages}
                        className="flex flex-col-reverse overflow-y-auto overflow-x-hidden"
                        inverse
                        endMessage={<ConversationBeginningNotice />}
                        hasMore={hasMore}
                        loader={<LoadingMore />}
                        scrollableTarget="scrollableMessageListDiv"
                    >
                        {
                            isUploading && attachment?.id !== '' ? (
                                <div className='attachmentMessage'>
                                    <AttachmentMessageTile currentProfile={currentProfile} profile={profile} attachment={attachment} />
                                </div>
                            ) : null
                        }
                        {messages?.map((msg: DecodedMessage, index) => {
                            const dateHasChanged = lastMessageDate ? !isOnSameDay(lastMessageDate, msg.sent) : false;
                            const messageDiv = (
                                <div className='message' key={`${msg.id}_${index}`}>
                                    <MessageTile currentProfile={currentProfile}  profile={profile} message={msg} />
                                    {dateHasChanged ? <DateDivider date={lastMessageDate} /> : null}
                                </div>
                            );
                            lastMessageDate = msg.sent;
                            return messageDiv;
                        })}
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default memo(MessagesList);