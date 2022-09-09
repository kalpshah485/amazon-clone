const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { name, items, email } = req.body;

  const transformedItems = items.map(item => ({
    quantity: 1,
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
      maximum: 10
    },
    price_data: {
      currency: 'gbp',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      }
    }
  }));

  const session = await stripe.checkout.sessions.create({
    // name: 'Kalp Shah',
    // address: {
    //   line1: "Ahemedabad",
    //   postal_code: '385560',
    //   city: 'Ahemedabad',
    //   state: 'Gujarat',
    //   country: 'India'
    // },
    payment_method_types: ['card'],
    shipping_options: [{
      shipping_rate: 'shr_1LfMBuLVs08xAR7P7g2s1vlz'
    }],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA']
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      description: `${name}'s order`,
      email,
      images: JSON.stringify(items.map(item => item.image))
    }
  });

  res.status(200).json({
    id: session.id
  })

}