export const CONTACT_EMAIL = "admin@bigdade.id";

export const CONTACT_WHATSAPP = {
  digits: "6287819409980",
  display: "(+62) 878 1940 9980",
};

export function mailtoUrl(subject?: string): string {
  const base = `mailto:${CONTACT_EMAIL}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${CONTACT_WHATSAPP.digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
