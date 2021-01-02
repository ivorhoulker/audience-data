// import React, { useState } from "react";
// import { Category, Question } from "../types/Question";
// import { firestore, auth, timestamp } from "../Firebase";
// import firebase from "firebase/app";
// import {
//   useCollectionData,
//   useCollection,
// } from "react-firebase-hooks/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import categories from "../data/categories.json";
// import { sentenceCase } from "../helpers/sentenceCase";
// interface Props {
//   question: Question;
// }

// const schema = yup.object().shape({
//   english: yup.string().trim().required(),
//   chinese: yup.string().trim().required(),
//   category: yup.string().required(),
//   subcategory: yup.string().required(),
//   strength: yup.number().integer().positive().moreThan(0).required(),
//   multiplier: yup.number().required(),
// });
// const QuestionForm: React.FC<Props> = ({ question }) => {
//   const {
//     register,
//     handleSubmit,
//     setError,
//     errors,
//     getValues,
//   } = useForm<Question>({
//     resolver: yupResolver(schema),
//   });
//   const [category, setCategory] = useState("economics");

//   const questionsRef = firestore.collection("questions");
//   const { uid } = auth.currentUser!;
//   // const query = questionsRef.limit(9999);

//   // const [q, qLoading, qError] = useCollection(query);
//   // const questions: Question[] =
//   //   q &&
//   //   (q as firebase.firestore.QuerySnapshot).docs.map((doc) => {
//   //     return { ...(doc.data() as Question), id: doc.id };
//   //   });
//   const onSubmit = async (data: Question) => {
//     const doc = await questionsRef.doc(question.id).get();
//     const content = {
//       ...data,
//       updatedAt: timestamp(),
//       editedBy: uid,
//     };
//     console.log("content: ", content);
//     if (doc.exists) {
//       await questionsRef.doc(question.id).set(content, { merge: true });
//       alert("done");
//     } else {
//       //ADD NEW DOC
//       console.warn("id not found in firebase");
//       // await questionsRef.add(content);
//     }
//     console.log("data", data);
//   };

//   const updateSubcategories = () => {};

//   return (
//     <form
//       data-id={question.id}
//       className="row g-3"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <div className="col-md-6">
//         <label className="form-label" htmlFor="english">
//           English
//         </label>
//         <textarea
//           className="form-control"
//           name={`english`}
//           ref={register}
//           defaultValue={question.english ?? ""}
//         />
//       </div>
//       <div className="col-md-6">
//         <label className="form-label" htmlFor="chinese">
//           Chinese
//         </label>
//         <textarea
//           className="form-control"
//           name={`chinese`}
//           ref={register}
//           defaultValue={question.chinese ?? ""}
//         />
//       </div>
//       <div className="col-md-6">
//         <label className="form-label" htmlFor="category">
//           Category
//         </label>
//         <select
//           className="form-select"
//           name={`category`}
//           onChange={(e) => setCategory(getValues("category"))}
//           ref={register}
//         >
//           <option value="">Select...</option>
//           {Object.keys(categories).map((key, i) => {
//             return (
//               <option selected={question.category === key} key={i} value={key}>
//                 {sentenceCase(key)}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//       <div className="col-md-6">
//         <label className="form-label" htmlFor="subcategory">
//           Subcategory
//         </label>
//         <select className="form-select" name={`subcategory`} ref={register}>
//           <option value="">Select...</option>
//           {categories[category as keyof typeof categories].map((value, i) => {
//             return (
//               <option
//                 selected={question.subcategory === value}
//                 key={i}
//                 value={value}
//               >
//                 {sentenceCase(value)}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//       <div className="col-md-6">
//         <label className="form-label" htmlFor="strength">
//           Strength
//         </label>
//         <input
//           className="form-control"
//           name={`strength`}
//           type="number"
//           ref={register}
//           defaultValue={question.strength.toString() ?? ""}
//         />
//       </div>
//       <div className="col-md-6">
//         <label className="form-label" htmlFor="multiplier">
//           Multiplier
//         </label>
//         <select className="form-select" name={`multiplier`} ref={register}>
//           <option value="">Select...</option>
//           {[1, -1].map((value, i) => {
//             return (
//               <option
//                 selected={question.multiplier === value}
//                 key={i}
//                 value={value}
//               >
//                 {value}
//               </option>
//             );
//           })}
//         </select>
//       </div>

//       <div className="col-12">
//         <button className="btn btn-primary" type="submit">
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };

// export default QuestionForm;

import React from "react";

interface Props {}

const QuestionForm: React.FC<Props> = ({}) => {
  return <></>;
};

export default QuestionForm;
