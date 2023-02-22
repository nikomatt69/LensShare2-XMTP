import Preview from 'src/components/Messages/Preview';
import { Card } from 'src/components/UI/Card';
import { EmptyState } from 'src/components/UI/EmptyState';
import { ErrorMessage } from 'src/components/UI/ErrorMessage';
import clsx from 'clsx';
import { ERROR_MESSAGE,  } from 'src/constants';
import { Profile, SearchProfilesDocument, SearchPublicationsDocument, SearchRequestTypes } from 'src/utils/lens';
import { useRouter } from 'next/router';
import { FC, useRef } from 'react';
import { useEffect, useState } from 'react';
import {useAppStore} from 'src/store/app';
import { useMessagePersistStore, useMessageStore } from 'src/store/message';
import useMessagePreviews from 'src/utils/hooks/useMessagePreviews';
import buildConversationId from 'src/utils/functions/buildConversationId';
import { buildConversationKey } from 'src/utils/functions/conversationKey';
import  Loader  from 'src/components/UI/Loader';
import {Modal} from 'src/components/UI/Modal';
import { BiMessageRoundedDots, BiPlusCircle } from 'react-icons/bi';
import { HiOutlineUsers } from 'react-icons/hi';
import Following from 'src/components/ProfilePage/Following';
import { useLazyQuery } from '@apollo/client';
import useDebounce from 'src/utils/hooks/useDebounce';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { BsSearch } from 'react-icons/bs';
import ProfileList from 'src/components/Search/SearchProfiles';

interface Props {
  className?: string;
  selectedConversationKey?: string;
}

