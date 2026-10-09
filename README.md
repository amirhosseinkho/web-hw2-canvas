> Persian version: [README.fa.md](README.fa.md)

# Simple drawing tool with React

## Introduction

This project is an interactive drawing tool built with React.js and modern JavaScript (ES6+). Its goal is a complete user interface for drawing shapes, with drag and drop, undo/redo, color selection and size adjustment.

## Implemented features

### Main interface

The app has four main parts:

1. **Header**: an input field for the drawing title, the Undo/Redo buttons, and the Import and Export buttons
2. **Sidebar**: drawing tools, color selection and size adjustment
3. **Canvas**: the main area for drawing and moving shapes
4. **Footer**: counts of each shape type

### Drawing tools

Six shape types are implemented:

- Circle: CSS `border-radius`
- Square: CSS `width` and `height`
- Triangle: CSS border properties
- Star: SVG `polygon`
- Heart: SVG `path`
- Diamond: SVG `polygon`

### Color selection

The color picker offers 10 preset colors:

- Red (#e74c3c)
- Blue (#3498db)
- Orange (#f39c12)
- Green (#2ecc71)
- Purple (#9b59b6)
- Dark orange (#e67e22)
- Turquoise (#1abc9c)
- Dark gray (#34495e)
- Yellow (#f1c40f)
- Pink (#e91e63)

### Size adjustment

A slider sets the shape size from 20 to 100 pixels, giving precise control over shape size.

### Drag and drop

Shapes are moved with mouse event handlers:

- `onMouseDown`: starts the drag
- `onMouseMove`: moves the shape
- `onMouseUp`: ends the drag
- an offset is computed so the shape moves precisely with the pointer

### Undo/Redo

Undo and redo use an operation history:

- every drawing state is saved in a `history` array
- an index tracks the current position in the history
- undo/redo operations themselves are not added to the history

### Import/Export

Drawings are saved and loaded as JSON:

- Export: converts the drawing to JSON and downloads the file
- Import: reads a JSON file and rebuilds the drawing
- loading errors are handled

## File structure

### Main components

**App.jsx**: the main component, which holds all state management and logic:
- state for the shapes, the selected tool, the color and the size
- the undo/redo logic
- import/export operations

**Header.jsx**: the app header, with:
- the drawing title input
- the `UndoRedo` component
- the Import and Export buttons

**Sidebar.jsx**: the sidebar, with:
- the drawing tools section
- the `ColorPicker` component
- the `SizeSlider` component

**Canvas.jsx**: the drawing canvas, which:
- handles drag-and-drop events
- renders the shapes
- computes exact positions

### Helper components

**ShapeButton.jsx**: drawing tool buttons
- renders an SVG icon for each shape
- handles the active/inactive state

**ColorPicker.jsx**: color selection
- shows the available colors in a grid
- tracks the active color

**SizeSlider.jsx**: size adjustment
- an HTML5 slider with custom styling
- shows the current value

**UndoRedo.jsx**: undo and redo buttons
- handles the enabled/disabled state
- shows the matching icons

**Shape.jsx**: the shape component
- renders the different shapes with CSS and SVG
- applies dynamic styles
- supports drag and drop

**Footer.jsx**: the page footer
- shows shape statistics
- renders the `ShapeCount` components

**ShapeCount.jsx**: the count for each shape
- renders the icon and the count
- supports every shape type

## Technologies

### Front end

- **React.js 18.2.0**: the UI library
- **JavaScript ES6+**: arrow functions, destructuring, spread operator
- **CSS3**: Flexbox, Grid, transitions, animations
- **HTML5**: semantic elements and modern APIs

### Implementation details

- **State management**: `useState` and `useCallback` for efficient updates
- **Event handling**: mouse event handling for drag and drop
- **File API**: `FileReader` for import/export
- **SVG**: rendering complex shapes such as the star and the heart

## Algorithms

### Undo/Redo

```javascript
const addToHistory = useCallback((newShapes) => {
  if (!isUndoRedoAction.current) {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newShapes);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }
  isUndoRedoAction.current = false;
}, [historyIndex]);
```

### Drag and drop

```javascript
const handleShapeDragStart = (event, shapeId) => {
  const rect = canvasRef.current.getBoundingClientRect();
  const shape = shapes.find(s => s.id === shapeId);
  if (shape) {
    setDraggedShape(shapeId);
    setDragOffset({
      x: event.clientX - rect.left - shape.x,
      y: event.clientY - rect.top - shape.y
    });
  }
};
```

### Shape rendering

Each shape is rendered in its own way:

- simple shapes (circle, square): CSS properties
- the triangle: the CSS border trick
- SVG shapes (star, heart, diamond): SVG elements

## Data format

### Shape object

```javascript
{
  type: "circle|square|triangle|star|heart|diamond",
  x: number,        // X position
  y: number,        // Y position
  color: string,    // hex color code
  size: number,     // size in pixels
  id: number        // unique id
}
```

### JSON file format

```json
{
  "title": "Drawing title",
  "shapes": [
    {
      "type": "circle",
      "x": 120,
      "y": 80,
      "color": "#e74c3c",
      "size": 60,
      "id": 1234567890
    }
  ]
}
```

## Optimizations

### Performance

- `useCallback` to avoid unnecessary re-renders
- `useRef` to hold the drag state
- lightweight event handlers

### Code organization

- components split by responsibility
- data passed down through props
- state kept at the appropriate level

### User experience

- smooth animations for interactions
- visual feedback for actions
- error handling

## Running the project

### Prerequisites

- Node.js 14 or newer
- npm or yarn

### Setup

```bash
# Clone the project
git clone https://github.com/amirhosseinkho/web-hw2-canvas.git
cd web-hw2-canvas

# Install dependencies
npm install

# Start the app
npm start
```

The app runs at `http://localhost:3000`.

## Usage

The interface labels are in Persian; English equivalents are given below.

### Drawing a shape

1. Choose a tool in the sidebar.
2. Set the color and size.
3. Click on the canvas where the shape should go.

### Moving a shape

- Press and hold on the shape.
- Drag it to the new position.
- Release to place it.

### Deleting a shape

- Double-click the shape.

### Undo/Redo

- Use the ↶ and ↷ buttons in the header.
- Undo returns to the previous state.
- Redo repeats an undone operation.

### Saving and loading

- Export: click "خروجی گرفتن" (Export) to download a JSON file.
- Import: click "وارد کردن" (Import) and choose a JSON file.

## Problems solved

### Drag and drop

- precise offset calculation so shapes move naturally
- keeping shapes inside the canvas boundary
- avoiding interference with click events

### Undo/Redo

- correct management of the history stack
- keeping undo/redo operations out of the history
- limiting memory use

### Shape rendering

- complex shapes implemented with SVG
- responsive sizing
- correct proportions

## Conclusion

The project implements all the requested features:

- smooth drag and drop
- reliable undo/redo
- flexible color and size selection
- a variety of drawing tools
- import/export in a standard format (JSON)

The code is modular and maintainable and follows common React practices.
