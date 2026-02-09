[![NgAgentation](agentation/Gemini_Generated_Image_p48c2hp48c2hp48c.png)](https://youtu.be/R-XgEhFngi4) 

# NgAgentation

[![npm version](https://img.shields.io/npm/v/ng-agentation.svg)](https://www.npmjs.com/package/ng-agentation)
[![npm downloads](https://img.shields.io/npm/dm/ng-agentation.svg)](https://www.npmjs.com/package/ng-agentation)

Angular implementation of Agentation for visual DOM inspection and annotation. It provides an overlay-driven marker flow, component metadata extraction, and structured prompt output for page feedback.

## Features
- Visual overlay to mark components or DOM nodes
- Marker list, intent editing, and clipboard export
- Angular component metadata extraction (inputs/outputs/properties)
- Prompt output detail levels (compact, standard, detailed, forensic)

## Installation
```bash
npm install ng-agentation
```

## Quick start
Import the module in your root module and place the agentation component once in your app.

```ts
// app.module.ts
import { NgAgentationModule } from 'ng-agentation';

@NgModule({
  imports: [
    NgAgentationModule.forRoot(),
  ],
})
export class AppModule {}
```

```html
<!-- app.component.html -->
<ag-agentation></ag-agentation>
```

## Exported API
### Module
- `NgAgentationModule`

### Components
- `ag-agentation`
- `ag-overlay`
- `ag-toolbar`
- `ag-markers-panel`
- `ag-settings-panel`
- `ag-annotation-panel`
- `ag-inline-editor`

### Services
- `ComponentWalkerService`
- `DataSanitizerService`
- `PromptGeneratorService`
- `McpService`

### Models
- `ComponentNode`, `MarkerAnnotation`, `RecordingSession`
- `AgentationSettings`, `ToolbarState`
- `OutputDetail`, `MarkerColor`, `DEFAULT_SETTINGS`, `MARKER_COLORS`

## Build & test
```bash
ng build ng-agentation
ng test
```

## Publishing
```bash
ng build ng-agentation
cd dist/ng-agentation
npm publish
```

## Compatibility
Peer dependencies:
- `@angular/core` and `@angular/common` >=14 <20

## License
MIT
