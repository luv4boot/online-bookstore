import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartItems: CartItem[]=[];
  totalPrice: Subject<number>=new Subject<number>();
  totalQuantity: Subject<number>=new Subject<number>();

  constructor() {
    
  }

  addToCart(theCartItem: CartItem){
    let aleradyExistsInCart: boolean=false;
    let existingCartItem: CartItem=undefined;

    if(this.cartItems.length > 0){
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      aleradyExistsInCart= (existingCartItem != undefined)
    }

    if(aleradyExistsInCart){
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }

    this.calculateTotalPrice();
  }
  calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    console.log(`Total price: ${totalPriceValue}, Total quantity: ${totalQuantityValue}`);
    
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if(cartItem.quantity === 0){
      this.remove(cartItem);
    }
    else{
      this.calculateTotalPrice();
    }

  }

  remove(cartItem: CartItem){
    const itemIndex= this.cartItems.findIndex((tempCartItem) => tempCartItem.id === cartItem.id);

    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1);
      this.calculateTotalPrice();
    }
  }
}
