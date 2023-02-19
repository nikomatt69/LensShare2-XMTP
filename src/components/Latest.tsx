import {
  ExplorePublicationsDocument,
  ExplorePublicationResult,
  Profile,
} from "@/types/lens";
import type { Publication } from "@/types/lens";
import { useQuery } from "@apollo/client";
import VideoCard from "@/components/HomePage/VideoCard";
import { useAppStore } from "@/store/app";

const Latest = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;
  const profileId = currentProfile?.id ?? null;

  const { data, loading, error } = useQuery<{
    explorePublications: ExplorePublicationResult;
  }>(ExplorePublicationsDocument, {
    variables: {
      request: {
        sortCriteria: "LATEST",
        publicationTypes: ["POST"],
        timestamp: 1,
        // limit: 50,
        excludeProfileIds: [
          //nsfw
          "0x5eaf",
          "0x3f7d",
          "0x5b94",
          "0x5c7c",
          "0x62dd",
          "0x53cd",
        ],
        metadata: {
          mainContentFocus: ["VIDEO"],
        },
      },
      reactionRequest,
      profileId,
    },
  });
  const publications = data?.explorePublications.items;
  console.log("DATA", data?.explorePublications.items);

  const onlyVideoPublications = publications?.filter((publication) => {
    if (
      publication.metadata.media[0].original.mimeType.startsWith("video/") &&
      publication.metadata.media[0].original.url
    ) {
      return (
        publication.metadata.media[0].original.url.startsWith(
          "https://lens.infura-ipfs.io"
        ) ||
        publication.metadata.media[0].original.url.startsWith("ipfs://") ||
        publication.metadata.media[0].original.url.startsWith("https://arweave")
      );
    }
  });

  return (
    <div>
      {onlyVideoPublications?.map((pub: Publication) => (
        <VideoCard key={pub.id} publication={pub as Publication} />
      ))}
    </div>
  );
};

export default Latest;
