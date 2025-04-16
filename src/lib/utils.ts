import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: 'lightgray',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'blue',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'blue' : state.isFocused ? 'lightgray' : 'white',
    color: state.isSelected ? 'white' : 'black',
  }),
};

export const transformStringToArray = (input: string): string[] => {
  return input
    .split(",")
    .map(item => item.trim())
    .filter(item => item !== "");
};

export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const inputDate = new Date(dateString);

  const diffInMs = now.getTime() - inputDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 7) {
    return `${diffInDays || 1}d`; // "1d" si aujourd'hui, "2d", etc.
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w`;
  }

  const diffInMonths =
    now.getMonth() -
    inputDate.getMonth() +
    12 * (now.getFullYear() - inputDate.getFullYear());

  if (diffInMonths < 12) {
    return `${diffInMonths || 1}m`;
  }

  const diffInYears = now.getFullYear() - inputDate.getFullYear();
  return `${diffInYears}y`;
}

export function parseStringArray(input: string): string[] {
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    return [];
  }
}

export const transformStringTagsToArray = (input: string): string[] => {
  if (!input) return []

  // Cas où c'est une string JSON comme '["react","next"]'
  if (input.trim().startsWith("[") && input.trim().endsWith("]")) {
    try {
      const parsed = JSON.parse(input)
      return Array.isArray(parsed) ? parsed.map(item => item.trim()) : []
    } catch (err) {
      // fallback au split
    }
  }

  // Sinon on split à la main
  return input.split(",").map(tag => tag.trim().replace(/^"|"$/g, ""))
}

export function detectType(input: string): 'email' | 'url' | 'none' {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  const urlRegex =
    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/

  if (emailRegex.test(input)) {
    return 'email'
  }

  if (urlRegex.test(input)) {
    return 'url'
  }

  return 'none'
}


