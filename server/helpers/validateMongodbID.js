<<<<<<< HEAD
import mongoose from 'mongoose';

const validateMongodbId = (id) => {
    try {
        mongoose.Types.ObjectId.isValid(id);
    } catch (err) {
        console.log(err);
    }
};

<<<<<<< HEAD
export {validateMongodbId};

=======
export { validateMongodbId };
=======
import mongoose from "mongoose";

const validateMongodbId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error("The id is not valid or found");
    }
};

export default validateMongodbId;
>>>>>>> ff6bb10 (chore: for pulling)
>>>>>>> f394049 (chore: .)
