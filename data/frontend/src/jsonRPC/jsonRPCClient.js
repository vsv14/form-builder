import { JSONRPCClient } from "json-rpc-2.0";


export default function getNewJsonRPCClient(jsonRPCURL){
    const jsonRPCClient = new JSONRPCClient((jsonRPCRequest) =>{
        return fetch(jsonRPCURL, {
            method: "POST",
            headers: {
            "content-type": "application/json",
            },
            body: JSON.stringify(jsonRPCRequest),
        }).then((response) => {
            if (response.status === 200) {
                return response
                    .json()
                    .then((jsonRPCResponse) => jsonRPCClient.receive(jsonRPCResponse));
            } else if (jsonRPCRequest.id !== undefined) {
                return Promise.reject(new Error(response.statusText));
            }
        });
    });

    return jsonRPCClient;
}