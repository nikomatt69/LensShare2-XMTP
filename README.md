# LensShare

A decentralised video sharing social platform built on Lens Protocol. 
With LensShare, users can share and discover short videos through live streaming, uploads, and social shares. (TL:DR a decentralised TikTok)


## Summary

LensShare is a platform that allows users to share videos with the Lens community and more. You do not need to be logged in to view and enjoy the videos. But once logged in with Lens you can post and share short videos and interact with other users videos.

LensShare offers a variety of features, including the ability to upload videos via bundlr & arweave, live streaming with Livepeer, and the option to interact with other users through comments, likes, and collects all through Lens protocol. Users can also search for and follow other profiles, and view their followers and videos.

## Table of Contents

  * [Overview](#overview)
  * [Features Summary](#features-summary)
  * [Stack](#stack)
  * [Demo Images](#demo-images)
  * [Setup](#setup)
  * [Conclusion](#conclusion)
  * [Credits](#credits)


## Overview

A video sharing social media platform is a fun way for people to show each other what they are doing, or to share things they find funny or interesting. Other people can watch the videos and leave comments, or "like" them if they enjoy them creating social interactions and community. 

We set out to build a social media that cares more about the user, that won’t harvest user data (looking at you Tiktok!) and gives the content creator control over their own content. 

For full transparency we started to build LensShare as part of the Encode/WBW3 accelerator, the Next Build Hackathon began a week or so into it and we were encouraged to enter, and so have been building for both alongside each other. We have added new features since it finished in mid December. LensShare is also taking part in Buildspace N&W S2. 

## Features Summary

- **Social sharing**: LensShare includes a variety of social sharing features, these come from using Lens social graph, and include the ability to comment, like, and collect videos.

- **Follow and search profiles**: Users can search for and follow other profiles on the platform, and view their followers and videos. There is a mobile discover page.

- **Lens Collect module**: LensShare includes a collect module, where users can set conditions on who can collect their video

- **Upload on Bundlr/Arweave**: In addition to live streaming, users can also upload their videos to the platform for others to discover. 

- **Mobile**: LensShare is mobile friendly, making it accessible to a wide range of users.

- **Encrypted Commenting with Lit**: Just push a toggle to encrypt your comment to keep it secret to all except the user that posted the video.

- **Live streaming with Livepeer**: LensShare allows users to share their videos in real-time with the community through live streaming.

## Stack
- Nextjs
- Tailwind CSS
- Lens Protocol
- Polygon Mumbai
- Bundlr
- Arweave
- Lit Protocol
- Livepeer

## Setup

```git clone git@github.com:LensShare/LensShare.git
cd LensShare
npm install
# generate lens types
npm run codegen
# create your env variables
cp .env.example .env
# Copy your Infura Api key in the .env file
# NEXT_PUBLIC_INFURA_ID=<yourInfuraKeyHere>
npm run dev
```

## Conclusion
Our aim when building LensShare was to try and make a contribution to a more decentralised social media, where users don’t have to worry about their data, and where they have full control over their content. 

LensShare is built on chain and so is by nature decentralised, it uses decentralised protocols such as Lens and Livepeer. This means greater privacy and security for users, as their data is not stored on a central server that could be vulnerable to hacking or other security threats.

In addition to the core social features, LensShare also includes the Lens collect module. This feature allows users to take more control over their content.
Comments, encrypted with Lit Protocol give further user control on both the creator and user side. 

## Credits
LensShare was created by @Nikoemme.lens @N44TS, @driespindola, @PaoloCalzone
