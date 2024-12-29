"use client";
import { useForm } from "react-hook-form";

export interface UserFormProps {
  fields: { name: string; type: string; labelname: string }[]; //フィールドの情報
  onSubmit: (data: any) => Promise<string>; //onSubmit関数
}

const UserForm: React.FC<UserFormProps> = ({ fields, onSubmit }) => {
  const { register, watch, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.labelname}</label>
          <input type={field.type} {...register(field.name)} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
