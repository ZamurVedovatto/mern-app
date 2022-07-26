import { createContext, useReducer } from 'react'

type ClientType = {
    _id: string;
    name: string;
    email: string;
    whatsapp: string;
}

type InitialStateType = {
    clients?: any,
    client?: ClientType,
}

const initialState = {
    clients: null,
    client: {
        _id: "",
        name: "",
        email: "",
        whatsapp: ""
    }
}

export const ClientContext = createContext<{
        state: InitialStateType;
        dispatch: React.Dispatch<any>;
    }>({
        state: initialState,
        dispatch: () => null
});



export const clientsReducer = (state:InitialStateType, action:any) => {
    switch (action.type) {
        case 'SET_CLIENTS':
            return {
                clients: action.payload
            }
        case 'SET_CLIENT':
            return {
                client: action.payload
            }
        case 'CREATE_CLIENT':
            return {
                clients: [action.payload, ...state.clients]
            }
        case 'DELETE_CLIENT':
            return { 
                clients: state.clients.filter((client:ClientType) => client._id !== action.payload._id) 
            }

        default:
            return state
    }
}

export const ClientContextProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(clientsReducer, initialState)

    return (
        <ClientContext.Provider value={{state, dispatch }}>
            {children}
        </ClientContext.Provider>
    )
}
