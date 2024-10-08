"use client";
import { MenuItem } from "@/app/config";
import { ReactNode, createContext, useState } from "react";

export type CartItem = {
	item: MenuItem;
	quantity: number;
};

export const CartContext = createContext<{
	items: CartItem[];
	addItem: (item: MenuItem) => boolean;
	removeItem: (name: string) => boolean;
}>({
	items: [],
	addItem: () => {
		return false;
	},
	removeItem: () => {
		return false;
	},
});

export default function CartContextComponent({
	children,
}: {
	children: ReactNode;
}) {
	const [items, setItems] = useState<CartItem[]>([]);

	function addItem(item: MenuItem): boolean {
		const index = items.findIndex((i) => i.item.name === item.name);
		if (index === -1) {
			if (items.length < 100) {
				items.push({ item, quantity: 1 });
				setItems([...items]);
				return true;
			}
			return false;
		} else {
			if (items[index].quantity >= 30) return false;
			items[index].quantity++;
			setItems([...items]);
			return true;
		}
	}

	function removeItem(name: string): boolean {
		const index = items.findIndex((i) => i.item.name === name);
		if (index === -1) {
			return false;
		}
		if (items[index].quantity === 1) {
			setItems(items.filter((_, i) => i !== index));
			return true;
		} else {
			items[index].quantity--;
			setItems([...items]);
			return true;
		}
	}

	return (
		<CartContext.Provider value={{ items, addItem, removeItem }}>
			{children}
		</CartContext.Provider>
	);
}
