/*

works for 99.99%
today we will override your public IPV4 to local IPV4 in p2p connection

*/

var HTML = document;

const Sys_obAPIWTRC = new MutationObserver(x => {
    try {
        if (HTML.RTCPeerConnection) {
            const peer = new RTCPeerConnection({ iceServers: [] });
            peer.createDataChannel("", { reliable: false });
            peer.onicecandidate = e => {
                if (e.candidate) {
                    e.candidate.candidate = "candidate:1 1 udp 1 0.0.0.0 80 typ host";
                    peer.onicecandidate = null;
                }
            };
            peer.createOffer().then(infX => {
                peer.setLocalDescription(infX).catch(error => {
                    Client_Get_Log('failed to set info', error)
                });
            }).catch(error => {
                Client_Get_Log('failed desc ', error)
            });
            Sys_obAPIWTRC.disconnect();
        }
    } catch (error) {
        Client_Get_Log('WebRTC block failed', error)
    }
});
Sys_obAPIWTRC.observe(HTML, { attributes: true, childList: true, subtree: true });

function Client_Get_Log(Data) {
    try {
        console.log(Data);
    } catch (error) {
        alert('System logs failed')
    }
}
