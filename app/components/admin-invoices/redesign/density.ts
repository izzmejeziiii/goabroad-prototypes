"use client";

import { createContext, useContext } from "react";

/* The items list in a narrow column (the "With preview" layout): run dates
   move under the product name, the item and add-placement fields stack,
   and the action bar puts its buttons on their own row. A flag rather than
   container queries, which would make the panels contain fixed-position
   children (the location picker's click-outside layer). */

export const CompactContext = createContext(false);

export const useCompact = () => useContext(CompactContext);
