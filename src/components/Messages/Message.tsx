import MetaTags from 'src/components/UI/MetaTags';
import { Card } from 'src/components/UI/Card';
import { APP_NAME } from 'src/constants';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import Custom404 from 'src/pages/404';

import Composer from './Composer';
import MessagesList from './MessagesList';
import PreviewList from './PreviewList';
import {useAppStore} from 'src/store/app';
import useGetConversation from 'src/utils/hooks/useGetConversation';
import { useMessageStore } from 'src/store/message';
import useGetMessages from 'src/utils/hooks/useGetMessages';
import useSendMessage from 'src/utils/hooks/useSendMessage';
import useStreamMessages from 'src/utils/hooks/useStreamMessages';
import formatHandle from 'src/utils/functions/formatHandle';
import  Loader  from 'src/components/UI/Loader';
import { parseConversationKey } from 'src/utils/functions/conversationKey';
import MessageHeader from './MessageHeader';
import BottomNav from '../Navs/BottomNav';
import Navbar from '../Navbar';

interface MessageProps {
  conversationKey: string;
}

const Message: FC<MessageProps> = ({ conversationKey }) => {
    const currentProfile = useAppStore((state) => state.currentProfile);
    const profile = useMessageStore((state) => state.messageProfiles.get(conversationKey));
    const { selectedConversation, missingXmtpAuth } = useGetConversation(conversationKey, profile);
    const [endTime, setEndTime] = useState<Map<string, Date>>(new Map());
    const { messages, hasMore } = useGetMessages(
        conversationKey,
        selectedConversation,
        endTime.get(conversationKey)
    );
    useStreamMessages(conversationKey, selectedConversation);
    const { sendMessage } = useSendMessage(selectedConversation);

    const fetchNextMessages = useCallback(() => {
        if (hasMore && Array.isArray(messages) && messages.length > 0) {
        const lastMsgDate = messages[messages.length - 1].sent;
        const currentEndTime = endTime.get(conversationKey);
        if (!currentEndTime || lastMsgDate <= currentEndTime) {
            endTime.set(conversationKey, lastMsgDate);
            setEndTime(new Map(endTime));
        }
        }
    }, [conversationKey, hasMore, messages, endTime]);

    if (!currentProfile) {
        return <Custom404 />;
    }

    const showLoading = !missingXmtpAuth && (!profile || !currentProfile || !selectedConversation);

    const userNameForTitle = profile?.name ?? formatHandle(profile?.handle);
    const title = userNameForTitle ? `${userNameForTitle} :: ${APP_NAME}` : APP_NAME;

    return (
        <>

            <MetaTags title={title} />
            <Navbar />

            <div className="flex w-full md:max-w-4xl mx-auto">
                <PreviewList
                    className="xs:hidden sm:hidden md:hidden lg:block"
                    selectedConversationKey={conversationKey}
                />
                <div className="xs:h-[85vh] mb-0 sm:h-[76vh] md:w-3/4 md:h-[80vh] xl:h-[84vh]">
                    <Card className="flex  flex-col justify !rounded-tr-xl !rounded-br-xl !rounded-none">
                        {showLoading ? (
                            <div className="flex  flex-grow items-center justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <>
                                <MessageHeader profile={profile} />
                                <MessagesList
                                    currentProfile={currentProfile}
                                    profile={profile}
                                    fetchNextMessages={fetchNextMessages}
                                    messages={messages ?? []}
                                    hasMore={hasMore}
                                    missingXmtpAuth={missingXmtpAuth ?? false}
                                />
                                <Composer
                                    sendMessage={sendMessage}
                                    conversationKey={conversationKey}
                                    disabledInput={missingXmtpAuth ?? false}
                                />
                            </>
                        )}
                    </Card>
                </div>
            </div>
        </>    
    );
};

const MessagePage: NextPage = () => {
    const currentProfileId = useAppStore((state) => state.currentProfile?.id);
    const {
        query: { conversationKey }
    } = useRouter();

    // Need to have a login page for when there is no currentProfileId
    if (!conversationKey || !currentProfileId || !Array.isArray(conversationKey)) {
        return <Custom404 />;
    }

    const joinedConversationKey = conversationKey.join('/');
    const parsed = parseConversationKey(joinedConversationKey);

    if (!parsed) {
        return <Custom404 />;
    }

    const { members } = parsed;
    const profileId = members.find((member) => member !== currentProfileId);

    if (!profileId) {
        return <Custom404 />;
    }

    return <Message conversationKey={joinedConversationKey} />;
};

export default MessagePage;