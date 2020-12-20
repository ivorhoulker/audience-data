import React from "react";
import { Category, Question } from "../types/Question";
import { useForm } from "react-hook-form";
interface Props {}

const QuestionsForm: React.FC<Props> = ({}) => {
  const { register, handleSubmit } = useForm<Question>();

  const onSubmit = (data: Question) => {
    console.log("data", data);
  };

  const updateSubcategories = () => {
      
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="english" ref={register} placeholder="" />

      <input name="chinese" ref={register} placeholder="" />

      <select name="category" onChange={updateSubcategories} ref={register}>
        <option value="">Select...</option>
        {Object.entries(Category).map(([_key, value], i) => {
          return (
            <option key={i} value={value}>
              {value}
            </option>
          );
        })}
      </select>
      <select name="subcategory" ref={register}>
        <option value="">Select...</option>
        {Object.entries(Category).map(([_key, value], i) => {
          return (
            <option key={i} value={value}>
              {value}
            </option>
          );
        })}
      </select>

      <input type="submit" />
    </form>
  );
};

export default QuestionsForm;
