import {EntryOptions} from "@/types";
import {createConditionTree} from "./createConditionTree";

export const normalize = (entry: EntryOptions) => {
  const conditionTree = createConditionTree(entry);
  conditionTree
};


