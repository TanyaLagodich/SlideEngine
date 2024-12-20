import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useMemo, useState } from 'react';
import { AppMode, Slide } from '@/types';

export enum TAB {
    FILE = 'Файл',
    INSERTION = 'Вставка',
    DECORATION = 'Оформление',
    // ANIMATION = 'Анимации',
}

type AppContextType = {
    activeTab: TAB;
    activeTabDropdown?: TAB;
    mode: AppMode;
    isNumerationShown: boolean;
    slideWithOpenMenu: Slide | null;
};

type AppActionsContextType = {
    setActiveTab: (tab: TAB) => void;
    setActiveTabDropdown: (tab: TAB | undefined) => void;
    setMode: (mode: AppMode) => void;
    toggleNumeration: () => void;
    setSlideWithOpenMenu: Dispatch<SetStateAction<Slide | null>>;
};

export const AppContext = createContext<AppContextType | null>(null);
export const AppActionsContext = createContext<AppActionsContextType | null>(
    null
);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [activeTab, setActiveTab] = useState(TAB.DECORATION);
    const [activeTabDropdown, setActiveTabDropdown] = useState<TAB | undefined>(
        undefined
    );

    const [mode, setMode] = useState(AppMode.EDITOR);
    const [isNumerationShown, setIsNumerationShown] = useState(false);
    const [slideWithOpenMenu, setSlideWithOpenMenu] = useState<Slide | null>(null);

    const toggleNumeration = useCallback(() => {
        setIsNumerationShown(prev => !prev);
    }, []);

    const values = useMemo(
        () => ({ activeTab, activeTabDropdown, mode, isNumerationShown, slideWithOpenMenu }),
        [activeTab, activeTabDropdown, mode, isNumerationShown, slideWithOpenMenu]
    );

    const actions = useMemo(
        () => ({
            setActiveTab,
            setActiveTabDropdown,
            setMode,
            toggleNumeration,
            setSlideWithOpenMenu,
        }),
        [setActiveTab, setActiveTabDropdown, setMode, toggleNumeration, setSlideWithOpenMenu]
    );

    return (
        <AppContext.Provider value={values}>
            <AppActionsContext.Provider value={actions}>
                {children}
            </AppActionsContext.Provider>
        </AppContext.Provider>
    );
};
