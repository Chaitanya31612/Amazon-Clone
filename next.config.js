module.exports = {
  images: {
    domains: [
      "links.papareact.com",
      "pngimg.com",
      "fakestoreapi.com",
      "images-eu.ssl-images-amazon.com",
    ],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  },
};
