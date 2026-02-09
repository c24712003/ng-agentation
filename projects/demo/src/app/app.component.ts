import { Component, isDevMode } from '@angular/core';

@Component({
  selector: 'demo-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-agentation Demo';

  // Use isDevMode for the template check
  get isDevMode() {
    return isDevMode();
  }

  /** Demo 產品資料 */
  products = [
    {
      name: 'Wireless Headphones Pro',
      price: 199.99,
      originalPrice: 249.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      inStock: true,
      rating: 4.5,
      reviewCount: 128,
      tags: ['New', 'Best Seller'],
    },
    {
      name: 'Smart Watch Series X',
      price: 399.00,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      inStock: true,
      rating: 4.8,
      reviewCount: 256,
      tags: ['Premium'],
    },
    {
      name: 'Vintage Camera',
      price: 89.99,
      originalPrice: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
      inStock: false,
      rating: 4.2,
      reviewCount: 45,
      tags: ['Sale'],
    },
  ];

  /** 按鈕狀態 */
  isSubmitting = false;
  submitSuccess = false;

  constructor() { }

  // ==================== Demo 事件 ====================

  onAddToCart(event: { name: string; price: number }): void {
    console.log('[Demo] Added to cart:', event);
    alert(`Added "${event.name}" to cart! ($${event.price})`);
  }

  onAddToWishlist(name: string): void {
    console.log('[Demo] Added to wishlist:', name);
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.submitSuccess = false;

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;

      setTimeout(() => {
        this.submitSuccess = false;
      }, 2000);
    }, 2000);
  }
}
