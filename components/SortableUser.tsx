import { User } from "@/data/users";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export default function SortableUser({ user }: { user: User }) {
  const { listeners, transform, transition, attributes, setNodeRef } =
    useSortable({ id: user.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="flex items-center border-b border-gray-200 py-2 px-4 touch-action-none touch-action-none"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
        {user.initials}
      </div>
      <div className="ml-4 text-gray-700">
        {user.name} - {user.id}
      </div>
    </li>
  );
}
