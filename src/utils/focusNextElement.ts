export const focusPreviousElement = (el: HTMLDivElement | null) => {
  (el?.previousElementSibling as HTMLElement).focus();
};
