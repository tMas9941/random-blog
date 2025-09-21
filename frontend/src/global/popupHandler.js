import Signal from "../utils/signal";

export const popupSignal = new Signal({ show: false, message: "", success: null });
export const popupResults = { success: "success", warning: "warning", error: "error" };

export function changePopupData(message, result) {
    popupSignal.changeValue({ show: true, message, result });
}

export function resetPopupData() {
    popupSignal.changeValue({ ...popupSignal.value, show: false });
}
