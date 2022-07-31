import { useCallback, useState } from "react";



export const useHttpRequest = ()=>{
    const [padding, setPadding] = useState(false)
    const [error, setError] = useState(null)
    

    const clearError = useCallback(()=>{
        setError(null)
    }, [])

    return {padding, setPadding, error, clearError}
}