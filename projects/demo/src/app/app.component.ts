import { Component } from '@angular/core';
import {
  ComponentNode,
  MarkerAnnotation,
  RecordingSession,
  AgentationSettings,
  ToolbarState,
  DEFAULT_SETTINGS,
  UserAnnotation,
} from 'ng-agentation';
import { PromptGeneratorService } from 'ng-agentation';

@Component({
  selector: 'demo-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-agentation Demo';

  /** 設定 */
  settings: AgentationSettings = { ...DEFAULT_SETTINGS };

  /** 工具列狀態 */
  toolbarState: ToolbarState = {
    showSettings: false,
    showMarkers: false,
    isRecording: false,
    isMinimized: false,
  };

  /** 錄製會話 */
  session: RecordingSession = {
    id: this.generateId(),
    markers: [],
    startTime: 0,
    isRecording: false,
  };

  /** 選中的組件節點（兼容舊版 AnnotationPanel） */
  selectedNode: ComponentNode | null = null;

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

  constructor(private promptGenerator: PromptGeneratorService) { }

  // ==================== 工具列事件 ====================

  /** 開始錄製 */
  onStartRecording(): void {
    this.session = {
      id: this.generateId(),
      markers: [],
      startTime: Date.now(),
      isRecording: true,
    };
    this.toolbarState.isRecording = true;
    this.toolbarState.showSettings = false;
    this.toolbarState.showMarkers = false;
  }

  /** 停止錄製 */
  onStopRecording(): void {
    this.session.isRecording = false;
    this.session.endTime = Date.now();
    this.toolbarState.isRecording = false;
  }

  /** 切換顯示標記列表 */
  onToggleMarkers(): void {
    this.toolbarState.showMarkers = !this.toolbarState.showMarkers;
    if (this.toolbarState.showMarkers) {
      this.toolbarState.showSettings = false;
    }
  }

  /** 複製到剪貼簿 */
  async onCopyToClipboard(): Promise<void> {
    if (this.session.markers.length === 0) return;

    const markdown = this.generateMultiMarkerOutput();

    try {
      await navigator.clipboard.writeText(markdown);
      console.log('[Demo] Copied to clipboard');

      if (this.settings.clearOnCopy) {
        this.onClearMarkers();
      }
    } catch (err) {
      console.error('[Demo] Failed to copy:', err);
    }
  }

  /** 清除所有標記 */
  onClearMarkers(): void {
    this.session.markers = [];
  }

  /** 切換設定面板 */
  onToggleSettings(): void {
    this.toolbarState.showSettings = !this.toolbarState.showSettings;
    if (this.toolbarState.showSettings) {
      this.toolbarState.showMarkers = false;
    }
  }

  /** 關閉工具列 */
  onCloseToolbar(): void {
    this.toolbarState.isRecording = false;
    this.toolbarState.showSettings = false;
    this.toolbarState.showMarkers = false;
    this.session.markers = [];
  }

  /** 切換最小化 */
  onToggleMinimize(): void {
    this.toolbarState.isMinimized = !this.toolbarState.isMinimized;
  }

  /** 設定變更 */
  onSettingsChange(newSettings: AgentationSettings): void {
    // 如果顏色有變更，更新所有已存在的 markers
    if (newSettings.markerColor !== this.settings.markerColor) {
      this.session.markers = this.session.markers.map((m: MarkerAnnotation) => ({
        ...m,
        color: newSettings.markerColor,
      }));
    }
    this.settings = newSettings;
  }

  // ==================== 標記事件 ====================

  /** 新增標記 */
  onMarkerAdded(node: ComponentNode): void {
    const marker: MarkerAnnotation = {
      index: this.session.markers.length + 1,
      target: node,
      intent: '',
      color: this.settings.markerColor,
      timestamp: Date.now(),
    };
    this.session.markers = [...this.session.markers, marker];
    console.log('[Demo] Marker added:', marker);
  }

  /** 刪除標記 */
  onDeleteMarker(index: number): void {
    this.session.markers = this.session.markers
      .filter((m: MarkerAnnotation) => m.index !== index)
      .map((m: MarkerAnnotation, i: number) => ({ ...m, index: i + 1 }));
  }

  /** 更新標記意圖 */
  onUpdateIntent(event: { index: number; intent: string }): void {
    this.session.markers = this.session.markers.map((m: MarkerAnnotation) =>
      m.index === event.index ? { ...m, intent: event.intent } : m
    );
  }

  /** 跳轉到標記 */
  onScrollToMarker(index: number): void {
    const marker = this.session.markers.find((m: MarkerAnnotation) => m.index === index);
    if (marker) {
      marker.target.domElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  // ==================== 兼容舊版 ====================

  /** 處理組件選擇（兼容舊版 AnnotationPanel） */
  onComponentSelected(node: ComponentNode): void {
    this.selectedNode = node;
  }

  /** 處理面板關閉 */
  onPanelClosed(): void {
    this.selectedNode = null;
  }

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

  // ==================== 輔助方法 ====================

  /** 生成多標記輸出 */
  private generateMultiMarkerOutput(): string {
    const markers = this.session.markers.map((marker: MarkerAnnotation) => ({
      target: marker.target,
      intent: marker.intent || '',
    }));

    return this.promptGenerator.generatePageFeedback(markers, {
      outputDetail: this.settings.outputDetail,
      pageUrl: window.location.href,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    });
  }

  /** 生成唯一 ID */
  private generateId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
