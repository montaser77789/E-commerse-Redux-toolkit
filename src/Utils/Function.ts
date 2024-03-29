import CookiesServices from "../Services/CookiesServices";
import { Iproduct } from "../interfaces";
import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

export const addItemsToShopppingCard = (
  cartProducts: Iproduct[],
  product: Iproduct
  ) => {
  const user = CookiesServices.get("user");

  if (!user) return;
  const exists = cartProducts.find((item) => product.id == item.id);

  if (exists) {
    if (user) {
      toast({
        title: "Added to your car.",
        description:
          "This item is already exist, the quantity will be increased",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Added to your car.",
        description:
          "This item is already exist, the quantity will be increased",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }

    return cartProducts.map((item) =>
      item.id == product.id ? { ...item, qty: item.qty + 1 } : item
    );
  }
  toast({
    title: "Added to your car.",
    status: "success",
    duration: 2000,
    isClosable: true,
  });

  return [...cartProducts, { ...product, qty: 1 }];
};
