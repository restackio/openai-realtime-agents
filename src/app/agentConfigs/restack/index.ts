import salesAgent from "./sales";
import { injectTransferTools } from "../utils";

salesAgent.downstreamAgents = [salesAgent];

const agents = injectTransferTools([salesAgent]);

export default agents;
