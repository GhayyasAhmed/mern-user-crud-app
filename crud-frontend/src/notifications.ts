const FLASH_MESSAGE_KEY = "crud-frontend-flash-message";

export type FlashMessageType = "success" | "danger" | "info";

export interface FlashMessage {
  text: string;
  type: FlashMessageType;
}

export function setFlashMessage(message: FlashMessage): void {
  sessionStorage.setItem(FLASH_MESSAGE_KEY, JSON.stringify(message));
}

export function getFlashMessage(): FlashMessage | null {
  const rawValue = sessionStorage.getItem(FLASH_MESSAGE_KEY);

  if (!rawValue) {
    return null;
  }

  sessionStorage.removeItem(FLASH_MESSAGE_KEY);

  try {
    return JSON.parse(rawValue) as FlashMessage;
  } catch {
    return null;
  }
}
