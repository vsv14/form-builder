import { useCallback, useState } from "react";
import { JSONRPCClient } from "json-rpc-2.0";


export const useHttpRequest = ()=>{
    const [padding, setPadding] = useState(false)
    const [error, setError] = useState(null)
    
    const getJsonRPCClient = useCallback(() =>{
        const jsonRPCClient = new JSONRPCClient((jsonRPCRequest) =>{
            setPadding(true)
            return fetch("http://localhost:5000/json-rpc", {
                method: "POST",
                headers: {
                "content-type": "application/json",
                },
                body: JSON.stringify(jsonRPCRequest),
            }).then((response) => {
                setPadding(false)
                if (response.status === 200) {
                // Use client.receive when you received a JSON-RPC response.
                    return response
                        .json()
                        .then((jsonRPCResponse) => jsonRPCClient.receive(jsonRPCResponse));
                } else if (jsonRPCRequest.id !== undefined) {
                    return Promise.reject(new Error(response.statusText));
                }
            })
        });

        return jsonRPCClient;
    }, [])

    const clearError = useCallback(()=>{
        setError(null)
    }, [])

    return {padding, getJsonRPCClient, error, clearError}
}