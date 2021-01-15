import { Question } from "./Question";
import Answer from "./Answer";
import { User } from "./User";

// This will give you type-checking for state.firebase.data.todos and state.firebase.ordered.todos
export interface FirestoreSchema {
  questions: Question[];
  answers: Answer[];
  users: User[];
}
