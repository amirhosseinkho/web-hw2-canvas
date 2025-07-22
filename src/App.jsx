import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [title, setTitle] = useState('نقاشی جدید');
  const [selectedTool, setSelectedTool] = useState('circle');
  const [selectedColor, setSelectedColor] = useState('#e74c3c');
  const [size, setSize] = useState(60);
  const [shapes, setShapes] = useState([]);
  
  // Undo/Redo functionality
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isUndoRedoAction = useRef(false);

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

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      setHistoryIndex(prev => prev - 1);
      setShapes(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      setHistoryIndex(prev => prev + 1);
      setShapes(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const handleCanvasClick = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - size/2; // Center the shape
    const y = event.clientY - rect.top - size/2;
    
    const newShape = {
      type: selectedTool,
      x: x,
      y: y,
      color: selectedColor,
      size: size,
      id: Date.now() + Math.random()
    };
    
    const newShapes = [...shapes, newShape];
    setShapes(newShapes);
    addToHistory(newShapes);
  }, [selectedTool, selectedColor, size, shapes, addToHistory]);

  const removeShape = useCallback((shapeId) => {
    const newShapes = shapes.filter(shape => shape.id !== shapeId);
    setShapes(newShapes);
    addToHistory(newShapes);
  }, [shapes, addToHistory]);

  const handleShapeMove = useCallback((shapeId, newX, newY) => {
    const newShapes = shapes.map(shape => 
      shape.id === shapeId 
        ? { ...shape, x: Math.max(0, newX), y: Math.max(0, newY) }
        : shape
    );
    setShapes(newShapes);
  }, [shapes]);

  const handleExport = () => {
    const data = {
      title: title,
      shapes: shapes
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'drawing'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setTitle(data.title || 'نقاشی وارد شده');
          const importedShapes = data.shapes || [];
          setShapes(importedShapes);
          addToHistory(importedShapes);
        } catch (error) {
          alert('خطا در خواندن فایل: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const shapeCounts = {
    circle: shapes.filter(shape => shape.type === 'circle').length,
    square: shapes.filter(shape => shape.type === 'square').length,
    triangle: shapes.filter(shape => shape.type === 'triangle').length,
    star: shapes.filter(shape => shape.type === 'star').length,
    heart: shapes.filter(shape => shape.type === 'heart').length,
    diamond: shapes.filter(shape => shape.type === 'diamond').length
  };

  return (
    <div className="app">
      <Header 
        title={title}
        onTitleChange={setTitle}
        onExport={handleExport}
        onImport={handleImport}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />
      <div className="main-content">
        <Sidebar 
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          size={size}
          onSizeChange={setSize}
        />
        <Canvas 
          shapes={shapes}
          onCanvasClick={handleCanvasClick}
          onShapeDoubleClick={removeShape}
          onShapeMove={handleShapeMove}
        />
      </div>
      <Footer shapeCounts={shapeCounts} />
    </div>
  );
}

export default App; 