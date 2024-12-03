import dynamic from "next/dynamic";

import { title } from "@/components/primitives";

//import MatrixForm from "@/components/MatrixForm/MatrixForm";
const MatrixForm = dynamic(() => import("@/components/MatrixForm/MatrixForm"), {
  ssr: false,
});

export default function FormPage() {
  return (
    <div>
      <h1 className={title()}>Form</h1>
      <MatrixForm />
    </div>
  );
}
