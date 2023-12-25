import z from 'zod'

const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

const scheduleSchema = z.object({
    user_id: z.number(),
    doctor_id: z.number(),
    slot: z.string().refine((val) => dateTimeRegex.test(val), {
        message: "Slot must be in format YYYY-MM-DD HH:MM:SS"
    })
});

const addDoctorSchema = z.object({
    name: z.string(),
    spec: z.string()
});

const addUserSchema = z.object({
    name: z.string(),
    phone: z.string()
});

const validator = {
    addSchedule: async (req, res, next) => {
        try {
            req.validatedScheduleData = scheduleSchema.parse(req.body);
            next();
        } catch (error) {
            res.status(400).json({ error: 'Invalid request data', details: error.issues });
        }
    },

    addDoctor: async (req, res, next) => {
        try {
            req.validatedDoctorData = addDoctorSchema.parse(req.body);
            next();
        } catch (error) {
            res.status(400).json({ error: 'Invalid request data', details: error.issues });
        }
    },

    addUser: async (req, res, next) => {
        try {
            req.validatedUserData = addUserSchema.parse(req.body);
            next();
        } catch (error) {
            res.status(400).json({ error: 'Invalid request data', details: error.issues });
        }
    }
};

export default validator