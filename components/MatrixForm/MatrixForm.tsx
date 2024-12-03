"use client";
import React, { useState, useEffect } from "react";
//import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { parseDate, CalendarDate } from "@internationalized/date";
//import { Link } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/progress";
import { BiSolidHide } from "react-icons/bi";

import { Interviews } from "@/models/Interview";

const listTechs = [
  "React.js",
  "Node.js",
  "MongoDB",
  "Express",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "Angular",
  "Vue.js",
  "Nest.js",
  "Python",
  "Java",
  "PostgreSQL",
  "Scrum",
  "Agile",
];

const listBenefits = [
  "Health insurance",
  "Dental insurance",
  "Life insurance",
  "Paid time off",
  "Retirement plan",
  "Flexible schedule",
  "Work from home",
  "Professional development assistance",
  "Tuition reimbursement",
  "Other",
];

const listNextSteps = [
  "Send resume",
  "Technical interview",
  "HR interview",
  "Offer",
  "Other",
];

const initFormValues = {
  fecha: new Date(),
  empresa: "",
  techs: [],
  descripcion: "",
  equipo: "",
  remoto: true,
  salario: "",
  medioPago: "",
  modalidad: "",
  vacaciones: "",
  horario: "",
  feriados: "",
  diasEnfermedad: "",
  beneficios: [],
  siguientesPasos: [],
  comentarios: "",
};

const validationSchema = Yup.object({
  fecha: Yup.date().required("Please provide a date for this interview."),
  empresa: Yup.string()
    .max(60, "Company name cannot be more than 60 characters")
    .required("Please provide the name of the company."),
  techs: Yup.array().required(
    "Please provide the technologies used in this interview."
  ),
  descripcion: Yup.string().required(
    "Please provide a description for this interview."
  ),
  equipo: Yup.string().required("Please provide a description for the team."),
  remoto: Yup.boolean().required("Please specify if the job is remote."),
  salario: Yup.string().required("Please provide the salary for this job."),
  medioPago: Yup.string().required(
    "Please provide the payment method for this job."
  ),
  modalidad: Yup.string().required("Please provide the modality for this job."),
  vacaciones: Yup.string().required(
    "Please provide the vacation days for this job."
  ),
  horario: Yup.string().required(
    "Please provide the work schedule for this job."
  ),
  feriados: Yup.string().required("Please provide the holidays for this job."),
  diasEnfermedad: Yup.string().required(
    "Please provide the sick days for this job."
  ),
  beneficios: Yup.array().of(Yup.string()),
  siguientesPasos: Yup.array().of(Yup.string()),
  comentarios: Yup.string(),
});

