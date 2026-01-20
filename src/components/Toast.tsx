import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300); // Wait for animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, id, onClose]);

    const bgColor =
        type === "success"
            ? "bg-green-500"
            : type === "error"
                ? "bg-red-500"
                : "bg-blue-500";

    return (
        <div
            className={`
        fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300 transform
        ${bgColor}
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
      `}
            role="alert"
        >
            <span className="font-medium">{message}</span>
            <button onClick={() => setIsVisible(false)} className="ml-2 hover:bg-white/20 rounded p-1">
                ✕
            </button>
        </div>
    );
};

export default Toast;
