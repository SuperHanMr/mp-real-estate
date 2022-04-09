type ReceiveMessageType<T> = (data: T | undefined) => void

export const useParentWindowMessage = <S, R>(receiveMessage: ReceiveMessageType<R>, pageReadyName?: string, targetOrigin?: string) => {
  const sendMessage = (params: S) => {
    if (window.parent === window) {
      return;
    }
    if (typeof params === "object") {
      window.parent.postMessage(JSON.stringify(params), targetOrigin || "*");
    } else if (typeof params === "string") {
      window.parent.postMessage(params, targetOrigin || "*");
    }
  }

  window.addEventListener("message", (ev: MessageEvent<string>) => {
    console.log("接收到窗口消息：", ev.data);
    let obj: R | undefined;
    try {
      obj = JSON.parse(ev.data);
    } catch { }
    receiveMessage(obj);
  });

  window.parent.postMessage(pageReadyName || "page-ready", targetOrigin || "*");

  return {
    sendMessage
  }
}
