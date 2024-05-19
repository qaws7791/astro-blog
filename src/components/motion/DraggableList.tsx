import * as React from "react";
import { motion } from "framer-motion";
type Item = {
  id: number;
  title: string;
  description: string;
};

type Section = {
  id: number;
  title: string;
  items: Item[];
};

type List = {
  title: string;
  description: string;
  sections: Section[];
};

const LIST_SECTIONS: Section[] = [
  {
    id: 1,
    title: "Action",
    items: [
      {
        id: 1,
        title: "The Dark Knight",
        description: "A movie about Batman",
      },
      {
        id: 2,
        title: "Inception",
        description: "A movie about dreams",
      },
    ],
  },
  {
    id: 2,
    title: "Comedy",
    items: [
      {
        id: 3,
        title: "Superbad",
        description: "A movie about high school",
      },
      {
        id: 4,
        title: "Step Brothers",
        description: "A movie about step brothers",
      },
    ],
  },
  {
    id: 3,
    title: "Drama",
    items: [
      {
        id: 5,
        title: "The Shawshank Redemption",
        description: "A movie about prison",
      },
      {
        id: 6,
        title: "Forrest Gump",
        description: "A movie",
      },
    ],
  },
];

const DUMMY_LIST: List = {
  title: "Favorite Movies",
  description: "A list of my favorite movies",
  sections: LIST_SECTIONS,
};

export default function DraggableList() {
  const [list, setList] = React.useState<List>(DUMMY_LIST);

  const moveItem = (
    itemId: number,
    targetSectionId: number,
    targetIndex: number
  ): void => {
    const { sections } = list;

    const updateSectionItems = (section: Section): Section => {
      const { id, title, items } = section;
      const updatedItems = items.filter((item) => item.id !== itemId);

      if (id === targetSectionId) {
        const movedItem = sections
          .flatMap((s) => s.items)
          .find((item) => item.id === itemId)!;
        updatedItems.splice(targetIndex, 0, movedItem);
      }

      return { id, title, items: updatedItems };
    };

    const updatedSections = sections.map(updateSectionItems);

    setList({ ...list, sections: updatedSections });
  };

  return (
    <div className="w-full max-w-md h-full flex flex-col">
      <h1 className="text-xl font-bold text-neutral-900 m-0">{list.title}</h1>
      <p className="text-neutral-400 m-0">{list.description}</p>
      <div className="flex-auto overflow-y-auto">
        {list.sections.map((section) => (
          <Section key={section.id} section={section} moveItem={moveItem} />
        ))}
      </div>
    </div>
  );
}

function Section({
  section,
  moveItem,
}: {
  section: Section;
  moveItem: (itemId: number, toSectionId: number, toIndex: number) => void;
}) {
  const [active, setActive] = React.useState(false);

  const highlightIndicator = (e: React.DragEvent) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const element = getNearestIndicator(e, indicators);
    element.style.opacity = "1";
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll<HTMLElement>(`[data-section="${section.id}"]`)
    );
  };

  const getNearestIndicator = (
    e: React.DragEvent,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_THRESHOLD = 45;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_THRESHOLD);

        return offset < 0 && offset > closest.offset
          ? { offset: offset, element: child }
          : closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el.element;
  };

  const clearHighlights = (elements: HTMLElement[]) => {
    elements.forEach((el) => {
      el.style.opacity = "0";
    });
  };

  const handleDragStart = (
    e: MouseEvent | TouchEvent | PointerEvent,
    item: Item
  ) => {
    const event = e as unknown as DragEvent;
    event?.dataTransfer?.setData("itemId", item.id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    clearHighlights(getIndicators());
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setActive(false);
    clearHighlights(getIndicators());

    const itemId = e.dataTransfer.getData("itemId");
    if (!itemId) return;
    const element = getNearestIndicator(e, getIndicators());
    const before = element.dataset.after || "0";
    const sectionId = element.dataset.section;

    const index = section.items
      .filter((item) => item.id !== Number(itemId))
      .findIndex((item) => item.id === Number(before));

    const toIndex = index === -1 ? section.items.length : index;

    moveItem(Number(itemId), Number(sectionId), toIndex);
  };

  return (
    <div key={section.id} className="p-1">
      <h2 className="text-lg font-bold text-neutral-800 m-0">
        {section.title}
      </h2>
      <ul
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`p-1 ${active ? "bg-black/10 rounded" : "bg-transparent"}`}
      >
        {section.items.map((item) => (
          <Item
            key={item.id}
            item={item}
            sectionId={section.id}
            handleDragStart={handleDragStart}
          />
        ))}
        <DropIndicator afterId={0} sectionId={section.id} />
      </ul>
    </div>
  );
}

function Item({
  item,
  sectionId,
  handleDragStart,
}: {
  item: Item;
  sectionId: number;
  handleDragStart: (
    e: MouseEvent | TouchEvent | PointerEvent,
    item: Item
  ) => void;
}) {
  return (
    <>
      <DropIndicator afterId={item.id} sectionId={sectionId} />
      <motion.div
        layout
        layoutId={item.id.toString()}
        data-id={item.id}
        onDragStart={(e) => handleDragStart(e, item)}
        draggable="true"
        key={item.id}
        className="bg-orange-100 border border-neutral-300 rounded-md cursor-grab active:cursor-grabbing"
      >
        <h3 className="text-base font-bold m-0 p-1">{item.title}</h3>
        <p className="text-neutral-400 text-sm m-0 p-1">{item.description}</p>
      </motion.div>
    </>
  );
}

function DropIndicator({
  afterId,
  sectionId,
}: {
  afterId: number;
  sectionId: number;
}) {
  return (
    <div
      data-after={afterId || 0}
      data-section={sectionId}
      className="my-0.5 h-0.5 w-full bg-red-600 opacity-0  pointer-events-none"
    />
  );
}
