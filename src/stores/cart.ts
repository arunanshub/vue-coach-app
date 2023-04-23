import type { Product } from './products'
import { defineStore } from 'pinia'

interface CartItem {
  productId: string
  title: string
  image: string
  price: number
  qty: number
}

interface Cart {
  items: CartItem[]
  total: number
  qty: number
}

export const useCartStore = defineStore('cart', {
  state: (): Cart => ({
    items: [] as CartItem[],
    total: 0,
    qty: 0,
  }),
  persist: true,
  actions: {
    addProductToCart(productData: Product) {
      const productInCartIndex = this.items.findIndex(
        (ci) => ci.productId === productData.id
      )

      if (productInCartIndex >= 0) {
        this.items[productInCartIndex].qty++
      } else {
        const newItem = {
          productId: productData.id,
          title: productData.title,
          image: productData.image,
          price: productData.price,
          qty: 1,
        }
        this.items.push(newItem)
      }
      this.qty++
      this.total += productData.price
    },

    removeProductFromCart(prodId: string) {
      const productInCartIndex = this.items.findIndex(
        (cartItem) => cartItem.productId === prodId
      )
      const prodData = this.items[productInCartIndex]
      this.items.splice(productInCartIndex, 1)
      this.qty -= prodData.qty
      this.total -= prodData.price * prodData.qty
    },
  },
})
