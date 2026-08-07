import * as React from "react";
import { SiteHeader } from "@prototype/components/site-header";
import { SiteFooter } from "@prototype/components/site-footer";
import { CartView } from "@prototype/components/cart/cart-view";

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <CartView />
      <SiteFooter />
    </div>
  );
}
