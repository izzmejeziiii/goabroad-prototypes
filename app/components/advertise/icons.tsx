import { FiCheck } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export function CheckIcon() {
    return (
        <div className="bg-green-50 rounded-full p-1.5">
            <FiCheck size={14} className="text-green-600" />
        </div>
    );
}

export function CrossIcon() {
    return (
        <div className="bg-red-50 rounded-full p-1.5">
            <IoClose size={14} className="text-red-600" />
        </div>
    );
}
