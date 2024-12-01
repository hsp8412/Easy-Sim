import {carrier_auth} from "../middleware/carrier_auth";
import {getMyProposals} from "../controllers/proposalsController";

const router = express.Router();

router.get("/get-my-proposals", carrier_auth, getMyProposals);
