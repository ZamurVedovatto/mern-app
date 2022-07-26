import { LayoutContext } from './../context/LayoutContext'
import { useContext } from 'react'

export const useLayoutContext = () => {
    const context = useContext(LayoutContext)

    if(!context) {
        throw Error('useLayoutContext must be used inside and LayoutContextProvider')
    }

    return context  
}