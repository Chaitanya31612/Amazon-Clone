const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req, res) => {
  const { items, email } = req.body;

  let totalAmount = 0;
  const transformedItems = items.map((item) => {
    totalAmount += item.price;
    return {
      description: item.description,
      quantity: item.quantity,
      price_data: {
        currency: "inr",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          images: [item.image],
        },
      },
    };
  });

  const shippingAmount = totalAmount < 500 ? 49 : 0;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1JAEaQSH9F4D0tUvsumDuCw1"],
    // shipping_rates: shippingAmount,
    shipping_address_collection: {
      allowed_countries: ["IN", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
