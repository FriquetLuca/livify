import mermaid from "/_internal/mermaid.esm.min.mjs";
mermaid.initialize({ startOnLoad:true });

interface TimeOut {
    cd: number;
    expRetry: boolean;
    maxTimeout: number;
}

function autorelog(url: string, tOut: Partial<TimeOut> = {}){
    const timeout = { cd: 1000, expRetry: false, maxTimeout: undefined, ...tOut };
    let currentTimeout = timeout?.cd??1000;
    let expRetry = timeout?.expRetry??false;
    let socket;
    let reconnect = false;
    const connectWebSocket = () => {
        socket = new WebSocket(url);
        socket.onopen = () => {
            if(reconnect){
                reconnect=false;
                location.reload();
            }
        };
        socket.onmessage = (_) => {
            location.reload();
        };
        socket.onclose = () => {
            reconnect = true;
            setTimeout(connectWebSocket, currentTimeout);
            const newTimeout = expRetry ? currentTimeout*2 : currentTimeout;
            currentTimeout = timeout.maxTimeout ? Math.min(newTimeout,timeout.maxTimeout) : newTimeout;
        };
    };
    return connectWebSocket;
};

autorelog(`ws://${window.location.host}/_internal/relog`)();
