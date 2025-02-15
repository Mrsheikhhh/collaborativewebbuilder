"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children }) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_NO5DfnrhOqZEHH_n1MsB3lH2i_8aePmG1DBBEjSEmbFMHs7pl8LxwX7zhcsYNIgj"}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}