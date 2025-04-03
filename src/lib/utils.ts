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
