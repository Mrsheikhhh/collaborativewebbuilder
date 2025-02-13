import TextProperties from "../properties/TextProperties";
import DivProperties from "../properties/DivProperties";
import ImageProperties from "../properties/ImageProperties";
import HeadingProperties from "../properties/HeadingPropeties";
import FormProperties from "../properties/FormProperties";

export default function LeftSide({ selectedElement, updateElement }) {
 
  if (!selectedElement) return <p className="p-4">Select an element to customize</p>;

  return (
    <div className="p-4">
      {selectedElement.type === "text" && (
        <TextProperties selectedElement={selectedElement} updateElement={updateElement} />
      )}
      {selectedElement.type === "div" && (
        <DivProperties selectedElement={selectedElement} updateElement={updateElement} />
      )}
       {selectedElement.type === "image" && (
        <ImageProperties selectedElement={selectedElement} updateElement={updateElement} />
      )}
      {selectedElement.type === "heading" && (
        <HeadingProperties selectedElement={selectedElement} updateElement={updateElement} />
      )}
       {selectedElement.type === "form" && (
        <FormProperties selectedElement={selectedElement} updateElement={updateElement} />
      )}
    </div>
  );
}
