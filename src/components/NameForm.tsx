import React from "react";
import { useForm } from "react-hook-form";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
interface Props {
  uid: string;
}

const NameForm: React.FC<Props> = ({ uid }) => {
  useFirestoreConnect([{ collection: "users", doc: uid }]);
  const firestore = useFirestore();
  const userMatches = useSelector<RootState>(
    (state) => state.firestore.ordered.users
  ) as string;
  const previousName = userMatches?.[0] ?? "";

  const { register, getValues } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const handleChange = async () => {
    if (typeof uid === "string") {
      await firestore.set(`users/${uid}`, getValues(), { merge: true });
    }
  };
  return (
    <>
      <label className="form-label" htmlFor="name"></label>
      <input
        onChange={handleChange}
        className="focus:outline-none bg-transparent text-2xl"
        name={`name`}
        type="text"
        ref={register}
        defaultValue={previousName}
      />
    </>
  );
};

export default NameForm;
