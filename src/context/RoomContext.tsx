// src/context/RoomContext.tsx
import React, { createContext, useContext, useState } from 'react';

type RoomMap = Map<string, string[]>;

interface RoomContextType {
  rooms: RoomMap;
  addUserToRoom: (room: string, user: string) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<RoomMap>(new Map());

  const addUserToRoom = (room: string, user: string) => {
    setRooms(prev => {
      const updated = new Map(prev);
      const users = updated.get(room) || [];
      updated.set(room, [...users, user]);
      return updated;
    });
  };

  return (
    <RoomContext.Provider value={{ rooms, addUserToRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};