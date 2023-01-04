import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  mode = 'date';
  date: Date = new Date();
  
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.onSelectChange(this.mode);
  }

  onSelectChange(event : any): void {
    this.mode = event;
    this.onOpenChange(false);
  } 

  onOpenChange(event: boolean) : void {
    if(!event) {
      this.productsService.getProductStatistics(this.date).subscribe({
        next: (data) => {
          console.log(data);
          
        },
        error: (error) => {console.log(error);}
      });
    }
  }



}
