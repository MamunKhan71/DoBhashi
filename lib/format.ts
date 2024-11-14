export const formatPrice = (price) => {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT"
    }).format(price)
}