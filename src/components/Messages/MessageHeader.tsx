
import FollowButton from 'src/components/Buttons/FollowButton';
import UnfollowButton from 'src/components/Buttons/UnfollowButton';
import Profiles from 'src/components/ProfilePage/Profiles';
import type { Profile } from 'src/utils/lens';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';


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
        <div className="flex items-center justify-between border-b-[1px] px-4 py-2 border-gray-700">
            <div className="flex items-center">
                <BiChevronLeft onClick={onBackClick} className="mr-1 h-6 w-6 cursor-pointer lg:hidden" />
                
            </div>
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