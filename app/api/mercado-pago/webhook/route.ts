import { NextRequest, NextResponse } from 'next/server';
import mpClient, { validateMercadoPagoWebhook } from "@/app/lib/mercado-pago";
import { Payment } from "mercadopago";
import { handleMercadoPagoPayment } from "@/app/server/mercado-pago/handle-payment";

export async function POST(req: NextRequest) {
  try {
    validateMercadoPagoWebhook(req);

    const body = await req.json();

    const { type, data } = body;

    // Webhook aqui

    switch (type) {
      case "payment":
        const payment = new Payment(mpClient);
        const paymentData = await payment.get({ id: data.id });
        if (
          paymentData.status === "approved" ||
          paymentData.date_approved !== null
        ) {
          await handleMercadoPagoPayment(paymentData);
        }
        break;
      case "subscription_preapproval": // Eventos de assinatura
        break;
      default:
        console.log("Esse evento não é suportado");
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
