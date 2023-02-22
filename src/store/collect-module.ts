import { WMATIC_TOKEN_ADDRESS } from 'src/constants';
import { CollectModules } from 'src/types/lens';
import { create } from 'zustand'

interface CollectModuleState {
  selectedCollectModule: CollectModules;
  setSelectedCollectModule: (selectedModule: CollectModules) => void;
  amount: null | string;
  setAmount: (amount: null | string) => void;
  selectedCurrency: null | string;
  setSelectedCurrency: (selectedCurrency: null | string) => void;
  referralFee: null | string;
  setReferralFee: (referralFee: null | string) => void;
  collectLimit: null | string;
  setCollectLimit: (collectLimit: null | string) => void;
  hasTimeLimit: boolean;
  setHasTimeLimit: (hasTimeLimit: boolean) => void;
  followerOnly: boolean;
  setFollowerOnly: (followerOnly: boolean) => void;
  payload: any;
  setPayload: (payload: any) => void;
  reset: () => void;
}

export const useCollectModuleStore = create<CollectModuleState>((set) => ({
    selectedCollectModule: CollectModules.RevertCollectModule,
    setSelectedCollectModule: (selectedCollectModule) => set({ selectedCollectModule }),
    amount: null,
    setAmount: (amount) => set({ amount }),
    selectedCurrency: WMATIC_TOKEN_ADDRESS,
    setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency }),
    referralFee: null,
    setReferralFee: (referralFee) => set({ referralFee }),
    collectLimit: null,
    setCollectLimit: (collectLimit) => set({ collectLimit }),
    hasTimeLimit: false,
    setHasTimeLimit: (hasTimeLimit) => set({ hasTimeLimit }),
    followerOnly: false,
    setFollowerOnly: (followerOnly) => set({ followerOnly }),
    payload: { revertCollectModule: true },
    setPayload: (payload) => set({ payload }),
    reset: () =>
        set({
        selectedCollectModule: CollectModules.RevertCollectModule,
        amount: null,
        selectedCurrency: WMATIC_TOKEN_ADDRESS,
        referralFee: null,
        collectLimit: null,
        hasTimeLimit: false,
        followerOnly: false,
        payload: { revertCollectModule: true }
        })
}));