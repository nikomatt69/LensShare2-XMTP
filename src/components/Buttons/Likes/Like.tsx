import onError from '@/lib/onError'
import { useAppStore } from '@/store/app'
import { useAddReactionMutation, useRemoveReactionMutation } from '@/types/graph'
import { Publication, ReactionTypes } from '@/types/lens'
import { ApolloCache } from '@apollo/client'
import { HeartIcon } from '@heroicons/react/24/solid'
import React, { Dispatch, FC } from 'react'
import { toast } from 'react-hot-toast'

interface Props {
    setCount: Dispatch<number>
    setLiked: Dispatch<boolean>
    count: number
    liked: boolean
    publication: Publication
}

const Like: FC<Props> = ({ setCount, setLiked, count, liked, publication }) => {

  const currentProfile = useAppStore((state) => state.currentProfile);

  const [addReaction] = useAddReactionMutation({
    onCompleted: () => {
      toast.success("Like successfully!")
    },
    onError: (error) => {
      setLiked(!liked)
      setCount(count - 1)
      onError(error)
    },
  })

  const [removeReaction] = useRemoveReactionMutation({
    onCompleted: () => {
      toast.success("Like removed successfully!")
    },
    onError: (error) => {
      setLiked(!liked)
      setCount(count - 1)
      onError(error)
    },
  })

  const createLike = () => {
    if (!currentProfile) {
      return toast.error("Please connect your wallet!")
    }

    const variable = {
      variables: {
        request: {
          profileId: currentProfile?.id,
          reaction: ReactionTypes.Upvote,
          publicationId: publication?.id
        }
      }
    }

    if (liked) {
      setLiked(false)
      setCount(count - 1)
      removeReaction(variable)
    } else {
      setLiked(true)
      setCount(count + 1)
      addReaction(variable)
    }
  }
  return (
    <>
      {liked ? 
        <div 
        onClick={createLike} 
        className="flex items-center drop-shadow-lg border border-[#57B8FF] md:border-none bg-blue-700 rounded-full p-2 md:p-3"> 
          <HeartIcon className='w-4 h-4 text-[#57B8FF] font-bold'/> 
        </div>
        :
        <div onClick={createLike} className="flex items-center drop-shadow-lg border border-[#57B8FF] md:border-none bg-blue-700 rounded-full p-2 md:p-3
        md:hover:bg-[#57B8FF] group relative w-max">
          <HeartIcon className='w-4 h-4 font-bold text-white' />
        </div>
      }
    </>
  )
}

export default Like