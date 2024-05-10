export function parseDateToInputValue(value?: Date) {
  if (!value) {
    return;
  }

  return value.toISOString().split('T')[0];
}

export function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d as any);
}
