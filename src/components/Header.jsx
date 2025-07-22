import React from 'react';
import UndoRedo from './UndoRedo';

function Header({ title, onTitleChange, onExport, onImport, onUndo, onRedo, canUndo, canRedo }) {
  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = onImport;
    input.click();
  };

  return (
    <header className="header">
      <input
        type="text"
        className="title-input"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="عنوان نقاشی را وارد کنید..."
      />
      <UndoRedo 
        onUndo={onUndo}
        onRedo={onRedo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <button onClick={handleImportClick}>
        وارد کردن
      </button>
      <button onClick={onExport}>
        خروجی گرفتن
      </button>
    </header>
  );
}

export default Header; 