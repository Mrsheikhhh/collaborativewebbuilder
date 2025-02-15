export default function DivProperties({ selectedElement, updateElement, updateLiveElement }) {
  const handleUpdate = (updates) => {
    updateElement(selectedElement.id, updates);
    console.log(selectedElement.id)
    updateLiveElement(selectedElement.id, updates); // Liveblocks update
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Customize Div</h3>

      <label className="block">Width (px):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.width || 100}
        onChange={(e) => handleUpdate({ width: Number(e.target.value) })}
      />

      <label className="block mt-2">Height (px):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.height || 100}
        onChange={(e) => handleUpdate({ height: Number(e.target.value) })}
      />

      <label className="block mt-2">Background Color:</label>
      <input
        type="color"
        className="w-full"
        value={selectedElement.backgroundColor || "#ffffff"}
        onChange={(e) => handleUpdate({ backgroundColor: e.target.value })}
      />

      <label className="block mt-2">Border Color:</label>
      <input
        type="color"
        className="w-full"
        value={selectedElement.borderColor || "#000000"}
        onChange={(e) => handleUpdate({ borderColor: e.target.value })}
      />

      <label className="block mt-2">Border Width (px):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.borderWidth || 1}
        onChange={(e) => handleUpdate({ borderWidth: Number(e.target.value) })}
      />

      <label className="block mt-2">Border Radius (px):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.borderRadius || 0}
        onChange={(e) => handleUpdate({ borderRadius: Number(e.target.value) })}
      />

      <label className="block mt-2">Padding (px):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.padding || 0}
        onChange={(e) => handleUpdate({ padding: Number(e.target.value) })}
      />

      <label className="block mt-2">Margin (px):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.margin || 0}
        onChange={(e) => handleUpdate({ margin: Number(e.target.value) })}
      />

      <label className="block mt-2">Box Shadow:</label>
      <input
        type="text"
        className="border p-1 w-full"
        placeholder="e.g., 5px 5px 10px rgba(0,0,0,0.3)"
        value={selectedElement.boxShadow || ""}
        onChange={(e) => handleUpdate({ boxShadow: e.target.value })}
      />

      <label className="block mt-2">Display:</label>
      <select
        className="border p-1 w-full"
        value={selectedElement.display || "block"}
        onChange={(e) => handleUpdate({ display: e.target.value })}
      >
        <option value="block">Block</option>
        <option value="inline-block">Inline-Block</option>
        <option value="flex">Flex</option>
        <option value="grid">Grid</option>
        <option value="inline">Inline</option>
      </select>

      <label className="block mt-2">Position:</label>
      <select
        className="border p-1 w-full"
        value={selectedElement.position || "static"}
        onChange={(e) => handleUpdate({ position: e.target.value })}
      >
        <option value="static">Static</option>
        <option value="relative">Relative</option>
        <option value="absolute">Absolute</option>
        <option value="fixed">Fixed</option>
      </select>

      <label className="block mt-2">Left (px):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.x || 0}
        onChange={(e) => handleUpdate({ x: Number(e.target.value) })}
      />

      <label className="block mt-2">Top (px):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.y || 0}
        onChange={(e) => handleUpdate({ y: Number(e.target.value) })}
      />

      <label className="block mt-2">Overflow:</label>
      <select
        className="border p-1 w-full"
        value={selectedElement.overflow || "visible"}
        onChange={(e) => handleUpdate({ overflow: e.target.value })}
      >
        <option value="visible">Visible</option>
        <option value="hidden">Hidden</option>
        <option value="scroll">Scroll</option>
        <option value="auto">Auto</option>
      </select>

      <label className="block mt-2">Opacity (0-1):</label>
      <input
        type="number"
        step="0.1"
        className="border p-1 w-full"
        value={selectedElement.opacity || 1}
        onChange={(e) => handleUpdate({ opacity: Number(e.target.value) })}
      />
    </div>
  );
}
