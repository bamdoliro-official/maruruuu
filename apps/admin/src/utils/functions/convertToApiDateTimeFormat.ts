const convertToApiDateTimeFormat = (dateTimeStr: string): string => {
  const digits = dateTimeStr.replace(/\D/g, '');

  if (!/^\d{12}$/.test(digits)) return '';

  const y = digits.slice(0, 4);
  const m = digits.slice(4, 6);
  const d = digits.slice(6, 8);
  const h = digits.slice(8, 10);
  const min = digits.slice(10, 12);

  return `${y}-${m}-${d}T${h}:${min}:00`;
};

export default convertToApiDateTimeFormat;
