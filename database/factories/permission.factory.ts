import { setSeederFactory } from "typeorm-extension";
import { Permission } from "src/user_management/permissions/entities/permission.entity";

const PERMISSION = [
    'VER',
    'ACTUALIZAR',
    'CREAR',
    'ELIMINAR'
]

export default setSeederFactory(Permission, (fake) => {
    const permission = new Permission()
    permission.name = fake.helpers.arrayElement(PERMISSION)
    permission.displayName = fake.helpers.arrayElement(PERMISSION)
    return permission
})