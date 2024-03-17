import { setSeederFactory } from "typeorm-extension";
import { Role } from "src/user_management/roles/entities/role.entity";

const ROL = [
    'ADMINISTRADOR',
    'DENTISTA',
    'RECEPCIONISTA'
]

export default setSeederFactory(Role, (fake) => {
    const role = new Role()
    role.name = fake.helpers.arrayElement(ROL)
    role.displayName = fake.helpers.arrayElement(ROL)
    return role
})