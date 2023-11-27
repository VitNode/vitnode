export const getMouseInfo = (
  event: MouseEvent
): {
  codeDOMNode: HTMLElement | null;
  isOutside: boolean;
} => {
  const target = event.target;

  if (target && target instanceof HTMLElement) {
    const codeDOMNode = target.closest<HTMLElement>('code.vitnode-editor_code');
    const isOutside = !(
      codeDOMNode || target.closest<HTMLElement>('div.vitnode-editor_code--menu')
    );

    return { codeDOMNode, isOutside };
  }

  return { codeDOMNode: null, isOutside: true };
};
