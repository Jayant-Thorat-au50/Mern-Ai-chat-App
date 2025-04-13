import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "Project name already exists"],
    minLength: [3, "Name must be at least 3 characters long"],
  },
  users: [{ type: Schema.Types.ObjectId, ref: "users", required: true }],
});

const ProjectModel = model("projects", projectSchema);

export default ProjectModel;
