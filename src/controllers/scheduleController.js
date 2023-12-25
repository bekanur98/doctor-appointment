import * as fs from "fs";
import * as path from "path";
import db from '../../index.js'
class ScheduleController {
    async getSchedule(req, res){
        try {
            const scheduleList = await db('schedules')
                .select([
                    'schedules.id as schedule_id',
                    'doctors.id as doctor_id',
                    'doctors.name as doctor_name',
                    'doctors.spec as doctor_spec',
                    'users.id as user_id',
                    'users.name as user_name',
                    'schedules.slot'
                ])
                .innerJoin('doctors', 'schedules.doctor_id', 'doctors.id')
                .innerJoin('users', 'schedules.user_id', 'users.id')
                .where('schedules.slot', '>=', db.raw('NOW()'))
                .andWhere('schedules.slot', '<', db.raw('DATE_ADD(CURDATE(), INTERVAL 1 WEEK)'))
                .orderBy('schedules.slot')

            return res.status(200).json({data: scheduleList, message: "Schedule list"})
        } catch (error) {
            return res.status(error.code).json({message: error.message,})
        }
    }

    async addSchedule(req, res){
        try {
            const { validatedScheduleData } = req;

            if (!await this.isDoctorFreeAtTime(validatedScheduleData)) {
                return res.status(400).json({ error: 'The Doctor already has an appointment for this time', data: validatedScheduleData })
            }

            if (!await this.isUserFreeAtTime(validatedScheduleData)) {
                return res.status(400).json({ error: 'You are already booked for this time', data: validatedScheduleData })
            }

            const {user_id, doctor_id, slot} = validatedScheduleData;
            await db('schedules')
                .insert({user_id, doctor_id, slot});

            const schedule = await db('schedules')
                .select([
                    'schedules.id as schedule_id',
                    'doctors.id as doctor_id',
                    'doctors.name as doctor_name',
                    'doctors.spec as doctor_spec',
                    'users.id as user_id',
                    'users.name as user_name',
                    'schedules.slot'
                ])
                .innerJoin('doctors', 'schedules.doctor_id', 'doctors.id')
                .innerJoin('users', 'schedules.user_id', 'users.id')
                .orderBy('schedule_id', 'desc')
                .first();

            this.logSchedule(schedule);

            return res.status(201).json({data: schedule, message: "An appointment was successfully created"})
        } catch (error) {
            return res.status(400).json({message: error.message,})
        }
    }

    logSchedule(schedule) {

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        const logMessage = `${formattedDate} | Привет ${schedule.user_name}! Напоминаем, что вы записаны к ${schedule.doctor_spec} завтра в ${new Date(schedule.slot).toISOString()}\n`;

        const logFileName = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}.log`;

        const logFilePath = path.join('logs', logFileName);

        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    }

    async isDoctorFreeAtTime({doctor_id, slot}){
        const result = await db('schedules')
            .count("* as count")
            .innerJoin('doctors', 'schedules.doctor_id', 'doctors.id')
            .where('schedules.doctor_id', '=', doctor_id)
            .andWhere('schedules.slot', '=', slot)

        return result[0].count === 0;
    }

    async isUserFreeAtTime({user_id, slot}){
        const result = await db('schedules')
            .count("* as count")
            .innerJoin('users', 'schedules.user_id', 'users.id')
            .where('schedules.user_id', '=', user_id)
            .andWhere('schedules.slot', '=', slot)

        return result[0].count === 0;
    }
}

export default ScheduleController;
