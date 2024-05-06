export function parseDateToInputValue(value?: Date) {
  if (!value) {
    return;
  }

  return value.toISOString().split('T')[0];
}
