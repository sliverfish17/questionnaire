export const useButtonStyles = (isActive: boolean): string => {
  return isActive
    ? 'bg-button-active-gradient text-white'
    : 'bg-button-regular text-button-text';
};
