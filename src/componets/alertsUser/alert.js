import { writable, derived } from "svelte/store"

function createNotificationStore(timeout) {
    const _notifications = writable([])

    function send(message, type, timeout = 3000) {
        const icons = {
            "alert-success": "check_circle",
            "alert-error": "report",
            "alert-warning": "warning",
            "alert-info": "info",
            "alert-default": "notifications",
        };

        const icon = icons[type] || "default";

        _notifications.update(state => {
            console.log('object :>> ', { id: id(), type, message, timeout, icon });
            return [...state, { id: id(), type, message, timeout, icon }];
        });
    }

    let timers = []

    const notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications)
        if ($_notifications.length > 0) {
            const timer = setTimeout(() => {
                _notifications.update(state => {
                    state.shift()
                    return state
                })
            }, $_notifications[0].timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    })
    const { subscribe } = notifications

    return {
        subscribe,
        send,
        default: (msg, timeout) => send(msg, "alert-default", timeout),
        error: (msg, timeout) => send(msg, "alert-error", timeout),
        warning: (msg, timeout) => send(msg, "alert-warning", timeout),
        info: (msg, timeout) => send(msg, "alert-info", timeout),
        success: (msg, timeout) => send(msg, "alert-success", timeout),
    }
}

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const notifications = createNotificationStore()
