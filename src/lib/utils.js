import { format, parse, addDays, startOfDay } from "date-fns";
import { es } from "date-fns/locale";

export const formatDateLong = (dateStr) => {
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  return format(date, "EEEE d 'de' MMMM", { locale: es });
};

export const formatDateShort = (dateStr) => {
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  return format(date, "EEE d MMM", { locale: es });
};

export const formatPrice = (price) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

export const getDayOfWeek = (dateStr) => {
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  return date.getDay();
};

export const toDateStr = (date) => format(date, "yyyy-MM-dd");

export const getNextNDays = (n) => {
  const today = startOfDay(new Date());
  const days = [];
  for (let i = 0; i < n; i++) {
    days.push(addDays(today, i));
  }
  return days;
};

export const slugify = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const cn = (...classes) => classes.filter(Boolean).join(" ");
