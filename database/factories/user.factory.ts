import { setSeederFactory } from "typeorm-extension";
import { User } from "src/user_management/users/entities/user.entity";
import { getAllAvailablePersonIds } from '../helpers/utilitarian'

let availablePersonIds: number[] = [];
let currentIndex = 0;

export default setSeederFactory(User, async (fake) => {
    const user = new User

    if (availablePersonIds.length === 0) {
        availablePersonIds = await getAllAvailablePersonIds();
        currentIndex = 0;
    }

    const randomPersonId = availablePersonIds[currentIndex];

    user.username = fake.internet.userName()
    user.password = fake.internet.password()
    user.active = fake.datatype.boolean()
    user.person = randomPersonId
    user.token = 'algo'
    currentIndex++

    return user
})