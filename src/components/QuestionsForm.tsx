import React from "react";
import { Category, Question } from "../types/Question";
import { firestore } from "../Firebase";
import firebase from "firebase/app";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {}

const schema = yup.object().shape({
  english: yup.string().required(),
  chinese: yup.string().required(),
  category: yup.string().required(),
  subcategory: yup.string().required(),
  strength: yup.number().required(),
  multiplier: yup.number().required(),
});
const QuestionsForm: React.FC<Props> = ({}) => {
  const { register, handleSubmit, setError, errors } = useForm<Question>({
    resolver: yupResolver(schema),
  });

  const questionsRef = firestore.collection("questions");
  const query = questionsRef.limit(9999);

  const [q, qLoading, qError] = useCollection(query);
  const questions: Question[] =
    q &&
    (q as firebase.firestore.QuerySnapshot).docs.map((doc) => {
      return { ...(doc.data() as Question), id: doc.id };
    });
  const onSubmit = (data: Question) => {
    console.log("data", data);
  };

  const updateSubcategories = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {questions?.map((q) => {
        return (
          <div>
            <label>English</label>
            <input
              name={`${q.id}.english`}
              ref={register}
              placeholder={q.english ?? ""}
            />
            <label>Chinese</label>
            <input
              name={`${q.id}.chinese`}
              ref={register}
              placeholder={q.chinese ?? ""}
            />

            <select
              name={`${q.id}.category`}
              onChange={updateSubcategories}
              ref={register}
            >
              <option value="">Select...</option>
              {Object.entries(Category).map(([_key, value], i) => {
                return (
                  <option selected={q.category === value} key={i} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <select name={`${q.id}.subcategory`} ref={register}>
              <option value="">Select...</option>
              {Object.entries(Category).map(([_key, value], i) => {
                return (
                  <option
                    selected={q.subcategory === value}
                    key={i}
                    value={value}
                  >
                    {value}
                  </option>
                );
              })}
            </select>
            <label>Strength</label>
            <input
              name={`${q.id}.strength`}
              type="number"
              ref={register}
              placeholder={q.strength.toString() ?? ""}
            />
            <label>Multiplier</label>
            <input
              name={`${q.id}.multiplier`}
              type="number"
              ref={register}
              placeholder={q.multiplier.toString() ?? "1"}
            />
          </div>
        );
      })}

      <input type="submit" />
    </form>
  );
};

export default QuestionsForm;
