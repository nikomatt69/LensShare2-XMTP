import { useEffect, useState } from "react";
import { Publication } from "@/types/lens";
import { useAppStore } from "src/store/app";
import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import getAvatar from "@/lib/getAvatar";


interface Props {
  comment: Publication;
  publication: Publication;
}

const CommentData: FC<Props> = ({ comment, publication }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [decryptedComment, setDecryptedComment] = useState("");
  /* useEffect(() => {
    const decrypted = async () => {
      if (comment.metadata.attributes[0]?.traitType === "encrypted") {
        const response = await decrypt();
        console.log("Response decrypted comment:", response);
        setDecryptedComment(
          response
            ? response
            : `Encrypted on LensShare👀 : ${comment.metadata.content}`
        );
      } else {
        setDecryptedComment(comment.metadata.content);
      }
    };
    decrypted();
  }, []); */

  async function decrypt() {
    const attributes = comment.metadata.attributes[0];
    if (attributes && attributes.traitType === "encrypted") {
      try {
        const ipfsUrl = comment.metadata.attributes[0].value;
        if (ipfsUrl) {
          const body = { url: ipfsUrl };
          const response = await fetch("/api/get-encrypted", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body),
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return comment.metadata.content;
    }
  }

  return (
    <div className="flex gap-2">
      <Link href={`/profile/${comment.profile.id}`} key={comment.profile.id}>
        <div className="flex-shrink-0 rounded-full">
          <Image
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            src={getAvatar(comment.profile)}
            alt={comment.profile.handle}
          />
        </div>
      </Link>
      <div className="flex-grow w-[90%]">
        <p className="font-bold hover:underline">{comment.profile.handle}</p>
        <p
          style={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {comment.metadata.content}
        </p>
      </div>
    </div>
  );
};

export default CommentData;
