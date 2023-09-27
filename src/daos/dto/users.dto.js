export class UsersDto{

    constructor(usersDB){
        this.id = usersDB._id,
        this.nombre = usersDB.first_name,
        this.apellido = usersDB.last_name,
        this.email = usersDB.email,
        this.rol = usersDB.role,
        this.ult_conex_en_hrs = (new Date().getTime() - new Date(usersDB.last_connection).getTime())/3600000
    }

}