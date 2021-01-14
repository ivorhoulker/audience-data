import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState, User } from "../app/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./Button";
import { useHistory } from "react-router-dom";

interface Props {
  uid: string;
}
export type Name = string;
const schema = yup.object().shape({
  name: yup.string().trim().required(),
});

const NameForm: React.FC<Props> = ({ uid }) => {
  useFirestoreConnect([{ collection: "users", doc: uid }]);

  const firestore = useFirestore();
  const userMatches = useSelector<RootState>(
    ({ firestore: { data } }) => data.users && data.users[uid]
  ) as User;
  const previousName = userMatches?.name ?? "";
  console.log("prev", previousName);
  const { register, handleSubmit, setError, errors, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: previousName,
    },
  });
  //use hook form can assign refs with register like this in order to share the to assign focus
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (nameRef.current) {
      register(nameRef.current);
      nameRef.current.focus();
    }
  }, []);
  const handleChange = async () => {
    // if (typeof uid === "string") {
    //   await firestore.set(`users/${uid}`, getValues(), { merge: true });
    // }
  };
  const onSubmit = async () => {
    if (typeof uid === "string") {
      const values = getValues();
      console.log(`setting firebase users/${uid} to `, values);
      await firestore.set(`users/${uid}`, values, { merge: true });
    }
  };
  const history = useHistory();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    history.push("/answer");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label" htmlFor="name"></label>
        <input
          onChange={handleChange}
          className="focus:outline-none bg-transparent text-2xl mb-12 w-full"
          name={`name`}
          type="text"
          ref={nameRef}
          defaultValue={previousName}
        />
        {errors.name && errors.name.type === "required" && (
          <div>Your name is required.</div>
        )}
        {!errors.name && getValues().name && (
          <>
            <div className="mb-12 w-full">{`Hello, ${getValues().name}`}.</div>
            <div className="w-full">
              <Button onClick={(e) => handleClick(e)}>Confirm</Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default NameForm;
