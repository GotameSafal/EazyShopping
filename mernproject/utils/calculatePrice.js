export const caluculatePrice = (obj) => {
  const total = obj?.cart?.reduce((acc, item) => {
    if (item.quantity > 0) {
      return acc + (
        item.quantity * item.price -
        Math.ceil(
          (item?.price * item.quantity * item.discount) / 100 / 5
        ) *
          5
      );
    }
    return acc;
  }, 0);
  const totalPrice = Math.ceil((total + (total * obj.vat) / 100) / 5) * 5;
  const costWithVat = totalPrice !== 0 ? totalPrice + obj.shipping : totalPrice;
  return { total, costWithVat, vat: obj?.vat, shipping: obj.shipping };
};
