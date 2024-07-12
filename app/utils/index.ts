
export const truncateText = (text: string, maxLength: number = 20): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export const formatPath = (path: string): string => {
    if (path.startsWith('/admin')) {
      return `Dashboard${path.replace('/admin', '').replace(/\//g, '-')}`;
    } else {
      return `home${path.replace(/\//g, ' /  ')}`;
    }
  };