import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  products: Product[] = [];
  productCount: number = 0;
  brands: Brand[] = [];
  types: Type[] = [];
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = 'name';
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]


  constructor(private shopService: ShopService) {

  }
  ngOnInit(): void {
    this.getProduct();
    this.getBrands();
    this.getTypes();
}

  getProduct(){
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe({
      next: response => (
        this.products = response.data,
        this.productCount = response.count
        ),
      error: (error) => console.log(error),
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id: 0, name: 'All'}, ...response],
      error: (error) => console.log(error),
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id: 0, name: 'All'}, ...response],
      error: (error) => console.log(error),
    })
  }

  onBrandSelected(brandId: number){
    this.brandIdSelected = brandId;
    this.getProduct();
  }

  onTypeSelected(typeId: number){
    this.typeIdSelected = typeId;
    this.getProduct();
  }

  onSortSelected(event: any){
    this.sortSelected = event.target.value;
    this.getProduct();
  }

}
