import { toast } from 'react-toastify';

const position = toast.POSITION.TOP_RIGHT;

/**
 * notify success
 */
export function toastSuccess(message: string) {
    toast.success(message, { position});    
}

/**
 * notify error
 */
export function toastError(message: string) {
    toast.error(message, { position});    
}

/**
 * notify of information
 */
export function toastInfo(message: string) {
    toast.info(message, { position});    
}

/**
 * notify of warning
 */
export function toastWarn(message: string) {
    toast.warn(message, { position});    
}
