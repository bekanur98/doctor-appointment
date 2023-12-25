import knex from "knex";
import db from '../../index.js'
class DoctorController {
  async getDoctors(req, res){
      try {
          const doctorList = await db('doctors')
              .select([
                  'doctors.id as doctor_id',
                  'doctors.name as doctor_name',
                  'doctors.spec as doctor_spec',
              ])

          return res.status(200).json({data: doctorList, message: "Doctor list"})
      } catch (error) {
          return res.status(error.code).json({message: error.message});
      }
  }

  async addDoctor(req, res){
    try {
        const { validatedDoctorData } = req;
        const {name, spec} = validatedDoctorData;
        await db('doctors')
            .insert({name, spec});

        const doctor = await db('doctors')
            .select([
                'doctors.id as doctor_id',
                'doctors.name as doctor_name',
                'doctors.spec as doctor_spec',
            ])
            .orderBy('id', 'desc')
            .first();

        return res.status(200).json({data: doctor, message: "Successfully created"})
    } catch (error) {
        return res.status(error.code).json({message: error.message});
    }
  }
}

export default DoctorController;
