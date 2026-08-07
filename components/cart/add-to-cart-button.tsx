"use client";

import { useEffect, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";

type AddToCartButtonProps = {
  id: string;
  name: string;
  price: number;
  unit: string;
  emoji: string;
  quantity?: number;
};

export default function AddToCartButton({
  id,
  name,
  price,
  unit,
  emoji,
  quantity = 1,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) {
      return;
    }

    const timer = window.setTimeout(() => {
      setAdded(false);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [added]);

  function handleAddToCart() {
    addItem(
      {
        id,
        name,
        price,
        unit,
        emoji,
      },
      quantity
    );

    setAdded(true);
  }

  return (
    <div className="relative">
      <Button
        type="button"
        onClick={handleAddToCart}
        className="h-11 w-full rounded-full bg-[#2d6339] px-5 font-semibold text-white hover:bg-[#214e2d]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="added"
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -6,
              }}
              className="flex items-center justify-center gap-2"
            >
              <Check className="h-4 w-4" />
              Added to Cart
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -6,
              }}
              className="flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {added && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -5,
              scale: 0.95,
            }}
            className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#dce5d8] bg-white px-4 py-2 text-sm font-medium text-[#35613e] shadow-lg"
          >
            🌱 {name} added to your cart
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}