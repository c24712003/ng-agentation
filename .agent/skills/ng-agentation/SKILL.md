---
name: ng-agentation
description: Add ng-agentation visual feedback tools to an Angular 19+ project
---

# NgAgentation Setup

Set up the NgAgentation annotation toolbar in this project.

## Steps

1. **Check if already installed**
   - Look for `ng-agentation` in package.json dependencies (or check `projects/ng-agentation`)
   - If using as a library, ensure it is built/linked.

2. **Import the Module**
   - In your root module (e.g., `app.module.ts`), import `NgAgentationModule`:
     ```typescript
     import { NgAgentationModule } from 'ng-agentation';

     @NgModule({
       imports: [
         NgAgentationModule.forRoot(),
         // ...
       ],
       // ...
     })
     export class AppModule {}
     ```

3. **Add Component Logic**
   - In your root component (e.g., `app.component.ts`), initialize the necessary state and event handlers.
   - You need to manage `session`, `settings`, and `toolbarState`.
   
   ```typescript
   import { Component } from '@angular/core';
   import {
     ComponentNode,
     MarkerAnnotation,
     RecordingSession,
     AgentationSettings,
     ToolbarState,
     DEFAULT_SETTINGS,
     PromptGeneratorService
   } from 'ng-agentation';

   @Component({ ... })
   export class AppComponent {
     // State
     settings: AgentationSettings = { ...DEFAULT_SETTINGS };
     toolbarState: ToolbarState = {
       showSettings: false,
       showMarkers: false,
       isRecording: false,
       isMinimized: false,
     };
     session: RecordingSession = {
       id: `session-${Date.now()}`,
       markers: [],
       startTime: 0,
       isRecording: false,
     };

     constructor(private promptGenerator: PromptGeneratorService) {}

     // Event Handlers
     onStartRecording() { /* ... set isRecording=true ... */ }
     onStopRecording() { /* ... set isRecording=false ... */ }
     onMarkerAdded(node: ComponentNode) { /* ... push to session.markers ... */ }
     onDeleteMarker(index: number) { /* ... remove from session.markers ... */ }
     // ... implement other handlers (see demo app for full logic)
   }
   ```

4. **Add Template HTML**
   - Add the following components to your `app.component.html` (or root template), outside your main router outlet:

   ```html
   <!-- NgAgentation Components -->
   
   <!-- Overlay -->
   <ag-overlay
     [markers]="session.markers"
     [settings]="settings"
     [isRecording]="toolbarState.isRecording"
     (markerAdded)="onMarkerAdded($event)"
     (markerDeleted)="onDeleteMarker($event)"
     (recordingChanged)="toolbarState.isRecording = $event"
   ></ag-overlay>

   <!-- Toolbar -->
   <ag-toolbar
     [session]="session"
     [settings]="settings"
     [state]="toolbarState"
     (startRecording)="onStartRecording()"
     (stopRecording)="onStopRecording()"
     (toggleMarkers)="onToggleMarkers()"
     (copyToClipboard)="onCopyToClipboard()"
     (clearMarkers)="onClearMarkers()"
     (toggleSettings)="onToggleSettings()"
     (toggleMinimize)="onToggleMinimize()"
     (closeToolbar)="onCloseToolbar()"
   ></ag-toolbar>

   <!-- Panels -->
   <ag-settings-panel
     *ngIf="toolbarState.showSettings"
     [settings]="settings"
     (settingsChange)="onSettingsChange($event)"
     (closed)="toolbarState.showSettings = false"
   ></ag-settings-panel>

   <ag-markers-panel
     *ngIf="toolbarState.showMarkers"
     [markers]="session.markers"
     (deleteMarker)="onDeleteMarker($event)"
     (updateIntent)="onUpdateIntent($event)"
     (scrollToMarker)="onScrollToMarker($event)"
     (closed)="toolbarState.showMarkers = false"
   ></ag-markers-panel>
   ```

5. **Verify Setup**
   - Run the app and check if the toolbar appears.
   - Ensure you can record and mark elements.

## Notes

- This manual integration is verbose. A future version may provide a single `<ng-agentation>` wrapper component.
- Ensure Styles are imported if not automatically included by the library build.
