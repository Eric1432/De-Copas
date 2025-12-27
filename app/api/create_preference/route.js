// app/api/create_preference/route.js
import { NextResponse } from "next/server";
import MercadoPago from "mercadopago";
import { Preference } from "mercadopago";

export async function POST(req) {
  try {
    const body = await req.json();

    const client = new MercadoPago({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: body.items.map((item) => ({
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: "ARS",
        })),
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("MercadoPago error:", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia" },
      { status: 500 }
    );
  }
}
