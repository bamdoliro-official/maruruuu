const convertToApiDateFormat = (dateStr: string | null): string => {
  if (!dateStr) return '';

  const digits = dateStr.replace(/\D/g, '');

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

  if (/^\d{8}$/.test(digits)) {
    const y = digits.slice(0, 4);
    const m = digits.slice(4, 6);
    const d = digits.slice(6, 8);

    return `${y}-${m}-${d}`;
  }

  return '';
};

export default convertToApiDateFormat;
