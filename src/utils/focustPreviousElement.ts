export const focusNextElement = (el: HTMLDivElement | null) => {
  (el?.nextElementSibling as HTMLElement).focus();
};
