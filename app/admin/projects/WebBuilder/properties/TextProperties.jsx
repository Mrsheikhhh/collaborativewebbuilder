export default function TextProperties({ selectedElement, updateElement }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Customize Text</h3>

      <label className="block">Text:</label>
      <input
        type="text"
        className="border p-1 w-full"
        value={selectedElement.text || ""}
        onChange={(e) => updateElement(selectedElement.id,{ text: e.target.value })}
      />

      <label className="block mt-4">Horizontal Position (X):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.x || 0}
        onChange={(e) => updateElement(selectedElement.id,{ x: Number(e.target.value) })}
      />

      <label className="block mt-4">Vertical Position (Y):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.y || 0}
        onChange={(e) => updateElement(selectedElement.id,{ y: Number(e.target.value) })}
      />

      <label className="block mt-2">Font Size:</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.fontSize || 16}
        onChange={(e) => updateElement(selectedElement.id,{ fontSize: Number(e.target.value) })}
      />

      <label className="block mt-2">Font Weight:</label>
      <select
        className="border p-1 w-full"
        value={selectedElement.fontWeight || "normal"}
        onChange={(e) => updateElement(selectedElement.id,{ fontWeight: e.target.value })}
      >
        <option value="normal">Normal</option>
        <option value="bold">Bold</option>
        <option value="lighter">Lighter</option>
        <option value="bolder">Bolder</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
        <option value="400">400</option>
        <option value="500">500</option>
        <option value="600">600</option>
        <option value="700">700</option>
        <option value="800">800</option>
        <option value="900">900</option>
      </select>

      <label className="block mt-2">Font Style:</label>
      <select
        className="border p-1 w-full"
        value={selectedElement.fontStyle || "normal"}
        onChange={(e) => updateElement(selectedElement.id,{ fontStyle: e.target.value })}
      >
        <option value="normal">Normal</option>
        <option value="italic">Italic</option>
        <option value="oblique">Oblique</option>
      </select>

      <label className="block mt-2">Text Color:</label>
      <input
        type="color"
        className="w-full"
        value={selectedElement.color || "#000000"}
        onChange={(e) => updateElement(selectedElement.id,{ color: e.target.value })}
      />

      <label className="block mt-2">Background Color:</label>
      <input
        type="color"
        className="w-full"
        value={selectedElement.backgroundColor || "#ffffff"}
        onChange={(e) => updateElement(selectedElement.id,{ backgroundColor: e.target.value })}
      />

      <label className="block mt-2">Text Align:</label>
      <select
        className="border p-1 w-full"
        value={selectedElement.textAlign || "left"}
        onChange={(e) => updateElement(selectedElement.id,{ textAlign: e.target.value })}
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
        <option value="justify">Justify</option>
      </select>

      <label className="block mt-2">Letter Spacing (px):</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.letterSpacing || 0}
        onChange={(e) => updateElement(selectedElement.id,{ letterSpacing: Number(e.target.value) })}
      />

      <label className="block mt-2">Line Height:</label>
      <input
        type="number"
        className="border p-1 w-full"
        value={selectedElement.lineHeight || 1.5}
        onChange={(e) => updateElement(selectedElement.id,{ lineHeight: Number(e.target.value) })}
      />

      <label className="block mt-2">Text Decoration:</label>
      <select
        className="border p-1 w-full"
        value={selectedElement.textDecoration || "none"}
        onChange={(e) => updateElement(selectedElement.id,{ textDecoration: e.target.value })}
      >
        <option value="none">None</option>
        <option value="underline">Underline</option>
        <option value="overline">Overline</option>
        <option value="line-through">Line-through</option>
      </select>
    </div>
  );
}
