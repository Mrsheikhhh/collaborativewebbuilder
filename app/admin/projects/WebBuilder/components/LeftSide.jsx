import TextProperties from "../properties/TextProperties";
import DivProperties from "../properties/DivProperties";
import ImageProperties from "../properties/ImageProperties";
import HeadingProperties from "../properties/HeadingPropeties";
import FormProperties from "../properties/FormProperties";
import { RoomProvider, useMutation } from "@liveblocks/react";
export default function LeftSide({ selectedElement, updateElement }) {
  const updateLiveElement = useMutation(({ storage }, elementId, updates) => {
    const elements = storage.get("liveblocksElements") || [];

    console.log(elementId);

    const elementIndex = elements.findIndex((el) => el.id === elementId);

    if (elementIndex !== -1) {
      const updatedElement = { ...elements[elementIndex], ...updates };
      elements[elementIndex] = updatedElement;
      storage.set("liveblocksElements", [...elements]);

      console.log("Updated Element:", updatedElement);
    }
  }, []);

  return (
    <div className="p-4">
      {selectedElement && selectedElement.type === "text" && (
        <TextProperties
          selectedElement={selectedElement}
          updateElement={updateElement}
          updateLiveElement={updateLiveElement}
        />
      )}
      {selectedElement && selectedElement.type === "div" && (
        <DivProperties
          selectedElement={selectedElement}
          updateElement={updateElement}
          updateLiveElement={updateLiveElement}
        />
      )}
      {selectedElement && selectedElement.type === "image" && (
        <ImageProperties
          selectedElement={selectedElement}
          updateElement={updateElement}
          updateLiveElement={updateLiveElement}
        />
      )}
      {selectedElement && selectedElement.type === "heading" && (
        <HeadingProperties
          selectedElement={selectedElement}
          updateElement={updateElement}
          updateLiveElement={updateLiveElement}
        />
      )}
      {selectedElement && selectedElement.type === "form" && (
        <FormProperties
          selectedElement={selectedElement}
          updateElement={updateElement}
          updateLiveElement={updateLiveElement}
        />
      )}
    </div>
  );
}
