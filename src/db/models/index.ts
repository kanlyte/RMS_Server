import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../config';
import Admin from './admin';
import User from './user';
import Faculty from './faculty';
import Department from './department';
import Comment from './comment';
import Program from './program';
import Year from './year';
import Chat from './chat';
import Inquiry from './inquiry';
import Proposal from './proposal';
import Module from './module';

sequelize.authenticate()
  .then(() => {
    console.log('Connected');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



Department.hasMany(User, {
    foreignKey:{
        name: 'department_id'
    }
});
// User.belongsTo(Department);


Faculty.hasMany(User,
    {
        foreignKey:{
            name: 'faculty_id'
        }
});
// User.belongsTo(Faculty);


Program.hasMany(User,{
    foreignKey:{
        name: 'program_id'
    }
});
// User.belongsTo(Program);

Year.hasMany(User, {
    foreignKey:{
        name: 'year_id'
    }
});
// User.belongsTo(Year);


User.hasMany(Proposal,{
    foreignKey:{
        name: 'user_id'
    }
});
// Proposal.belongsTo(User);

User.hasMany(Module, {
    foreignKey:{
        name: 'user_id'
    }
});
// Module.belongsTo(User);

db.User = User
db.Admin = Admin
db.Faculties = Faculty
db.Department = Department
db.Program = Program
db.Year = Year
db.Chat = Chat
db.Comment = Comment
db.Inquiry = Inquiry
db.Proposal = Proposal
db.Module = Module





db.sequelize.sync({ force: false, alert:true })
  .then(() => {
    console.log('Resync is done');
  });

export default db;
