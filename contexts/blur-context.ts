import {createContext, useContext} from "react";

export type BlurSetting = {
    blurScreen: boolean
    setBlurScreen: (b: boolean) => void
}

export const BlurContext = createContext<BlurSetting>({
    blurScreen: false,
    setBlurScreen: () => {
    }
});

export const useBlurContext = () => useContext(BlurContext);