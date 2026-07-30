import { NextResponse } from "next/server";
import { insertOrder } from "@/lib/queries";
import { makeReference } from "@/lib/format";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface OrderBody {
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    notes?: string;
  };
  items?: { slug: string; name: string; qty: number; price: number }[];
  shippingMethod?: string;
  shippingFee?: number;
  paymentMethod?: string;
  subtotal?: number;
  total?: number;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderBody;
    const { customer, items } = body;

    if (
      !customer?.name ||
      !customer?.phone ||
      !customer?.address ||
      !customer?.city ||
      !customer?.country ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Incomplete order details." },
        { status: 400 }
      );
    }

    const reference = makeReference();
    const shippingFee = Number(body.shippingFee ?? 0);
    const subtotal = Number(
      body.subtotal ?? items.reduce((s, i) => s + i.price * i.qty, 0)
    );
    const total = Number(body.total ?? subtotal + shippingFee);

    const whatsappUrl = buildWhatsAppUrl(
      buildOrderMessage({
        reference,
        lines: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
        subtotal,
        shippingFee,
        total,
        shippingMethod: body.shippingMethod ?? "Standard",
        paymentMethod: body.paymentMethod ?? "Pay on Delivery",
        customer: {
          name: customer.name,
          email: customer.email ?? "—",
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          country: customer.country,
          notes: customer.notes || undefined,
        },
      })
    );

    // Persist the order; even if the DB hiccups, the WhatsApp flow must work.
    try {
      await insertOrder({
        reference,
        customerName: customer.name,
        customerEmail: customer.email ?? "—",
        customerPhone: customer.phone,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        notes: customer.notes || null,
        itemsJson: JSON.stringify(items),
        subtotalNaira: subtotal,
        shippingNaira: shippingFee,
        totalNaira: total,
        shippingMethod: body.shippingMethod ?? "Standard",
        paymentMethod: body.paymentMethod ?? "Pay on Delivery",
      });
    } catch (err) {
      console.error("Order persistence failed:", err);
    }

    return NextResponse.json({ reference, whatsappUrl });
  } catch (err) {
    console.error("Order route error:", err);
    return NextResponse.json(
      { error: "Could not process the order." },
      { status: 500 }
    );
  }
}