const PreviewList: FC<Props> = ({ className, selectedConversationKey }) => {
    const router = useRouter();
    const currentProfile = useAppStore((state) => state.currentProfile);
    const addProfileAndSelectTab = useMessageStore((state) => state.addProfileAndSelectTab);
    const selectedTab = useMessageStore((state) => state.selectedTab);
    const setSelectedTab = useMessageStore((state) => state.setSelectedTab);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [keyword, setKeyword] = useState('')
    const debouncedValue = useDebounce<string>(keyword, 500)
    const [showResults, setResults] = useState(false)
    const [activeSearch, setActiveSearch] = useState(SearchRequestTypes.Profile)

    const { authenticating, loading, messages, profilesToShow, requestedCount, profilesError } = useMessagePreviews();
    const clearMessagesBadge = useMessagePersistStore((state) => state.clearMessagesBadge);

    const sortedProfiles = Array.from(profilesToShow).sort(([keyA], [keyB]) => {
        const messageA = messages.get(keyA);
        const messageB = messages.get(keyB);
        return (messageA?.sent?.getTime() || 0) >= (messageB?.sent?.getTime() || 0) ? -1 : 1;
    });

    const [getProfiles, { data: searchResults, loading: searchLoading }] = useLazyQuery(SearchProfilesDocument)

    const onDebounce = () => {
        if (keyword.trim().length) {
            getProfiles({
                variables: {
                    request: {
                        type: activeSearch,
                        query: keyword,
                        limit: 5,
                        
                    }
                }
            })
        }
    }

    useEffect(() => {
        onDebounce()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, activeSearch])

    const clearSearch = () => {
        setKeyword('')
    }

    const onSearchProfile = ((e: any) => {
        if (e.target.value.length > 0) {

            setResults(true);
            setKeyword(e.target.value);
        } else {
            setResults(false);
            setKeyword('');
        }
    });

    useEffect(() => {
        if (!currentProfile) {
        return;
        }
        clearMessagesBadge(currentProfile.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProfile]);

    const showAuthenticating = currentProfile && authenticating;
    const showLoading = loading && (messages.size === 0 || profilesToShow.size === 0);

    const newMessageClick = () => {
        setShowSearchModal(true);
    };

    const onProfileSelected = (profile: Profile) => {
        const conversationId = buildConversationId(currentProfile?.id, profile.id);
        const conversationKey = buildConversationKey(profile.ownedBy, conversationId);
        addProfileAndSelectTab(conversationKey, profile);
        router.push(`/messages/${conversationKey}`);
        setShowSearchModal(false);
    };

    const closeSearch = () => {
        setResults(false)
    }

    

    // @ts-ignore
    const searchProfiles = searchResults?.search?.items


    const searchRef = useDetectClickOutside({ onTriggered: closeSearch, triggerKeys: ['Escape', 'x'], });

    return (
        <div
            className={clsx(
                'xs:h-[85vh] mb-0 sm:h-[76vh] md:w-1/3 md:h-[80vh] xl:h-[84vh]',
                className
            )}
        >
            <Card className="flex h-full flex-col justify-between !border-r-0 !rounded-tl-3xl !rounded-bl-3xl !rounded-none">
                <div className="flex items-center justify-between border-4 border-black rounded-3xl p-5 ">
                    <div className="font-bold">Messages</div>
                    {currentProfile && !showAuthenticating && !showLoading && (
                        <button onClick={newMessageClick} type="button">
                            <BiPlusCircle className="h-6 w-6" />
                        </button>
                    )}
                </div>
                <div className="flex sm:hidden">
                    <div
                        onClick={() => setSelectedTab('Following')}
                        className={clsx(
                            'text-brand2-500 tab-bg m-2 ml-4 flex flex-1 cursor-pointer items-center justify-center rounded-full p-2 font-bold',
                            selectedTab === 'Following' ? 'bg-brand2-100' : ''
                        )}
                    >
                        <HiOutlineUsers className="mr-2 h-4 w-4" />
                        Following
                    </div>
                    <div
                        onClick={() => setSelectedTab('Requested')}
                        className={clsx(
                        'text-brand2-500 tab-bg m-2 mr-4 flex flex-1 cursor-pointer items-center justify-center rounded-full p-2 font-bold',
                        selectedTab === 'Requested' ? 'bg-brand2-100' : ''
                        )}
                    >
                        Requested
                        {requestedCount > 0 && (
                            <span className="bg-brand2-200 ml-2 rounded-2xl px-3 py-0.5 text-sm font-bold">
                                {requestedCount > 99 ? '99+' : requestedCount}
                            </span>
                        )}
                    </div>
                </div>
                {selectedTab === 'Requested' ? (
                <div className="mt-1 bg-yellow-100 p-2 px-5 text-sm text-yellow-800">
                    These conversations are from Lens profiles that you don&apos;t currently follow.
                </div>
                ) : null}
                <div className="h-full overflow-y-auto overflow-x-hidden">
                {showAuthenticating ? (
                    <div className="flex h-full flex-grow items-center justify-center">
                        <Loader/>
                    </div>
                ) : showLoading ? (
                    <div className="flex h-full flex-grow items-center justify-center">
                        <Loader />
                    </div>
                ) : profilesError ? (
                    <ErrorMessage
                        className="m-5"
                        title={`Failed to load messages`}
                        error={{ message: ERROR_MESSAGE, name: ERROR_MESSAGE }}
                    />
                ) : sortedProfiles.length === 0 ? (
                    <button className="h-full w-full justify-items-center" onClick={newMessageClick} type="button">
                        <EmptyState
                            message={`Start messaging your Lens frens`}
                            icon={<BiMessageRoundedDots className="text-brand h-8 w-8" />}
                            hideCard
                        />
                    </button>
                ) : (
                    sortedProfiles?.map(([key, profile]) => {
                        const message = messages.get(key);
                        if (!message) {
                            return null;
                        }

                        return (
                            <Preview
                                isSelected={key === selectedConversationKey}
                                key={key}
                                profile={profile}
                                conversationKey={key}
                                message={message}
                            />
                        );
                    })
                )}
                </div>
            </Card>
            <Modal
                title={`New message`}
                icon={<BiMessageRoundedDots className="text-brand2 h-5 w-5" />}
                size="sm"
                show={showSearchModal}
                onClose={() => setShowSearchModal(false)}
            >
                <div className="w-full px-4 pt-4">
                    <div
                        ref={searchRef} 
                        className="relative w-full overflow-hidden border-2 rounded-lg  cursor-default border-gray-700  rounded-full sm:text-sm">
                        <input
                            className="w-full py-3 pl-12 pr-4 text-sm bg-transparent focus:outline-none"
                            onChange={(e) => onSearchProfile(e)}
                            placeholder="Search for someone to message..."
                            value={keyword}
                            
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                            <BsSearch
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                                
                            />
                        </div>
                    </div>
                </div>
                {searchLoading && <div className="flex flex-row items-center py-8 justify-center">
                    <Loader /></div>
                }
                {showResults &&
                    <div className="w-full py-4">
                        <div className="flex flex-col divide-y divide-gray-700">
                            {searchResults?.search?.__typename === 'ProfileSearchResult' && searchProfiles.length > 0  }
                            
                            {searchResults?.search?.__typename === 'ProfileSearchResult' && searchProfiles.length === 0 && (
                                <div className="flex flex-col items-center justify-center">
                                    No results found
                                </div>
                            )}
                        </div>
                    </div>
                } 
                {!showResults && currentProfile &&
                    <Following
                        profile={currentProfile}
                    />
                }
            </Modal>
        </div>
    );
};

export default PreviewList;