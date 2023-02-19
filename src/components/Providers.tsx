import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import {
  INFURA_ID,
  INFURA_RPC,
  CHAIN_ID,
  IS_MAINNET,
  LENSTOK_URL,
} from "src/constants";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import {configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai} from 'wagmi/chains' 
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { apolloClient } from "@/apollo-client";
import Video from "./HomePage/Video";

const { chains, provider } = configureChains(
  [IS_MAINNET ? polygon : polygonMumbai],
  [infuraProvider({ apiKey: INFURA_ID }), publicProvider()]
);

// const connectors = () => {
//   return [
//     new MetaMaskConnector({ chains }),
//     new InjectedConnector({
//       chains,
//       options: { shimDisconnect: true },
//     }),
//     new WalletConnectConnector({
//       chains,
//       options: { rpc: { [CHAIN_ID]: INFURA_RPC } },
//     }),
//   ];
// };

const { wallets } = getDefaultWallets({
  appName: 'LensShare',
  chains
});

const connectors = connectorsForWallets([...wallets])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVEPEER_KEY,
    baseUrl: LENSTOK_URL,
  }),
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} 
      theme={lightTheme({
        ...lightTheme.accentColors.purple,
        borderRadius: 'small',
        fontStack: 'system',
        overlayBlur: 'small',
      })}>
      <ApolloProvider client={apolloClient}>
        <LivepeerConfig client={livepeerClient}>
          <ThemeProvider defaultTheme="light" attribute="class">
            {children}
          </ThemeProvider>
          {/* <Video /> */}
        </LivepeerConfig>
      </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;