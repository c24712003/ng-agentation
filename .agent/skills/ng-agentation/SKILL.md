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

3. **Add Component to Template**
   - Add the `<ag-agentation>` component to your `app.component.html` (or root template).
   - This single component handles the toolbar, overlay, settings, and state management.
   - Ideally, show it only in development mode.

   ```html
   <!-- Your App Content -->
   <router-outlet></router-outlet>

   <!-- NgAgentation Tool -->
   <ag-agentation *ngIf="isDevMode"></ag-agentation>
   ```

4. **Verify Setup**
   - Run the app and check if the toolbar appears.
   - Click the play button (▶) to start recording.
   - Click on elements to add markers.

## Notes

- The `<ag-agentation>` component encapsulates all state logic (recording, markers, settings).
- Ensure Styles are imported if not automatically included by the library build.
