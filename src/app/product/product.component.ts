import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';


// import { YoutubePlayerModule } from 'ngx-youtube-player';
// import { YoutubeModule } from 'angularx-youtube';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product = {
    id: null,
    type: null,
    name: null,
    brand: null,
    description: null,
    price: null,
    stock: null,
    sold: null,
    img: null,
    video: null,
    created: null,
    updated: null,
  };
  isAvailable = true;
  stock: string;
  amount: number;
  id: string;

  constructor(
    private authService: AuthService,
    private _productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getProduct();
    this.getVideo();

  }

  validateLogin() {
    if (!this.authService.isLogin()) {
      this.router.navigateByUrl('/login');
    } else {
      this.addToCart();
    }
  }

  getProduct() {
    this._productService.getProduct(this.id).subscribe(resp => {
      this.products = resp['data'];
      this.getStock();
    });
  }

  getStock() {
    if (this.products.stock > 0) {
      this.isAvailable = true;
      this.stock = 'Stock Available!';
    } else {
      this.isAvailable = false;
      this.stock = 'Out of Stock';
    }
  }

  getVideo() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.products.video);
  }

  addToCart() {
    this._productService.addToCart(this.products.id, this.amount).subscribe(
      () => {
        console.log(this.products.id);
        console.log(this.amount);
        alert('Add to Cart Completed');
        this.router.navigateByUrl('/home');
        },
      err => {
        alert('Add to Cart is Wrong');
      }
    );
  }
}
