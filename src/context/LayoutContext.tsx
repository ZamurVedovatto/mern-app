import { createContext, useReducer } from 'react'

type InitialStateType = {
    showNavbar: boolean;
}

const initialState = {
    showNavbar: true
}

export const LayoutContext = createContext<{
        state: InitialStateType;
        dispatchLayout: React.Dispatch<any>;
    }>({
        state: initialState,
        dispatchLayout: () => null
});

export const layoutReducer = (state:InitialStateType, action:any) => {
    switch (action.type) {
        case 'SET_NAVBAR':
            return {
                showNavbar: action.payload
            }
        default:
            return state
    }
}

export const LayoutContextProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatchLayout] = useReducer(layoutReducer, initialState)

    return (
        <LayoutContext.Provider value={{state, dispatchLayout }}>
            {children}
        </LayoutContext.Provider>
    )
}