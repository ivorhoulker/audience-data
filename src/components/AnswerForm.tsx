import React, { useState } from "react";
import { Category, Question } from "../types/Question";
import { firestore, auth, timestamp } from "../Firebase";
import firebase from "firebase/app";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import answers from "../data/answers.json";
import { sentenceCase } from "../helpers/sentenceCase";
interface Props {
  question: Question;
}

const schema = yup.object().shape({
  english: yup.string().trim().required(),
  chinese: yup.string().trim().required(),
  category: yup.string().required(),
  subcategory: yup.string().required(),
  strength: yup.number().integer().positive().moreThan(0).required(),
  multiplier: yup.number().required(),
});
const AnswerForm: React.FC<Props> = ({ question }) => {
  const {
    register,
    handleSubmit,
    setError,
    errors,
    getValues,
  } = useForm<Question>({
    resolver: yupResolver(schema),
  });
  const [category, setCategory] = useState("economics");

  const questionsRef = firestore.collection("questions");
  const { uid } = auth.currentUser!;
  // const query = questionsRef.limit(9999);

  // const [q, qLoading, qError] = useCollection(query);
  // const questions: Question[] =
  //   q &&
  //   (q as firebase.firestore.QuerySnapshot).docs.map((doc) => {
  //     return { ...(doc.data() as Question), id: doc.id };
  //   });
  const [selected, setSelected] = useState("");
  const onSubmit = async (data: Question) => {
    const doc = await questionsRef.doc(question.id).get();
    const content = {
      ...data,
      updatedAt: timestamp(),
      editedBy: uid,
    };
    console.log("content: ", content);
    if (doc.exists) {
      await questionsRef.doc(question.id).set(content, { merge: true });
      alert("done");
    } else {
      //ADD NEW DOC
      console.warn("id not found in firebase");
      // await questionsRef.add(content);
    }
    console.log("data", data);
  };

  const updateSubcategories = () => {};

  return (
    <form>
      <div className="col-md-6">
        <h3>{question.english}</h3>

        <div role="radiogroup" className="btn-group">
          {answers.map((key, i) => {
            return (
              <>
                <input
                  type="radio"
                  className="btn-check"
                  id={key}
                  name={"questionname"}
                  autoComplete="off"
                />
                <label className="btn btn-secondary" htmlFor={key}>
                  {sentenceCase(key)}
                </label>
              </>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default AnswerForm;
