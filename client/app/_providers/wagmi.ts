"use client";

import { createConfig, http } from "wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { baseSepolia } from "wagmi/chains";


export const config = createConfig(
  getDefaultConfig({
    enableFamily: false,
    chains: [baseSepolia],
    transports: {
      // RPC URL for each chain
      [baseSepolia.id]: http(),
    },
    storage: createStorage({
      storage: cookieStorage,
    }),

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "default_project_id",

    // Required App Info
    appName: "SealiX",

    // Optional App Info
    appDescription: "Decentralised Skill badges",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png",
  })
);
