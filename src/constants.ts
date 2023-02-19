import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';

export const IS_MAINNET = process.env.NEXT_PUBLIC_NETWORK === "mainnet";

export const APP_ID = "lensshare";
export const APP_NAME = "LensShare";
export const LENSTOK_URL = process.env.NEXT_PUBLIC_LENSTOK_URL;


export const XMTP_ENV = IS_MAINNET ? 'production' : 'dev';
export const XMTP_PREFIX = 'lens.dev/dm';

export const CHAIN_ID = IS_MAINNET ? polygon.id : polygonMumbai.id;
export const API_URL = IS_MAINNET
  ? "https://api.lens.dev"
  : "https://api-mumbai.lens.dev";
export const LENSHUB_PROXY = IS_MAINNET
  ? "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"
  : "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82";
export const LENS_PERIPHERY = IS_MAINNET
  ? "0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f"
  : "0xD5037d72877808cdE7F669563e9389930AF404E8";

export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID || '';
export const INFURA_RPC = IS_MAINNET
  ? `https://polygon-mainnet.infura.io/v3/${INFURA_ID}`
  : `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`;

export const LS_KEYS = {
  LENSTTOK_STORE: "lensshare.store",
  TRANSACTION_STORE: "transaction.store",
  TIMELINE_STORE: "timeline.store",
  MESSAGE_STORE: "message.store",


};


export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/mpeg', 'video/ogg', 'video/webm', 'video/quicktime'];
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
export const ALLOWED_MEDIA_TYPES = [...ALLOWED_VIDEO_TYPES, ...ALLOWED_IMAGE_TYPES];


export const SIGN_IN_REQUIRED_MESSAGE = 'Sign in required'
export const WRONG_NETWORK = IS_MAINNET
  ? 'Please change network to Polygon mainnet.'
  : 'Please change network to Polygon Mumbai testnet.'
export const SIGN_ERROR = 'Failed to sign data'


export const RELAY_ON = "true";
export const ERROR_MESSAGE = "Something went wrong!";

export const WMATIC_TOKEN_ADDRESS = IS_MAINNET
  ? "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
  : "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";

export const BUNDLR_NODE_URL = IS_MAINNET
  ? "https://node1.bundlr.network"
  : "https://devnet.bundlr.network";

export const BUNDLR_CURRENCY = "matic";

export const VIDEO_CDN_URL = "https://cdn.livepeer.com";

export const API_ORIGINS = "";

export const ARWEAVE_WEBSITE_URL = "https://arweave.net";
export const OPENSEA_MARKETPLACE_URL = IS_MAINNET
  ? "https://opensea.io"
  : "https://testnets.opensea.io";

export const IMAGE_CDN_URL = IS_MAINNET
  ? "https://ik.imagekit.io/lenstubemain , https://ik.imagekit.io/gzmagoxn0r"
  : "";

export const UPDATE_OWNABLE_FEE_COLLECT_MODULE_ADDRESS = IS_MAINNET
  ? "0x432960b3209686Cc69e2EEC1dBBaB52A1c0Bf938"
  : "0xA78E4a4D0367f0f4674130F0Bb2653957ab5917e";

export const FREE_COLLECT_MODULE = IS_MAINNET
  ? "0x23b9467334bEb345aAa6fd1545538F3d54436e96"
  : "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c";

export const MAINNET_DEFAULT_TOKEN =
  "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";

export const POLYGONSCAN_URL = IS_MAINNET
  ? "https://polygonscan.com"
  : "https://mumbai.polygonscan.com";
  
export const API_KEY = process.env.NEXT_PUBLIC_STUDIO_API_KEY

export const LIT_PROTOCOL_ENV = IS_MAINNET ? "polygon" : "mumbai"

export const DEFAULT_COLLECT_TOKEN = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
export const GIPHY_TOKEN = 'mztAE0vdQdlfCYsM11E6UaPjUmjpYDHV'

export const MESSAGE_PAGE_LIMIT = 15;
export const SCROLL_THRESHOLD = 0.5;
export const MIN_WIDTH_DESKTOP = 1024;

// Named transforms
export const AVATAR = 'avatar';
export const COVER = 'cover';
export const ATTACHMENT = 'attachment';

// External Apps
export const LENSTER_URL = 'https://lenster.xyz'

export const LENSPROTOCOL_HANDLE = 'lensprotocol';
export const HANDLE_SUFFIX = IS_MAINNET ? '.lens' : '.test';

// Regex
export const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[\da-z]+([.\-][\da-z]+)*\.[a-z]{2,63}(:\d{1,5})?(\/.*)?$/;
export const ADDRESS_REGEX = /^(0x)?[\da-f]{40}$/i;
export const HANDLE_REGEX = /^[\da-z]+$/;
export const ALL_HANDLES_REGEX = /([\s+])@(\S+)/g;
export const HANDLE_SANITIZE_REGEX = /[^\d .A-Za-z]/g;