const MatrixForm = () => {
  //const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showTechs, setShowTechs] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [dataInitFormValues, setDataInitFormValues] = useState<any>({
    ...initFormValues,
  });
  //const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchDataInterview();
  }, []);

  const fetchDataInterview = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get("id");

      if (!id) return;
      setLoading(true);
      // eslint-disable-next-line
      console.log("id Interview:..", id);
      const respose = await fetch(`api/interview/${id}`);
      const dataInterview = await respose.json();
      // eslint-disable-next-line
      console.log("dataInterview:..", dataInterview);
      const { interview } = dataInterview;

      setDataInitFormValues({
        fecha: new Date(interview.fecha),
        empresa: interview.empresa,
        techs: interview.techs,
        descripcion: interview.descripcion,
        equipo: interview.equipo,
        remoto: interview.remoto,
        salario: interview.salario,
        medioPago: interview.medioPago,
        modalidad: interview.modalidad,
        vacaciones: interview.vacaciones,
        horario: interview.horario,
        feriados: interview.feriados,
        diasEnfermedad: interview.diasEnfermedad,
        beneficios: interview.beneficios,
        siguientesPasos: interview.siguientesPasos,
        comentarios: interview.comentarios,
      });
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line
      console.error("error al recuperar las interviews:..", error);

      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: dataInitFormValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      //eslint-disable-next-line
      console.log("Form values:..", values);
      handleRegisterInterview(values as unknown as Interviews);
    },
  });
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;

  const handleRegisterInterview = async (values: Interviews) => {
    try {
      setLoading(true);
      const respose = await fetch("api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const resCreate = await respose.json();
      // eslint-disable-next-line
      console.log("resCreate:..", resCreate);
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line
      console.error("error al recuperar las interviews:..", error);
      setLoading(false);
    }
  };

  const handleChangeDate = (date: CalendarDate) => {
    //console.log("date:..", date);
    const { year, month, day } = date;
    const newDate = new Date(year, month - 1, day);

    formik.setFieldValue("fecha", newDate);
  };

  const handleChangeRemoto = (value: boolean) => {
    //console.log("value remoto:..", value);
    formik.setFieldValue("remoto", value);
  };

  return (
    <div suppressHydrationWarning>
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <CircularProgress aria-label="mainCircularProgress" color="primary" />
        </div>
      )}
      <Card className="mt-3" style={{ minWidth: "350px", maxWidth: "600px" }}>
        {/* <h2 className="text-3xl font-bold mb-4 text-center">Login</h2> */}
        <CardBody>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <DatePicker
              label="Interview date"
              value={parseDate(values.fecha.toISOString().slice(0, 10))}
              onChange={handleChangeDate}
            />
            <Input
              aria-label="company"
              name="empresa"
              placeholder="Company"
              value={values.empresa}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.empresa && touched.empresa && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.empresa === "string" && errors.empresa}
              </div>
            )}
            {!showTechs && (
              <Input
                aria-label="techs"
                name="listTechs"
                placeholder="Technologies"
                value={values.techs.join(", ")}
                onClick={() => setShowTechs(true)}
              />
            )}
            {showTechs && (
              <div className="flex gap-3">
                <CheckboxGroup
                  label="Select technologies"
                  value={values.techs}
                  onChange={(values) => formik.setFieldValue("techs", values)}
                >
                  {listTechs.map((tech) => (
                    <Checkbox key={tech} value={tech}>
                      {tech}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <BiSolidHide
                  className="mt-1 cursor-pointer"
                  onClick={() => setShowTechs(false)}
                />
              </div>
            )}

            <Input
              aria-label="description"
              name="descripcion"
              placeholder="Description"
              value={values.descripcion}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.descripcion && touched.descripcion && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.descripcion === "string" && errors.descripcion}
              </div>
            )}
            <Input
              aria-label="team"
              name="equipo"
              placeholder="Team"
              value={values.equipo}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.equipo && touched.equipo && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.equipo === "string" && errors.equipo}
              </div>
            )}
            <Checkbox
              isSelected={values.remoto}
              onValueChange={handleChangeRemoto}
            >
              Remote
            </Checkbox>
            <Input
              aria-label="salary"
              name="salario"
              placeholder="Salary"
              value={values.salario}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.salario && touched.salario && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.salario === "string" && errors.salario}
              </div>
            )}
            <Input
              aria-label="paymentMethod"
              name="medioPago"
              placeholder="Payment Method"
              value={values.medioPago}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.medioPago && touched.medioPago && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.medioPago === "string" && errors.medioPago}
              </div>
            )}
            <Input
              aria-label="modality"
              name="modalidad"
              placeholder="Modality"
              value={values.modalidad}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.modalidad && touched.modalidad && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.modalidad === "string" && errors.modalidad}
              </div>
            )}
            <Input
              aria-label="vacationDays"
              name="vacaciones"
              placeholder="Vacation Days"
              value={values.vacaciones}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.vacaciones && touched.vacaciones && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.vacaciones === "string" && errors.vacaciones}
              </div>
            )}
            <Input
              aria-label="workHours"
              name="horario"
              placeholder="Work Hours"
              value={values.horario}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.horario && touched.horario && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.horario === "string" && errors.horario}
              </div>
            )}
            <Input
              aria-label="holidays"
              name="feriados"
              placeholder="Holidays"
              value={values.feriados}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.feriados && touched.feriados && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.feriados === "string" && errors.feriados}
              </div>
            )}
            <Input
              aria-label="sickDays"
              name="diasEnfermedad"
              placeholder="Sick Days"
              value={values.diasEnfermedad}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.diasEnfermedad && touched.diasEnfermedad && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.diasEnfermedad === "string" &&
                  errors.diasEnfermedad}
              </div>
            )}
            <Input
              aria-label="comments"
              name="comentarios"
              placeholder="Comments"
              value={values.comentarios}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.comentarios && touched.comentarios && (
              <div className="text-purple-600 text-sm opacity">
                {typeof errors.comentarios === "string" && errors.comentarios}
              </div>
            )}

            {!showBenefits && (
              <Input
                aria-label="benefits"
                name="listBenefits"
                placeholder="Benefits"
                value={values.beneficios.join(", ")}
                onClick={() => setShowBenefits(true)}
              />
            )}
            {showBenefits && (
              <div className="flex gap-3">
                <CheckboxGroup
                  label="Select benefits"
                  value={values.beneficios}
                  onChange={(values) =>
                    formik.setFieldValue("beneficios", values)
                  }
                >
                  {listBenefits.map((benefit) => (
                    <Checkbox key={benefit} value={benefit}>
                      {benefit}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <BiSolidHide
                  className="mt-1 cursor-pointer"
                  onClick={() => setShowBenefits(false)}
                />
              </div>
            )}

            {!showNextSteps && (
              <Input
                aria-label="nextSteps"
                name="listNextSteps"
                placeholder="Next Steps"
                value={values.siguientesPasos.join(", ")}
                onClick={() => setShowNextSteps(true)}
              />
            )}
            {showNextSteps && (
              <div className="flex gap-3">
                <CheckboxGroup
                  label="Select next steps"
                  value={values.siguientesPasos}
                  onChange={(values) =>
                    formik.setFieldValue("siguientesPasos", values)
                  }
                >
                  {listNextSteps.map((nextStep) => (
                    <Checkbox key={nextStep} value={nextStep}>
                      {nextStep}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <BiSolidHide
                  className="mt-1 cursor-pointer"
                  onClick={() => setShowNextSteps(false)}
                />
              </div>
            )}
            <Button
              aria-label="registerButton"
              color="primary"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <div className="text-white">
                  <CircularProgress aria-label="Loading..." />
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default MatrixForm;
