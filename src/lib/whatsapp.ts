export const WHATSAPP_NUMBER = "2348054217435";
export const WHATSAPP_DISPLAY = "+234 805 421 7435";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface OrderLine {
  name: string;
  qty: number;
  price: number;
}

export interface OrderMessageInput {
  reference: string;
  lines: OrderLine[];
  subtotal: number;
  shippingFee: number;
  total: number;
  shippingMethod: string;
  paymentMethod: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    notes?: string;
  };
}

export function ngn(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildOrderMessage(input: OrderMessageInput): string {
  const divider = "--------------------------------";
  const items = input.lines
    .map(
      (line, i) =>
        `${i + 1}. ${line.name} (6-yard bundle)\n   Qty: ${line.qty} × ${ngn(line.price)} = ${ngn(line.qty * line.price)}`
    )
    .join("\n");

  return [
    "*NEW ORDER — DORBRAH FABRICS*",
    `Order Ref: ${input.reference}`,
    divider,
    "*ITEMS*",
    items,
    divider,
    `Subtotal: ${ngn(input.subtotal)}`,
    `Shipping (${input.shippingMethod}): ${ngn(input.shippingFee)}`,
    `*TOTAL: ${ngn(input.total)}*`,
    `Payment: ${input.paymentMethod}`,
    divider,
    "*CUSTOMER DETAILS*",
    `Name: ${input.customer.name}`,
    `Phone: ${input.customer.phone}`,
    `Email: ${input.customer.email}`,
    `Address: ${input.customer.address}`,
    `City: ${input.customer.city}`,
    `Country: ${input.customer.country}`,
    input.customer.notes ? `Notes: ${input.customer.notes}` : "",
    divider,
    "Sent from dorbrahfabrics.com storefront",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildCartMessage(lines: OrderLine[], subtotal: number): string {
  const divider = "--------------------------------";
  const items = lines
    .map(
      (line, i) =>
        `${i + 1}. ${line.name} — Qty: ${line.qty} × ${ngn(line.price)}`
    )
    .join("\n");
  return [
    "*HELLO DORBRAH — I would like to order:*",
    divider,
    items,
    divider,
    `Cart Total: ${ngn(subtotal)}`,
    "Please confirm availability and delivery options. Thank you!",
  ].join("\n");
}
