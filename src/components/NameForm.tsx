import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/ReduxStore";
import { User } from "../types/User";
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
  //firebase
  useFirestoreConnect([{ collection: "users", doc: uid }]);
  const firestore = useFirestore();
  const userMatches = useSelector<RootState>(
    ({ firestore }) => firestore.data.users && firestore.data.users[uid]
  ) as User;
  const previousName = userMatches?.name ?? "";

  //forms
  const {
    register,
    handleSubmit,
    errors,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //use hook form can assign refs with register like this in order to share the to assign focus
  const nameRef = useRef<HTMLInputElement | null>();
  useEffect(() => {
    if (nameRef.current) {
      // register(nameRef.current);
      nameRef.current.focus();
      setValue("name", previousName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousName]);
  useEffect(() => {
    return () => {
      //update values if user navigates away
      nameRef.current?.value && updateFirestoreIfValid(nameRef.current.value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFirestoreIfValid = async (name: string) => {
    console.log(`setting firebase users/${uid} to `, name);
    await firestore.set(`users/${uid}`, { name }, { merge: true });
  };
  const handleChange = async () => {
    // if (typeof uid === "string") {
    //   await firestore.set(`users/${uid}`, getValues(), { merge: true });
    // }
  };
  const onSubmit = async () => {
    const name = getValues().name ?? previousName;
    console.log(`setting firebase users/${uid} to `, name);
    await firestore.set(`users/${uid}`, { name }, { merge: true });
    history.push("/answer");
  };
  const history = useHistory();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label" htmlFor="name"></label>
        <input
          onChange={handleChange}
          aria-invalid={errors.name ? "true" : "false"}
          className="focus:outline-none bg-transparent text-2xl mb-12 w-full"
          name={`name`}
          type="text"
          defaultValue={previousName}
          ref={(e) => {
            register(e);
            nameRef.current = e; // you can still assign to ref
          }}
        />
        {errors.name && <div>Your name is required.</div>}
        {watch().name && (
          <>
            <div className="mb-12 w-full">{`Hello, ${watch().name}`}.</div>
            <div className="w-full">
              <Button type="submit">Confirm</Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default NameForm;
