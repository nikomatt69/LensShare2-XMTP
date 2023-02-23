//this is just the profile pic and info 

import React, { Dispatch, FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Profile} from '@/types/lens';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';
import FollowButton from  "@/components/Buttons/FollowButton";
import { useAppStore } from "src/store/app";
import MesssageIcon from 'src/components/Messages/MessageIcon';

import ProfileVideos from "@/components/ProfilePage/ProfileVideos";
import UnfollowButton from '../Buttons/UnfollowButton';
import getAvatar from '@/lib/getAvatar';
import CollectedVideos from '@/components/ProfilePage/CollectedVideos';
import { Modal } from '../UI/Modal';
import Followers from './Followers';
import Following from './Following';
import Link from 'next/link';
import { RiLiveLine } from 'react-icons/ri';
import { GoVerified } from 'react-icons/go'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid';
import { Cog6ToothIcon } from "@heroicons/react/24/outline";



interface Props {
    profile: Profile
    setFollowing: Dispatch<boolean>
    following: boolean
}
    const ProfileCard: FC<Props> = ({ profile, setFollowing, following }) => {
        const currentProfile = useAppStore((state) => state.currentProfile);
        const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
        const [showFollowersModal, setShowFollowersModal] = useState(false);
        const [showFollowingModal, setShowFollowingModal] = useState(false);

        const itsNotMe = profile?.id !== currentProfile?.id
        const videos = showUserVideos ? 'flex text-center border-2 border-black' : 'border-2 border-black text-black';
        const liked = !showUserVideos ? 'flex text-center border-2 border-black' : 'border-2 border-black text-black';

        return (
            <div className="flex justify-center mx-4">
                <div className="w-full max-w-[1150px]">
                        <div className="flex  rounded-3xl gap-3">
                            <div>
                            <Image
                            src={getAvatar(profile)}
                            alt=""
                            height={115}
                            width={115}
                            className="object-cover rounded-full"
                            />
                            </div>
                            <div className='flex flex-col justify-center p-2'>
                                <h1 className="text-md font-semibold capitalize">
                                {profile?.name}
                                </h1>
                                <span className="text-md mt-2">{profile?.handle}</span>
    
                     <div className="flex-shrink-0 ">
                           {itsNotMe ? (
                             <div>
                            { following ? (
                                <UnfollowButton setFollowing={ setFollowing } profile={ profile as Profile } />
                            ) : (
                               <FollowButton setFollowing={ setFollowing } profile={ profile as Profile }/>
                            )
                            }
                            </div>
                           ) : (
                            <button className='active:bg-violet-600 py-1 px-3 drop-shadow-xl rounded-full text-sm mt-2 border-2 border-black  hover:text-[#000000] hover:bg-[#57B8FF] transition cursor-pointer bg-[#57B8FF] text-[#000000] font-semibold'>
                                <Link href='/createstream'>GO LIVE</Link>
                            </button>
                            
                           )
                           } 
                    </div>
    
                            </div>
                        </div> 

                        <Link href={`/settings/index/${profile?.id}`}>
                            <Cog6ToothIcon  className='h-6 w-6 text-black' />
                        </Link>

    
                        <div className="flex gap-4 mt-3 cursor-pointer" onClick={() => { setShowFollowingModal(!showFollowingModal) }}>
                            <div className="flex items-center  margin-1 rounded-3xl gap-2">
                                <span className="font-bold text-md"> {profile?.stats.totalFollowing} </span>
                                <span>Following</span>
                                <Modal
                                title="Following"
                                show={showFollowingModal}
                                onClose={() => setShowFollowingModal(false)}
                                >
                                    <Following profile={profile as Profile} />
                                </Modal>
                            </div>
                        <div className="flex items-center  margin-1 rounded-3xl gap-2 cursor-pointer" onClick={() => { setShowFollowersModal(!showFollowersModal) }}>
                            <span className="font-bold text-md">{profile?.stats.totalFollowers}</span>
                            <span>Followers</span>
                            <Modal
                                title="Followers"
                                show={showFollowersModal}
                                onClose={() => setShowFollowersModal(false)}
                            >
                                <Followers profileId={profile?.id} />
                            </Modal>
                        </div>
                        </div>
                        <div className='flex-1 text-center gap-10 p-5 border-4 mb-5 mt-5 border-2 rounded-full border-black bg-blue-100 w-full'>
                        <span className={`text-md  bg-[#57B8FF]  rounded-full items-center  py-3 px-3  font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
                        Videos
                        </span>
                        <span className={`text-md bg-[#57B8FF]  rounded-full  py-3 px-3 font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
                        Collected
                        </span>
                        </div>
                    {(showUserVideos) ? <ProfileVideos /> : <CollectedVideos profile={profile as Profile} />}
                </div>
            </div>
            )
    }

export default ProfileCard;