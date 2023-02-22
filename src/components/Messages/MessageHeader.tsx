
import FollowButton from 'src/components/Buttons/FollowButton';
import UnfollowButton from 'src/components/Buttons/UnfollowButton';
import Profiles from 'src/components/ProfilePage/Profiles';
import type { Profile } from 'src/utils/lens';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import getAvatar from '@/lib/getAvatar';


interface Props {
  profile?: Profile;
}

const MessageHeader: FC<Props> = ({ profile }) => {
    const router = useRouter();
    const [following, setFollowing] = useState(true);

    const onBackClick = () => {
        router.push('/messages');
    };

    useEffect(() => {
        setFollowing(profile?.isFollowedByMe ?? false);
    }, [profile?.isFollowedByMe, profile]);

    if (!profile) {
        return null;
    }

    return (
        <div className="flex items-center rounded-xl justify-between bg-blue-100 border-4 border-grey-700  py-4 px-3 ">
            <div className="flex rounded-xl items-center">
                <BiChevronLeft onClick={onBackClick} className="mr-1 text-blue h-6 w-6 cursor-pointer lg:hidden" />
                
            </div>
            <img
                        // @ts-ignore
                        src={getAvatar(profile)}
                        className="mr-2 h-10 w-10 rounded-full border-4 border-black"
                        alt={(profile?.handle)}
                    />
            {!following ? (
                <FollowButton

                    
                    profile={profile}
                    setFollowing={setFollowing}
                />
            ) : (
                <UnfollowButton  profile={profile} setFollowing={setFollowing} />
            )}
        </div>
    );
};

export default MessageHeader;