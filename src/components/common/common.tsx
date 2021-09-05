export interface IRedirect {
  redirect: string;
}

export const redirect = (data: IRedirect) => {
  if (data.redirect) {
    window.location.href = data.redirect;
  }
};

const defaultLocale = 'ru-RU';

export const formatCurrency = (value: number, locale = defaultLocale) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (date: Date, locale = defaultLocale) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};

const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

export const calcTotal = (array: [], fieldName: never, discount = 0) => {
  let total = array.reduce((total: number, p: object) => {
    // console.log('Payments.calcTotal', total, p);

    return (total += +getKeyValue(p, fieldName));
  }, 0);
  total = total - discount;
  return total >= 0 ? total : 0;
};
