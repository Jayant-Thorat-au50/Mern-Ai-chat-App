import { Schema } from "mongoose";

const projectSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        trim: true,
        unique:true,
        minLength: [3, "Name must be at least 3 characters long"],
     },
     userId:{
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
     }
    })

const ProjectModel = model("projects", projectSchema);

export default ProjectModel;
