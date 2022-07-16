import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  cartTotal: number = 0;
  success:boolean=false
  constructor(private _ApiService:ApiService) {}

  ngOnInit(): void {
    this.viewAllCart();
  }

  viewAllCart() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      console.log(this.cartProducts);
    }
    this.getCartTotal();
  }
  changeQuantity() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }
  delete(index: any) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  clearAll() {
    this.cartProducts = [];
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  getCartTotal() {
    this.cartTotal = 0;
    for (let index in this.cartProducts) {
      this.cartTotal +=
        this.cartProducts[index].item.price * this.cartProducts[index].quantity;
    }
  }

  addOrder() {
    let product = this.cartProducts.map((item) => {
      return { productId: item.item.id, quantity: item.quantity };
    });
    let Model = {
      userId: 5,
      date: new Date(),
      products: product,
    };
    this._ApiService.postOrder(Model).subscribe((response)=>{
      this.success=true
    })
  }
}
