"use client";
import { User, users } from "@/data/users";
import React, { useState } from "react";
import SortableUser from "./SortableUser";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function UserList() {
  const [userList, setUserList] = useState(users);
  function handleDragEnd(event: DragEndEvent) {
    console.log(event);
    const { active, over } = event;
    //Handle item replacing itself
    if (active.id === over?.id) {
      return;
    }
    setUserList((users) => {
      // Postion of the item being dragged
      const itemOriginalPos = users.findIndex((item) => item.id === active.id);
      const itemNewPos = users.findIndex((item) => item.id === over?.id);
      //Postion of the item being replace
      //Swap the and generate a new list
      return arrayMove(users, itemOriginalPos, itemNewPos);
    });
  }
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <ul className="bg-white shadow-md rounded-lg">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext items={users} strategy={verticalListSortingStrategy}>
            {userList.map((user: User) => (
              <SortableUser user={user} key={user.id} />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
    </div>
  );
}
