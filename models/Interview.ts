import mongoose from "mongoose";

export interface Interviews extends mongoose.Document {
  fecha: Date;
  empresa: string;
  techs: string[];
  descripcion: string;
  equipo: string;
  remoto: boolean;
  salario: string;
  medioPago: string;
  modalidad: string;
  vacaciones: string;
  horario: string;
  feriados: string;
  diasEnfermedad: string;
  beneficios: string[];
  siguientesPasos: string[];
  comentarios: string;
}

const InterviewSchema = new mongoose.Schema<Interviews>({
  fecha: {
    type: Date,
    required: [true, "Please provide a date for this interview."],
  },
  empresa: {
    type: String,
    required: [true, "Please provide the name of the company."],
    maxlength: [60, "Company name cannot be more than 60 characters"],
  },
  techs: {
    type: [String],
    required: [true, "Please provide the technologies used in this interview."],
  },
  descripcion: {
    type: String,
    required: [true, "Please provide a description for this interview."],
  },
  equipo: {
    type: String,
    required: [true, "Please provide a description for the team."],
  },
  remoto: {
    type: Boolean,
    required: [true, "Please specify if the job is remote."],
  },
  salario: {
    type: String,
    required: [true, "Please provide the salary for this job."],
  },
  medioPago: {
    type: String,
    required: [true, "Please provide the payment method for this job."],
  },
  modalidad: {
    type: String,
    required: [true, "Please provide the modality for this job."],
  },
  vacaciones: {
    type: String,
    required: [true, "Please provide the vacation days for this job."],
  },
  horario: {
    type: String,
    required: [true, "Please provide the work hours for this job."],
  },
  feriados: {
    type: String,
    required: [true, "Please provide the holidays for this job."],
  },
  diasEnfermedad: {
    type: String,
    required: [true, "Please provide the sick days for this job."],
  },
  beneficios: {
    type: [String],
    required: [true, "Please provide the benefits for this job."],
  },
  siguientesPasos: {
    type: [String],
    required: [true, "Please provide the next steps for this job."],
  },
  comentarios: {
    type: String,
    required: [true, "Please provide comments for this job."],
  },
});

const ModelInterview = mongoose.models.Interview
  ? mongoose.models.Interview
  : mongoose.model<Interviews>("Interview", InterviewSchema);

export default ModelInterview;
