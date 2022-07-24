import { createContext, useReducer } from 'react'

export const LayoutContext = createContext()

export const layoutReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NAVBAR':
            return {
                showNavbar: action.payload
            }
        default:
            return state
    }
}

export const LayoutContextProvider = ({children}) => {
    const [state, dispatchLayout] = useReducer(layoutReducer, {
        showNavbar: true,
    })

    return (
        <LayoutContext.Provider value={{ ...state, dispatchLayout }}>
            {children}
        </LayoutContext.Provider>
    )
}