import common from '@/locales/common.json';
import booking from '@/locales/booking.json';
import schedule from '@/locales/schedule.json';
import manage from '@/locales/manage.json';
import auth from '@/locales/auth.json';
import validation from '@/locales/validation.json';
import email from '@/locales/email.json';

export const INTL_LOCALE = 'zh-TW';

const namespaces = {
  common,
  booking,
  schedule,
  manage,
  auth,
  validation,
  email,
} as const;

export type StringNamespace = keyof typeof namespaces;

type TOptions = Record<string, unknown> & { defaultValue?: string };

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'string' ? current : undefined;
}

function interpolate(str: string, options?: Record<string, unknown>): string {
  if (!options) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => String(options[key] ?? ''));
}

function resolveKey(
  ns: Record<string, unknown>,
  key: string,
  options?: TOptions,
): string | undefined {
  const { defaultValue: _defaultValue, count, ...rest } = options ?? {};

  if (count !== undefined) {
    const countNum = Number(count);
    const pluralKey = countNum === 1 ? `${key}_one` : `${key}_other`;
    const pluralVal = getNestedValue(ns, pluralKey) ?? getNestedValue(ns, key);
    if (pluralVal) return interpolate(pluralVal, { count, ...rest });
  }

  const val = getNestedValue(ns, key);
  if (val) return interpolate(val, rest);
  return undefined;
}

function translate(
  defaultNs: StringNamespace,
  key: string,
  optionsOrFallback?: TOptions | string,
): string {
  let options: TOptions | undefined;
  let fallback: string | undefined;

  if (typeof optionsOrFallback === 'string') {
    fallback = optionsOrFallback;
  } else {
    options = optionsOrFallback;
    fallback = options?.defaultValue;
  }

  const colonIdx = key.indexOf(':');
  const nsName = colonIdx >= 0 ? (key.slice(0, colonIdx) as StringNamespace) : defaultNs;
  const path = colonIdx >= 0 ? key.slice(colonIdx + 1) : key;
  const ns = namespaces[nsName];

  if (!ns) return fallback ?? key;

  return resolveKey(ns as Record<string, unknown>, path, options) ?? fallback ?? key;
}

/** Create a namespace-scoped translator (drop-in replacement for useTranslation). */
export function createT(namespace: StringNamespace) {
  return (key: string, optionsOrFallback?: TOptions | string) =>
    translate(namespace, key, optionsOrFallback);
}

/** Validation messages (used outside React components). */
export const tValidation = createT('validation');
